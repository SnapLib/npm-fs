import AbstractDirElement from "./AbstractDirElement.js";
import type { VirtualDirents } from "./DirElement.js";
import fs from "fs";
import path from "path";

export class VirtualDirElement extends AbstractDirElement
{
    readonly #relativeFilePaths: Set<string>;
    readonly #relativeDirPaths: Set<string>;

    public constructor(virtualDirPath:string, ...morePaths: ReadonlyArray<string>)
    {
        super(path.normalize([virtualDirPath].concat(morePaths).join(path.sep)), {exists: false});

        if (fs.existsSync(this.path) && fs.lstatSync(this.path).isDirectory())
        {
            const dirents: ReadonlyArray<fs.Dirent> =
                fs.readdirSync(this.path, {withFileTypes: true});

            this.#relativeFilePaths =
                new Set<string>(dirents.filter(dirent => dirent.isFile())
                                       .map(fileDirent => path.join(this.path, fileDirent.name)));

            this.#relativeDirPaths =
                new Set<string>(dirents.filter(dirent => dirent.isDirectory())
                                       .map(fileDirent => path.join(this.path, fileDirent.name)));
        }
        else
        {
            this.#relativeFilePaths = new Set<string>();
            this.#relativeDirPaths = new Set<string>();
        }
    }

    public fileSync(): VirtualDirents
    {
        return dirReader(this.path, {fileRelPaths: Array.from(this.#relativeFilePaths), dirRelPaths: Array.from(this.#relativeDirPaths)}).file;
    }

    public dirSync(): VirtualDirents
    {
        return dirReader(this.path, {fileRelPaths: Array.from(this.#relativeFilePaths), dirRelPaths: Array.from(this.#relativeDirPaths)}).directory;
    }

    public direntSync(): VirtualDirents
    {
        const thisVirtualDirElement: Readonly<VirtualDirents> =
            dirReader(this.path, {fileRelPaths: Array.from(this.#relativeFilePaths), dirRelPaths: Array.from(this.#relativeDirPaths)}).directory;

        return {
            names: thisVirtualDirElement.names,
            paths: thisVirtualDirElement.paths,
            count: thisVirtualDirElement.count,
            contains: {
                name: (direntName:string, options?: {matchCase: boolean}): boolean =>
                {
                    return thisVirtualDirElement.contains.name(direntName, options);
                },

                path: (direntAbsOrRelPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return thisVirtualDirElement.contains.path(direntAbsOrRelPath, options);
                }
            }
        };
    }

    public length(): number
    {
        return this.direntSync().count;
    }

    public toString(): string
    {
        return "VirtualDirElement:\n".concat(super.toString());
    }
}

/**
 * Creates a queryable somewhat virtual directory element. Treats the provided
 * path string argument as the root path to a directory element and the provided
 * file and/or directory paths as nested file system elements contained within
 * directory at the provided path.
 *
 * This then returns an object that can be queried in an intuitive way for
 * various file system.
 *
 * This expression contains very little validation logic and assumes the path
 * and contents it receives has been processed and validated externally.
 *
 * @remarks
 * This expression can probably be refactored and combined with the similar
 * expression located in the {@link ExistingDirElement} class.
 *
 * @param dirPath The absolute path string of the directory
 *
 * @param contents The files and/or directories the directory at the provided
 *                 `dirPath` contains
 */
const dirReader = (dirPath: string, contents?: {fileRelPaths?: ReadonlyArray<string>, dirRelPaths?: ReadonlyArray<string>}): Readonly<VirtualDirents & {file: VirtualDirents, directory: VirtualDirents}> =>
{
    const _fileRelPaths: ReadonlyArray<string> =
        contents?.fileRelPaths?.map(filePath => path.isAbsolute(filePath) ? filePath.slice(1) : filePath) ?? [];

    const _fileAbsPaths: ReadonlyArray<string> =
        _fileRelPaths.map(relFilePath => path.join(dirPath, relFilePath));

    const _fileNames: ReadonlyArray<string> =
        _fileRelPaths.map(relFilePath => path.basename(relFilePath));

    const _dirRelPaths: ReadonlyArray<string> =
        contents?.dirRelPaths?.map(relDirPath => path.isAbsolute(relDirPath) ? relDirPath.slice(1) : relDirPath) ?? [];

    const _dirAbsPaths: ReadonlyArray<string> =
        _dirRelPaths.map(relDirPath => path.join(dirPath, relDirPath));

    const _dirNames: ReadonlyArray<string> =
        _dirRelPaths.map(relDirPath => path.basename(relDirPath));

    const _direntRelPaths: ReadonlyArray<string> =
        _fileRelPaths.concat(_dirRelPaths);

    const _direntAbsPaths: ReadonlyArray<string> =
        _fileAbsPaths.concat(_dirAbsPaths);

    const _direntNames: ReadonlyArray<string> = _fileNames.concat(_dirNames);

    const _fileVirtualDirents: Readonly<VirtualDirents> =
    {
        names: _fileNames,
        paths: _fileAbsPaths,
        count: _fileRelPaths.length,
        contains: {
            name: (fileName: string, options?: {matchCase:boolean}): boolean =>
            {
                if (_fileNames.includes(fileName))
                {
                    return true;
                }
                else
                {
                    return options?.matchCase === false && _fileNames.some(aFileName => fileName.localeCompare(aFileName, undefined, {sensitivity: "base"}) === 0);
                }
            },

            path: (fileAbsOrRelPath: string, options?: {matchCase:boolean}): boolean =>
            {
                const _fileRelPath: string = path.isAbsolute(fileAbsOrRelPath) ? fileAbsOrRelPath.slice(1) : fileAbsOrRelPath;

                if (_fileAbsPaths.includes(fileAbsOrRelPath)
                    || _fileRelPaths.includes(_fileRelPath))
                {
                    return true;
                }
                else if (options?.matchCase === false)
                {
                    return _fileAbsPaths.some(aFileAbsPath => fileAbsOrRelPath.localeCompare(aFileAbsPath, undefined, {sensitivity: "base"}) === 0)
                           || _fileRelPaths.some(aFileRelPath => fileAbsOrRelPath.localeCompare(aFileRelPath, undefined, {sensitivity: "base"}) === 0);
                }
                else
                {
                    return false;
                }
            }
        }
    };

    const _dirVirtualDirents: Readonly<VirtualDirents> =
    {
        names: _dirNames,
        paths: _dirAbsPaths,
        count: _dirRelPaths.length,
        contains: {
            name: (dirName: string, options?: {matchCase:boolean}): boolean =>
            {
                if (_dirNames.includes(dirName))
                {
                    return true;
                }
                else
                {
                    return options?.matchCase === false && _dirNames.some(aDirName => dirName.localeCompare(aDirName, undefined, {sensitivity: "base"}) === 0);
                }
            },

            path: (dirAbsOrRelPath: string, options?: {matchCase:boolean}): boolean =>
            {
                const _dirRelPath: string = path.isAbsolute(dirAbsOrRelPath) ? dirAbsOrRelPath.slice(1) : dirAbsOrRelPath;

                if (_fileAbsPaths.includes(dirAbsOrRelPath)
                    || _fileRelPaths.includes(_dirRelPath))
                {
                    return true;
                }
                else if (options?.matchCase === false)
                {
                    return _dirAbsPaths.some(aDirAbsPath => dirAbsOrRelPath.localeCompare(aDirAbsPath, undefined, {sensitivity: "base"}) === 0)
                           || _dirRelPaths.some(aDirRelPath => dirAbsOrRelPath.localeCompare(aDirRelPath, undefined, {sensitivity: "base"}) === 0);
                }
                else
                {
                    return false;
                }
            }
        }
    };

    return {
        names: _direntNames,
        paths: _direntAbsPaths,
        file: _fileVirtualDirents,
        directory: _dirVirtualDirents,
        count: _direntRelPaths.length,
        contains: {
            name: (direntName: string, options?: {matchCase:boolean}): boolean =>
            {
                if (_direntNames.includes(direntName))
                {
                    return true;
                }
                else
                {
                    return options?.matchCase === false && _direntNames.some(aDirentName => direntName.localeCompare(aDirentName, undefined, {sensitivity: "base"}) === 0);
                }
            },

            path: (direntAbsOrRelPath: string, options?: {matchCase:boolean}): boolean =>
            {
                const _direntRelPath: string = path.isAbsolute(direntAbsOrRelPath) ? direntAbsOrRelPath.slice(1) : direntAbsOrRelPath;

                if (_fileAbsPaths.includes(direntAbsOrRelPath)
                    || _fileRelPaths.includes(_direntRelPath))
                {
                    return true;
                }
                else if (options?.matchCase === false)
                {
                    return _direntAbsPaths.some(aDirentAbsPath => direntAbsOrRelPath.localeCompare(aDirentAbsPath, undefined, {sensitivity: "base"}) === 0)
                           || _direntRelPaths.some(aDirentRelPath => direntAbsOrRelPath.localeCompare(aDirentRelPath, undefined, {sensitivity: "base"}) === 0);
                }
                else
                {
                    return false;
                }
            }
        }
    };
};

export {VirtualDirElement as default};
