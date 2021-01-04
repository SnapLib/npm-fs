import { AbstractDirElement } from "./AbstractDirElement";
import { join, normalize, sep } from "path";
import fs from "fs";
import { ExistingElement } from "./ExistingElement";

export class ExistingDirElement extends AbstractDirElement implements ExistingElement
{
    protected constructor(path: string, ...morePaths: readonly string[])
    {
        super(normalize([path].concat(morePaths).join(sep)), {exists: true});
    }

    public inodeSync(): number
    {
        return fs.lstatSync(this.path).ino;
    }
    deleteSync(): boolean
    {
        fs.rmdirSync(this.path, {recursive: true});
        return ! fs.existsSync(this.path);
    }
    copyToSync(dest: string, options?: { overwrite: boolean; }): boolean
    {
        throw new Error("Method not implemented. No-op args" + dest + options);
    }
    renameSync(newName: string, options?: { overwrite: boolean; }): boolean
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

    direntsSync(): ReadonlyArray<fs.Dirent>
    {
        return fs.readdirSync(this.path, {withFileTypes: true});
    }

    fileNamesSync(): readonly string[]
    {
        return this.direntsSync().filter(dirent => dirent.isFile()).map(fileDirent => fileDirent.name);
    }
    dirNamesSync(): readonly string[]
    {
        return this.direntsSync().filter(dirent => dirent.isDirectory()).map(dirDirent => dirDirent.name);
    }

    public size(): number
    {
        return ExistingDirElement.sizeOf(this.path);
    }

    /**
     * Returns the total size, in bytes, of the directory at the given path. If
     * the provided path doesn't point to an existing element, then -1 is
     * returned. If the provided path points to a file, then the file's size is
     * returned.
     *
     * @param directoryPath The path to the directory to get the size of
     *
     * @returns the size, in bytes, of the directory or file that the provided
     *          path points to
     *
     * @static
     * @function
     */
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

}
