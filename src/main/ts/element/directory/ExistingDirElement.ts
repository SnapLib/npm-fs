import type { ExistingElement } from "../ExistingElement";
import {AbstractDirElement} from "./AbstractDirElement";
import { join, normalize, sep } from "path";
import fs from "fs";

export class ExistingDirElement extends AbstractDirElement implements ExistingElement
{
    public constructor(path: string, ...morePaths: readonly string[])
    {
        super(normalize([path].concat(morePaths).join(sep)), {exists: true});
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

    public direntsSync(): readonly fs.Dirent[]
    {
        return fs.readdirSync(this.path, {withFileTypes: true});
    }

    public direntNamesSync(): readonly string[]
    {
        return fs.readdirSync(this.path);
    }

    public direntPathsSync(): readonly string[]
    {
        return this.direntNamesSync().map(direntName => join(this.path, direntName));
    }

    public fileNamesSync(): readonly string[]
    {
        return this.direntsSync().filter(dirent => dirent.isFile()).map(fileDirent => fileDirent.name);
    }

    public filePathsSync(): readonly string[]
    {
        return this.fileNamesSync().map(fileName => join(this.path, fileName));
    }

    public dirNamesSync(): readonly string[]
    {
        return this.direntsSync().filter(dirent => dirent.isDirectory()).map(dirDirent => dirDirent.name);
    }

    public dirPathsSync(): readonly string[]
    {
        return this.dirNamesSync().map(dirName => join(this.path, dirName));
    }

    public containsFileSync(fileName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.direntNamesSync().includes(fileName);
        }
        else
        {
            return this.direntNamesSync().some(fileDirentName => fileName.localeCompare(fileDirentName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public containsDirSync(dirName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.direntNamesSync().includes(dirName);
        }
        else
        {
            return this.direntNamesSync().some(dirDirentName => dirName.localeCompare(dirDirentName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public containsSync(fileOrDirName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.direntNamesSync().includes(fileOrDirName);
        }
        else
        {
            return this.direntNamesSync().some(direntName => fileOrDirName.localeCompare(direntName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public length(): number
    {
        return this.direntsSync().length;
    }

    public isEmpty(): boolean
    {
        return this.length() === 0;
    }

    public sizeSync(): number
    {
        return ExistingDirElement.sizeOf(this.path);
    }

    public static sizeOf(directoryPath: string): number
    {
        if ( ! fs.existsSync(directoryPath))
        {
            return -1;
        }
        else if (fs.lstatSync(directoryPath).isFile())
        {
            return fs.lstatSync(directoryPath).size;
        }
        else
        {
            const getAllFilePaths = (dirPath: string): ReadonlyArray<string> => {
                return fs.readdirSync(dirPath, {withFileTypes: true})
                         .flatMap(dirent => dirent.isDirectory()
                                                     ? getAllFilePaths(join(dirPath, dirent.name))
                                                     : join(dirPath, dirent.name));};

            return ((dirPath: string): number  =>
                getAllFilePaths(dirPath).map(filePath => fs.lstatSync(filePath).size)
                                        .reduce((fileSize, nextFileSize) => fileSize + nextFileSize))(directoryPath);
        }
    }

    public copyToSync(dest: string, options?: { overwrite: boolean }): boolean
    {
        throw new Error("Method not implemented. No-op args" + dest + options);
    }
}
