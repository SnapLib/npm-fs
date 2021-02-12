import fs from "fs";
import path from "path";

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
export const dirReaderSync = (directoryPath: string, options?: {recursive: boolean}): Readonly<ExistingDirents & {file: Readonly<ExistingDirents>, directory: Readonly<ExistingDirents>}> =>
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
            _dirents.map(dirent => path.join(directoryPath, dirent.name));

        const _fileDirents: ReadonlyArray<fs.Dirent> =
            _dirents.filter(dirent => dirent.isFile());

        const _fileNames: ReadonlyArray<string> =
            _fileDirents.map(fileDirent => fileDirent.name);

        const _fileAbsPaths: ReadonlyArray<string> =
            _fileDirents.map(fileDirent => path.join(directoryPath, fileDirent.name));

        const _dirDirents: ReadonlyArray<fs.Dirent> =
            _dirents.filter(dirent => dirent.isDirectory());

        const _dirNames: ReadonlyArray<string> =
            _dirDirents.map(dirDirent => dirDirent.name);

        const _dirAbsPaths: ReadonlyArray<string> =
            _dirDirents.map(dirDirent => path.join(directoryPath, dirDirent.name));

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
                                                 ? getAllDirents(path.join(dirPath, dirent.name)).concat(dirent)
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
                                                 ? getAllPaths(path.join(dirPath, dirent.name))
                                                 : path.join(dirPath, dirent.name)).concat(dirPath);
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

interface ReturnedDirents
{
    dirents?: ReturnType<() => ReadonlyArray<fs.Dirent>>,
    names: ReturnType<() => ReadonlyArray<string>>,
    paths: ReturnType<() => ReadonlyArray<string>>,
    count: number;

    readonly contains:
        {
            dirent?: (aDirent: fs.Dirent) => boolean,
            name: (elementName: string, options?: {matchCase: boolean}) => boolean,
            path: (elementAbsOrRelPath: string, options?: {matchCase: boolean}) => boolean
        };
}

/**
 * Contains the type of properties the directory entries (dirents) of an
 * existing directory element posses. The dirents of an existing directory
 * element can be returned as absolute path strings, name strings, and as
 * `Dirent` objects. The total number of directory entries can be returned as
 * well.
 */
export interface ExistingDirents extends Required<ReturnedDirents>
{
    readonly contains:
        {
            readonly dirent: (aDirent: fs.Dirent) => boolean,
            readonly name: (existingElementName: string, options?: {matchCase: boolean}) => boolean,
            readonly path: (existingElementAbsOrRelPath: string, options?: {matchCase: boolean}) => boolean
        };
}

/**
 * Contains the type of properties the directory entries (dirents) of a virtual
 * directory element posses. The dirents of a virtual directory element can be
 * returned as absolute path strings and name strings. The total number of
 * directory entries can be returned as well.
 */
export interface VirtualDirents extends Required<Omit<ReturnedDirents, "dirents">>
{
    readonly contains:
        {
            readonly name: (virtualElementName: string, options?: {matchCase: boolean}) => boolean,
            readonly path: (virtualElementAbsOrRelPath: string, options?: {matchCase: boolean}) => boolean
        };
}

export {dirReaderSync as default};
