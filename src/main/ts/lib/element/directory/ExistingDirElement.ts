import type ExistingElement from "../ExistingElement";
import AbstractDirElement from "./AbstractDirElement";
import type { ExistingDirents } from "./DirElement";
import Path from "path";
import fs from "fs";
import {fileURLToPath} from "url";

/**
 * Class to create existing file system directory element objects.
 *
 * @classdesc
 * This class creates a Directory Element based on an existing directory that
 * has been read from disk. It contains various methods to query the files and
 * directories this existing directory element contains.
 *
 * @author Snap <snap@snaplib.org>
 */
export class ExistingDirElement extends AbstractDirElement implements ExistingElement
{
    /**
     * Constructs an existing directory element out of the directory the
     * provided absolute path string argument points to.
     *
     * One or more string arguments can optionally be provided. The following
     * examples showing the 2 instantiation statements would be interpreted
     * equally.
     *
     * @example Constructor arguments
     * ```typescript
     * const existingDirOne = new ExistingDirElement("/path/to/directory");
     *
     * const existingDirTwo = new ExistingDirElement("path", "to", "directory");
     * ```
     *
     * @param existingDirPath The absolute path or the prefix of the absolute
     *                        path of this file system element
     *
     * @constructor
     */
    public constructor(existingDirPath: string)
    {
        super(existingDirPath, {exists: true});
    }

    public fileSync(options?: {recursive: boolean}): Readonly<ExistingDirents>
    {
        return dirReaderSync(this.path, options).file;
    }

    public dirSync(options?: {recursive: boolean}): Readonly<ExistingDirents>
    {
        return dirReaderSync(this.path, options).directory;
    }

    public direntSync(options?: {recursive: boolean}): Readonly<ExistingDirents>
    {
        const thisExistingDirElement: Readonly<ExistingDirents> =
            dirReaderSync(this.path, options);

        return {
            dirents: thisExistingDirElement.dirents,
            names: thisExistingDirElement.names,
            paths: thisExistingDirElement.paths,
            count: thisExistingDirElement.count,
            contains:
                {
                    dirent: (aDirent: fs.Dirent): boolean =>
                    {
                        return thisExistingDirElement.contains.dirent(aDirent);
                    },

                    name: (existingDirElementName: string, options?: {matchCase: boolean}): boolean =>
                    {
                        return thisExistingDirElement.contains.name(existingDirElementName, options);
                    },

                    path: (existingDirAbsOrRelPath: string, options?: {matchCase: boolean}): boolean =>
                    {
                        return thisExistingDirElement.contains.path(existingDirAbsOrRelPath, options);
                    }
                }
        };
    }

    /** @inheritDoc */
    public inodeSync(): number
    {
        return fs.lstatSync(this.path).ino;
    }

    /** @inheritDoc */
    public deleteSync(): boolean
    {
        fs.rmdirSync(this.path, {recursive: true});
        return ! fs.existsSync(this.path);
    }

    /** @inheritDoc */
    public renameSync(newName: string, options?: { overwrite: boolean; }): boolean
    {
        // If overwrite option isn't true and element exists return false
        if ( ! options?.overwrite && fs.existsSync(newName))
        {
            return false;
        }
        // If element doesn't exist or overwrite option is true
        else
        {
            fs.renameSync(this.path, newName);
            return fs.existsSync(newName);
        }
    }

    public length(): number
    {
        return this.direntSync().dirents.length;
    }

    public isEmpty(): boolean
    {
        return this.length() === 0;
    }

    public sizeSync(): number
    {
        return dirSize(this.path);
    }

    public copyToSync(dest: string, options?: { overwrite: boolean }): boolean
    {
        throw new Error("Method not implemented. No-op args" + dest + options);
    }

    public toString(): string
    {
        return "ExistingDirElement:\n".concat(super.toString());
    }

    /**
     *
     * @param existingDirPath The absolute path or root of the absolute path of
     *                        an existing directory
     *
     * @param morePaths Additional paths that will be appended as nested paths
     *                  to `existingDirPath`
     *
     * @returns An ExistingDirElement object created from the provided path
     *          argument(s)
     */
    public static of(existingDirPath: string, ...morePaths: ReadonlyArray<string>): Readonly<ExistingDirElement>
    {
        return new ExistingDirElement(Path.normalize([existingDirPath].concat(morePaths).join(Path.sep)));
    }

    /**
     *
     * @param directoryUrl The url to an existing directory
     *
     * @returns An ExistingDirElement object created from the provided url
     */
    public static ofUrl(directoryUrl: string): Readonly<ExistingDirElement>
    {
        return new ExistingDirElement(fileURLToPath(directoryUrl));
    }
}

/**
 * Returns the total size (in bytes) of the existing directory the provided
 * string path argument points to. This includes the sum of all the sizes of
 * it's sub directories and files.
 *
 * If the provided path doesn't point to an existing file system element, `-1`
 * is returned. If the provided path argument doesn't point to a directory, an
 * error is thrown.
 *
 * @param directoryPath The path pointing to the directory to return the size
 *                      of.
 *
 * @returns The total size (in bytes) of the directory at the provided path.
 *
 * @throws Error If provided path points to an element that's not a directory.
 */
export const dirSize = (directoryPath: string): number =>
{
    if ( ! fs.existsSync(directoryPath))
    {
        return -1;
    }
    // Parse directory size if provided path points to a directory
    else if (fs.lstatSync(directoryPath).isDirectory())
    {
        const getAllFilePaths = (dirPath: string): ReadonlyArray<string> => {
            return fs.readdirSync(dirPath, {withFileTypes: true})
                     .flatMap(dirent => dirent.isDirectory()
                                                 ? getAllFilePaths(Path.join(dirPath, dirent.name))
                                                 : Path.join(dirPath, dirent.name));};

        return ((dirPath: string): number  =>
            getAllFilePaths(dirPath).map(filePath => fs.lstatSync(filePath).size)
                                    .reduce((fileSize, nextFileSize) => fileSize + nextFileSize))(directoryPath);
    }
    // If provided path doesn't point to a directory throw an error
    else
    {
        throw new Error(`path doesn't point to a directory: ${directoryPath}`);
    }
};

/**
 * Reads the directory that the provided path string argument points to and
 * returns the files and directories it contains in a filtered and/or formatted
 * manner.
 *
 * If the recursive option isn't `true`, then the directory is read to a depth
 * of `0`. This means only the root of the directory is read. All other files
 * and directories are ignored.
 *
 * @remarks
 * This expression can probably be refactored and combined with the similar
 * expression located in the {@link VirtualDirElement} class.
 *
 * @param directoryPath The path to the directory to read.
 *
 * @param options To read directory recursively or not.
 */
export const dirReaderSync = (directoryPath: string, options?: {recursive: boolean}): Readonly<ExistingDirents & {file: ExistingDirents, directory: ExistingDirents}> =>
{
    const _contains =
            {
                dirent: (dirents: ReadonlyArray<fs.Dirent>, aDirent: fs.Dirent): boolean =>
                {
                    return dirents.includes(aDirent);
                },

                name: (dirElementNames: ReadonlyArray<string>, existingDirElementName: string, options?: {matchCase: boolean}): boolean =>
                {
                    return options?.matchCase !== true ?
                           dirElementNames.some(existingDirentName =>
                                                          existingDirElementName.localeCompare(existingDirentName,
                                                                                               undefined,
                                                                                               {sensitivity: "base"}))
                        : dirElementNames.includes(existingDirElementName);
                },

                path: (existingDirElementAbsPaths: ReadonlyArray<string>, existingDirAbsOrRelPath: string, options?: {matchCase: boolean}): boolean =>
                    {
                        if (existingDirElementAbsPaths.includes(existingDirAbsOrRelPath))
                        {
                            return true;
                        }
                        /*
                        If matchCase option isn't explicitly set to false,
                        perform check case insensitively.
                         */
                        if (options?.matchCase === false
                            && existingDirElementAbsPaths.some(existingDirPath =>
                                                                     existingDirAbsOrRelPath.localeCompare(existingDirPath,
                                                                                                           undefined,
                                                                                                           {sensitivity: "base"}) === 0
                                                                     || existingDirAbsOrRelPath.slice(directoryPath.length + 1)
                                                                                               .localeCompare(existingDirPath,
                                                                                                              undefined,
                                                                                                              {sensitivity: "base"}) === 0))
                        {
                            return true;
                        }
                        /*
                         Checks if there's an absolute path that 100% matches
                         passed string or compares passed string to absolute
                         paths converted to relative paths by removing length
                         of this.path + 1 from the absolute path and then strict
                         comparing it to the provided string argument.
                         */
                        else
                        {
                            return existingDirElementAbsPaths.some(existingDirPath => existingDirPath.slice(directoryPath.length + 1) === existingDirAbsOrRelPath);
                        }
                    }
            };

    // If recursive option isn't TRUE, just return info about the directories
    // and files from the root of this `DirElement`
    if (options?.recursive !== true)
    {
        const _dirents: ReadonlyArray<fs.Dirent> =
            fs.readdirSync(directoryPath, {withFileTypes: true});

        const _direntNames: ReadonlyArray<string> =
            _dirents.map(dirent => dirent.name);

        const _direntAbsPaths: ReadonlyArray<string> =
            _dirents.map(dirent => Path.join(directoryPath, dirent.name));

        const _fileDirents: ReadonlyArray<fs.Dirent> =
            _dirents.filter(dirent => dirent.isFile());

        const _fileNames: ReadonlyArray<string> =
            _fileDirents.map(fileDirent => fileDirent.name);

        const _fileAbsPaths: ReadonlyArray<string> =
            _fileDirents.map(fileDirent => Path.join(directoryPath, fileDirent.name));

        const _dirDirents: ReadonlyArray<fs.Dirent> =
            _dirents.filter(dirent => dirent.isDirectory());

        const _dirNames: ReadonlyArray<string> =
            _dirDirents.map(dirDirent => dirDirent.name);

        const _dirAbsPaths: ReadonlyArray<string> =
            _dirDirents.map(dirDirent => Path.join(directoryPath, dirDirent.name));

        const _fileExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _fileDirents,
            names: _fileNames,
            paths: _fileAbsPaths,
            count: _fileDirents.length,
            contains: {
                dirent: (dirent: fs.Dirent): boolean =>
                {
                    return _contains.dirent(_fileDirents, dirent);
                },

                name: (fileName: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.name(_fileNames, fileName, options);
                },

                path: (filePath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.path(_fileAbsPaths, filePath, options);
                }
            }
        };

        const _dirExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _dirDirents,
            names: _dirNames,
            paths: _dirAbsPaths,
            count: _dirDirents.length,
            contains: {
                dirent: (dirent: fs.Dirent): boolean =>
                {
                    return _contains.dirent(_dirDirents, dirent);
                },

                name: (dirName: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.name(_dirNames, dirName, options);
                },

                path: (dirPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.path(_dirAbsPaths, dirPath, options);
                }
            }
        };

        return {
            dirents: _dirents,
            names: _direntNames,
            paths: _direntAbsPaths,
            file: _fileExistingDirents,
            directory: _dirExistingDirents,
            count: _dirents.length,
            contains: {
                dirent: (dirent: fs.Dirent): boolean =>
                {
                    return _contains.dirent(_dirents, dirent);
                },

                name: (direntName: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.name(_direntNames, direntName, options);
                },

                path: (direntPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.path(_direntAbsPaths, direntPath, options);
                }
            }
        };
    }
    // If recursive option is TRUE
    else
    {
        // Get all dirents a directory contains recursively
        const getAllDirents = (dirPath: string): ReadonlyArray<fs.Dirent> =>
        {
            return fs.readdirSync(dirPath, {withFileTypes: true})
                     .flatMap(dirent => dirent.isDirectory()
                                                 ? getAllDirents(Path.join(dirPath, dirent.name)).concat(dirent)
                                                 : dirent);
        };

        // FIXME Returned paths array contains path to parent root directory, it
        //  should not be included in returned array, only nested paths
        // Get the paths of all files and directories a directory contains
        // recursively
        const getAllPaths = (dirPath: string): ReadonlyArray<string> =>
        {
            return fs.readdirSync(dirPath, {withFileTypes: true})
                     .flatMap(dirent => dirent.isDirectory()
                                                 ? getAllPaths(Path.join(dirPath, dirent.name))
                                                 : Path.join(dirPath, dirent.name)).concat(dirPath);
        };

        // HACK stream all paths filtering out root directory path
        // The absolute paths of all files and directories the directory at the
        // provided directory path contains recursively
        const _allDirentAbsPaths: ReadonlyArray<string> = ((dirPath: string) =>
        {
            const _paths: ReadonlyArray<string> = getAllPaths(dirPath);

            return _paths.includes(dirPath)
                   ? _paths.filter(path => path !== dirPath)
                   : _paths;
        })(directoryPath);

        // Every directory entry the directory at the provided path contains
        // recursively
        const _allDirents: ReadonlyArray<fs.Dirent> = getAllDirents(directoryPath);

        const _allDirentNames: ReadonlyArray<string> =
            _allDirents.map(dirent => dirent.name);

        // The absolute paths to all files the directory at the provided path
        // contains recursively
        const _allFileAbsPaths: ReadonlyArray<string> =
            _allDirentAbsPaths.filter(path => fs.lstatSync(path).isFile());

        const _allDirAbsPaths: ReadonlyArray<string> =
            _allDirentAbsPaths.filter(path => fs.lstatSync(path).isDirectory());

        const _allFileDirents: ReadonlyArray<fs.Dirent> =
            _allDirents.filter(dirent => dirent.isFile());

        const _allFileNames: ReadonlyArray<string> =
            _allFileDirents.map(fileDirent => fileDirent.name);

        const _allDirDirents: ReadonlyArray<fs.Dirent> =
            _allDirents.filter(dirent => dirent.isDirectory());

        const _allDirNames: ReadonlyArray<string> =
            _allDirDirents.map(dirDirent => dirDirent.name);

        const _fileExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _allFileDirents,
            names: _allFileNames,
            paths: _allFileAbsPaths,
            count: _allFileDirents.length,
            contains: {
                dirent: (dirent: fs.Dirent): boolean =>
                {
                    return _contains.dirent(_allFileDirents, dirent);
                },

                name: (fileName: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.name(_allFileNames, fileName, options);
                },

                path: (filePath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.path(_allFileAbsPaths, filePath, options);
                }
            }
        };

        const _dirExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _allDirDirents,
            names: _allDirNames,
            paths: _allDirAbsPaths,
            count: _allDirDirents.length,
            contains: {
                dirent: (dirent: fs.Dirent): boolean =>
                {
                    return _contains.dirent(_allDirDirents, dirent);
                },

                name: (dirName: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.name(_allDirNames, dirName, options);
                },

                path: (dirPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.path(_allDirAbsPaths, dirPath, options);
                }
            }
        };

        return {
            dirents: _allDirents,
            names: _allDirentNames,
            paths: _allDirentAbsPaths,
            file: _fileExistingDirents,
            directory: _dirExistingDirents,
            count: _allDirents.length,
            contains: {
                dirent: (dirent: fs.Dirent): boolean =>
                {
                    return _contains.dirent(_allDirents, dirent);
                },

                name: (direntName: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.name(_allDirentNames, direntName, options);
                },

                path: (direntPath: string, options?: {matchCase: boolean}): boolean =>
                {
                    return _contains.path(_allDirentAbsPaths, direntPath, options);
                }
            }
        };
    }
};

export {ExistingDirElement as default, dirReaderSync as existingDirReader};
