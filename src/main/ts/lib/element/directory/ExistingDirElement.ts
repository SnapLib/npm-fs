import type ExistingElement from "../ExistingElement.js";
import AbstractDirElement from "./AbstractDirElement.js";
import type { ExistingDirents } from "./DirElement.js";
import Path from "path";
import fs from "fs";

export class ExistingDirElement extends AbstractDirElement implements ExistingElement
{
    readonly #direntsArray: ReadonlyArray<fs.Dirent>;

    public constructor(existingDirPath: string, ...morePaths: ReadonlyArray<string>)
    {
        super(Path.normalize([existingDirPath].concat(morePaths).join(Path.sep)), {exists: true});
        this.#direntsArray = fs.readdirSync(this.path, {withFileTypes: true});
    }

    public fileSync(): ExistingDirents
    {
        return parseDirents(this.path, this.#direntsArray, {directory: true});
    }

    public dirSync(): ExistingDirents
    {
        return parseDirents(this.path, this.#direntsArray, {file: true});
    }

    public direntSync(): ExistingDirents
    {
        return parseDirents(this.path, this.#direntsArray);
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

export const readerSync = (directoryPath: string, options?: {recursive: boolean}): ExistingDirents =>
{
    const _dirents: ReadonlyArray<fs.Dirent> = fs.readdirSync(directoryPath, {withFileTypes: true});

    // If recursive option isn't TRUE, just return info about the directories
    // and files from the root of this `DirElement`
    if (options?.recursive !== true)
    {
        return {
            dirents: _dirents,
            names: _dirents.map(dirent => dirent.name),
            paths: _dirents.map(dirent => Path.join(directoryPath, dirent.name)),
            count: _dirents.length
        };
    }
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

        const allPaths: ReadonlyArray<string> = getAllPaths(directoryPath);

        const allDirents: ReadonlyArray<fs.Dirent> = getAllDirents(directoryPath);

        return {
            dirents: allDirents,
            names: allDirents.map(dirent => dirent.name),
            paths: allPaths,
            count: allDirents.length,
        };
    }
};

const parseDirents = (rootParentDirPath: string, dirents: ReadonlyArray<fs.Dirent>, filterOut?: {file?: boolean, directory?: boolean}): ExistingDirents =>
{
    const direntsArray: ReadonlyArray<fs.Dirent> =
        dirents.filter(p => (filterOut?.file ? ! p.isFile() : true)
                       && (filterOut?.directory ? ! p.isDirectory() : true));

        return {
            dirents: direntsArray,
            names: direntsArray.map(dirent => dirent.name),
            paths: direntsArray.map(dirent => Path.join(rootParentDirPath, dirent.name)),
            count: direntsArray.length
        };
};

export {ExistingDirElement as default, readerSync as existingDirReader};
