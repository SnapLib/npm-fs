import type ExistingElement from "../ExistingElement.js";
import AbstractDirElement from "./AbstractDirElement.js";
import type { ExistingDirents } from "./DirElement.js";
import Path from "path";
import fs from "fs";

export class ExistingDirElement extends AbstractDirElement implements ExistingElement
{
    public constructor(existingDirPath: string, ...morePaths: ReadonlyArray<string>)
    {
        super(Path.normalize([existingDirPath].concat(morePaths).join(Path.sep)), {exists: true});
    }

    public readerSync(options?: {recursive: boolean}): ExistingDirents
    {
        return readerSync(this.path, options);
    }

    public fileSync(options?: {recursive: boolean}): ExistingDirents
    {
        return readerSync(this.path, options).file;
    }

    public dirSync(options?: {recursive: boolean}): ExistingDirents
    {
        return readerSync(this.path, options).directory;
    }

    public direntSync(options?: {recursive: boolean}): ExistingDirents
    {
        return {
            dirents: readerSync(this.path, options).dirents,
            names: readerSync(this.path, options).names,
            paths: readerSync(this.path, options).paths,
            count: readerSync(this.path, options).count
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
        if ( ! options?.overwrite && fs.existsSync(newName))
        {
            return false;
        }
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

export const dirSize = (directoryPath: string): number =>
{
    if ( ! fs.existsSync(directoryPath))
    {
        return -1;
    }
    else if (fs.lstatSync(directoryPath).isFile())
    {
        throw new Error(`path points to a file: ${directoryPath}`);
    }
    else
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
};

export const readerSync = (directoryPath: string, options?: {recursive: boolean}): ExistingDirents & {file: ExistingDirents, directory: ExistingDirents} =>
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
    // FIXME paths property of directory recursive search returning empty array
    // If recursive option is TRUE
    else
    {
        // Get all dirents a directory contains recursively
        const getAllDirents = (dirPath: string): ReadonlyArray<fs.Dirent> => {
            return fs.readdirSync(dirPath, {withFileTypes: true})
                     .flatMap(dirent => dirent.isDirectory()
                                                 ? getAllDirents(Path.join(dirPath, dirent.name)).concat(dirent)
                                                 : dirent);};

        // Get the paths of all files and directories a directory contains
        // recursively
        const getAllPaths = (dirPath: string): ReadonlyArray<string> => {
            return fs.readdirSync(dirPath, {withFileTypes: true})
                     .flatMap(dirent => dirent.isDirectory()
                                                 ? getAllPaths(Path.join(dirPath, dirent.name))
                                                 : Path.join(dirPath, dirent.name));};

        const _allPaths: ReadonlyArray<string> = getAllPaths(directoryPath);

        const _allDirents: ReadonlyArray<fs.Dirent> = getAllDirents(directoryPath);

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

export {ExistingDirElement as default, readerSync as existingDirReader};
