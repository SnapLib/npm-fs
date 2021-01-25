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
        const fileRelativePathsArray: ReadonlyArray<string> =
            Array.from(this.#relativeFilePaths);

        return {
            names: fileRelativePathsArray,
            paths: fileRelativePathsArray.map(fileRelPath => path.join(this.path, fileRelPath)),
            count: fileRelativePathsArray.length,
            contains: {
                name: (fileName:string, options?: {matchCase: boolean}): boolean =>
                {
                    if (options?.matchCase)
                    {
                        return fileRelativePathsArray.some(fileRelativePath => fileName === path.basename(fileRelativePath));
                    }
                    else
                    {
                        return fileRelativePathsArray.some(fileRelativePath => fileName.localeCompare(path.basename(fileRelativePath), undefined, {sensitivity: "base"}) === 0);
                    }
                },

                path: (fileAbsOrRelPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    if (options?.matchCase)
                    {
                        return fileRelativePathsArray.some(fileRelPath => fileRelPath === fileAbsOrRelPath || path.join(this.path, fileRelPath) === fileAbsOrRelPath);
                    }
                    else
                    {
                        return fileRelativePathsArray.some(fileRelPath => fileAbsOrRelPath.localeCompare(fileRelPath, undefined, {sensitivity: "base"}) === 0 || fileAbsOrRelPath.localeCompare(path.join(this.path, fileRelPath), undefined, {sensitivity: "base"}) === 0);
                    }
                }
            }
        };
    }

    public dirSync(): VirtualDirents
    {
        const relativeDirPathsArray: ReadonlyArray<string> =
            Array.from(this.#relativeDirPaths);

        return {
            names: relativeDirPathsArray,
            paths: relativeDirPathsArray.map(dirName => path.join(this.path, dirName)),
            count: relativeDirPathsArray.length,
            contains: {
                name: (dirName:string, options?: {matchCase: boolean}): boolean =>
                {
                    if (options?.matchCase)
                    {
                        return relativeDirPathsArray.some(dirRelativePath => dirName === path.basename(dirRelativePath));
                    }
                    else
                    {
                        return relativeDirPathsArray.some(dirRelativePath => dirName.localeCompare(path.basename(dirRelativePath), undefined, {sensitivity: "base"}) === 0);
                    }
                },

                path: (dirAbsOrRelPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    if (options?.matchCase)
                    {
                        return relativeDirPathsArray.some(dirRelPath => dirRelPath === dirAbsOrRelPath || path.join(this.path, dirRelPath) === dirAbsOrRelPath);
                    }
                    else
                    {
                        return relativeDirPathsArray.some(dirRelPath => dirAbsOrRelPath.localeCompare(dirRelPath, undefined, {sensitivity: "base"}) === 0 || dirAbsOrRelPath.localeCompare(path.join(this.path, dirRelPath), undefined, {sensitivity: "base"}) === 0);
                    }
                }
            }
        };
    }

    public direntSync(): VirtualDirents
    {
        return {
            names: this.fileSync().names.concat(this.dirSync().names),
            paths: this.fileSync().paths.concat(this.dirSync().paths),
            count: this.fileSync().count + this.direntSync().count,
            contains: {
                name: (direntName:string, options?: {matchCase: boolean}): boolean =>
                {
                    return this.fileSync().contains.name(direntName, options)
                           || this.dirSync().contains.name(direntName, options);
                },

                path: (direntAbsOrRelPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return this.fileSync().contains.path(direntAbsOrRelPath, options)
                           || this.dirSync().contains.path(direntAbsOrRelPath, options);
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

export {VirtualDirElement as default};
