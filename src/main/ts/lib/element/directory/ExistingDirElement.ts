import type ExistingElement from "../ExistingElement.js";
import AbstractDirElement from "./AbstractDirElement.js";
import type { ExistingDirents } from "./DirElement.js";
import path from "path";
import fs from "fs";

export class ExistingDirElement extends AbstractDirElement implements ExistingElement
{
    readonly #direntsArray: ReadonlyArray<fs.Dirent>;

    public constructor(existingDirPath: string, ...morePaths: ReadonlyArray<string>)
    {
        super(path.normalize([existingDirPath].concat(morePaths).join(path.sep)), {exists: true});
        this.#direntsArray = fs.readdirSync(this.path, {withFileTypes: true});
    }

    public fileSync(): ExistingDirents
    {
        const fileDirents: ReadonlyArray<fs.Dirent> =
            this.#direntsArray.filter(dirent => dirent.isFile());

        return {
            dirents: fileDirents,
            names: fileDirents.map(fileDirent => fileDirent.name),
            paths: fileDirents.map(fileDirent => path.join(this.path, fileDirent.name))
        };
    }

    public dirSync(): ExistingDirents
    {
        const dirDirents: ReadonlyArray<fs.Dirent> =
            this.#direntsArray.filter(dirent => dirent.isDirectory());

        return {
            dirents: dirDirents,
            names: dirDirents.map(dirDirent => dirDirent.name),
            paths: dirDirents.map(dirDirent => path.join(this.path, dirDirent.name))
        };
    }

    public direntSync(): ExistingDirents
    {
        const direntsArray: ReadonlyArray<fs.Dirent> =
            this.#direntsArray.filter(dirent => dirent.isFile());

        return {
            dirents: direntsArray,
            names: direntsArray.map(dirent => dirent.name),
            paths: direntsArray.map(dirent => path.join(this.path, dirent.name))
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

    public direntsSync(): readonly fs.Dirent[]
    {
        return fs.readdirSync(this.path, {withFileTypes: true});
    }

    public direntNamesSync(): ReadonlyArray<string>
    {
        return this.direntSync().names;
    }

    public direntPathsSync(): ReadonlyArray<string>
    {
        return this.direntSync().paths;
    }

    public fileNamesSync(): ReadonlyArray<string>
    {
        return this.fileSync().names;
    }

    public filePathsSync(): ReadonlyArray<string>
    {
        return this.fileSync().paths;
    }

    public dirNamesSync(): ReadonlyArray<string>
    {
        return this.dirSync().names;
    }

    public dirPathsSync(): ReadonlyArray<string>
    {
        return this.dirSync().paths;
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
        return this.direntSync().names.length;
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
                                                 ? getAllFilePaths(path.join(dirPath, dirent.name))
                                                 : path.join(dirPath, dirent.name));};

        return ((dirPath: string): number  =>
            getAllFilePaths(dirPath).map(filePath => fs.lstatSync(filePath).size)
                                    .reduce((fileSize, nextFileSize) => fileSize + nextFileSize))(directoryPath);
    }
};

export {ExistingDirElement as default};
