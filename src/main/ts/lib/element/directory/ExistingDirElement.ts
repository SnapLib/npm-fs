import type ExistingElement from "../ExistingElement.js";
import AbstractDirElement from "./AbstractDirElement.js";
import type { ExistingDirents } from "./DirElement.js";
import Path from "path";
import fs from "fs";

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
    public constructor(existingDirPath: string, ...morePaths: ReadonlyArray<string>)
    {
        super(Path.normalize([existingDirPath].concat(morePaths).join(Path.sep)), {exists: true});
    }

    public fileSync(options?: {recursive: boolean}): ExistingDirents
    {
        return dirReaderSync(this.path, options).file;
    }

    public dirSync(options?: {recursive: boolean}): ExistingDirents
    {
        return dirReaderSync(this.path, options).directory;
    }

    public direntSync(options?: {recursive: boolean}): ExistingDirents
    {
        return {
            dirents: dirReaderSync(this.path, options).dirents,
            names: dirReaderSync(this.path, options).names,
            paths: dirReaderSync(this.path, options).paths,
            count: dirReaderSync(this.path, options).count
        };
    }

    public inodeSync(): number
    {
        return fs.lstatSync(this.path).ino;
    }

    public deleteSync(): boolean
    {
        fs.rmdirSync(this.path, {recursive: true});
        return ! fs.existsSync(this.path);
    }

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
 * @returns The total size (in bytes) of the directory at the proved path.
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
 * @param directoryPath The path to the directory to read.
 *
 * @param options To read directory recursively or not.
 */
export const dirReaderSync = (directoryPath: string, options?: {recursive: boolean}): ExistingDirents & {file: ExistingDirents, directory: ExistingDirents} =>
{
    // If recursive option isn't TRUE, just return info about the directories
    // and files from the root of this `DirElement`
    if (options?.recursive !== true)
    {
        const _dirents: ReadonlyArray<fs.Dirent> =
            fs.readdirSync(directoryPath, {withFileTypes: true});

        const _fileDirents: ReadonlyArray<fs.Dirent> =
            _dirents.filter(dirent => dirent.isFile());

        const _dirDirents: ReadonlyArray<fs.Dirent> =
            _dirents.filter(dirent => dirent.isDirectory());

        const _fileExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _fileDirents,
            names: _fileDirents.map(fileDirent => fileDirent.name),
            paths: _fileDirents.map(fileDirent => Path.join(directoryPath, fileDirent.name)),
            count: _fileDirents.length
        };

        const _dirExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _dirDirents,
            names: _dirDirents.map(dirDirent => dirDirent.name),
            paths: _dirDirents.map(dirDirent => Path.join(directoryPath, dirDirent.name)),
            count: _dirDirents.length
        };

        return {
            dirents: _dirents,
            names: _dirents.map(dirent => dirent.name),
            paths: _dirents.map(dirent => Path.join(directoryPath, dirent.name)),
            file: _fileExistingDirents,
            directory: _dirExistingDirents,
            count: _dirents.length
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
        const _allPaths: ReadonlyArray<string> = ((dirPath: string) =>
        {
            const _paths: ReadonlyArray<string> = getAllPaths(dirPath);

            return _paths.includes(dirPath)
                   ? _paths.filter(path => path !== dirPath)
                   : _paths;
        })(directoryPath);

        // Every directory entry the directory at the provided path contains
        // recursively
        const _allDirents: ReadonlyArray<fs.Dirent> = getAllDirents(directoryPath);

        // The absolute paths to all files the directory at the provided path
        // contains recursively
        const _allFilePaths: ReadonlyArray<string> =
            _allPaths.filter(path => fs.lstatSync(path).isFile());

        const _allDirPaths: ReadonlyArray<string> =
            _allPaths.filter(path => fs.lstatSync(path).isDirectory());

        const _fileDirents: ReadonlyArray<fs.Dirent> =
            _allDirents.filter(dirent => dirent.isFile());

        const _dirDirents: ReadonlyArray<fs.Dirent> =
            _allDirents.filter(dirent => dirent.isDirectory());

        const _fileExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _fileDirents,
            names: _fileDirents.map(fileDirent => fileDirent.name),
            paths: _allFilePaths,
            count: _fileDirents.length
        };

        const _dirExistingDirents: Readonly<ExistingDirents> =
        {
            dirents: _dirDirents,
            names: _dirDirents.map(dirDirent => dirDirent.name),
            paths: _allDirPaths,
            count: _dirDirents.length
        };

        return {
            dirents: _allDirents,
            names: _allDirents.map(dirent => dirent.name),
            paths: _allPaths,
            file: _fileExistingDirents,
            directory: _dirExistingDirents,
            count: _allDirents.length,
        };
    }
};

export {ExistingDirElement as default, dirReaderSync as existingDirReader};
