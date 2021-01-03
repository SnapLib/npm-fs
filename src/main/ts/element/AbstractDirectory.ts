import {Type} from "./Element";
import {AbstractElement} from "./AbstractElement";
import {AbstractFile} from "./AbstractFile";
import * as fs from "fs";
import * as path from "path";

/**
 * Root implementation for all directory elements.
 *
 * @classdesc
 * The `Directory` class is used to create a directory element object that
 * represents a directory in a file system.
 *
 * @remarks
 * Note that there is a discernible difference between a "directory element" and
 * a "directory". A "directory element" is a typescript object and exists purely
 * as a typescript struct. While a "directory" is a literal directory that
 * exists within an operating system. While a directory and directory element
 * are closely related and the terms can often be used interchangeably and make
 * sense within the context they're used, they are not the same thing. A
 * directory element is how a directory can be represented programmatically via
 * typescript.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 *
 * @extends AbstractElement
 */
export class AbstractDirectory extends AbstractElement
{
    /**
     * Creates a new instance of a `Directory` element. A directory element only
     * requires a path to write a directory to.
     *
     * @param directoryPath Full path or root of the path of this directory
     *                      element
     *
     * @param nestedDirectoryPaths Nested paths to resolve that point to this
     *                             directory element
     *
     * @throws {@link BlankElementPathError} if provided directory path argument
     *         is empty or only consists of whitespace
     *
     * @constructor
     */
    public constructor(directoryPath: string, ...nestedDirectoryPaths: ReadonlyArray<string>)
    {
        super(Type.DIRECTORY, path.normalize([directoryPath].concat(nestedDirectoryPaths).join(path.sep)));
    }

    /**
     * Returns the entries this directory element contains.
     *
     * @returns the entries this directory contains
     *
     * @override
     * @sealed
     * @function
     */
    public contentsSync(): ReadonlyArray<AbstractElement>
    {
        return this.exists() ? fs.readdirSync(this.path, {withFileTypes: true}).map(dirent => dirent.isDirectory() ? new AbstractDirectory(path.join(this.path, dirent.name)) : new AbstractFile(path.join(this.path, dirent.name))) : Array<AbstractElement>();
    }

    /**
     * Writes this directory element to the underlying operating system's disk
     * if its path doesn't point to a pre-existing element. Returns `true` if
     * it's successfully written otherwise returns `false`.
     *
     * @remarks The {@link overwriteSync} method can be used to write this directory
     * element to disk regardless of whether or not its path points to a
     * pre-existing element.
     *
     * @returns `true` if this directory element is successfully written to disk
     *
     * @override
     * @sealed
     * @function
     */
    public createSync(): boolean
    {
        if (fs.existsSync(this.path))
        {
            return false;
        }
        else
        {
            fs.mkdirSync(this.path);

            if (this.isEmpty())
            {
                return fs.existsSync(this.path);
            }
            else
            {
                this.filePaths().forEach(filePath => fs.writeFileSync(filePath, ""));
                this.dirPaths().forEach(dirPath => fs.mkdirSync(dirPath));

                return fs.readdirSync(this.path).every(existingDirentName => this.fileNames().concat(this.dirNames()).includes(existingDirentName));
            }
        }
    }

    /**
     * Writes this directory element to the underlying operating system's disk
     * regardless of whether its path points to a pre-existing element or not.
     * Returns `true` if it's successfully written otherwise returns `false`.
     *
     * @returns `true` if this directory element is successfully written to disk
     *
     * @override
     * @sealed
     * @function
     */
    public overwriteSync(): boolean
    {
        fs.rmSync(this.path, {force: true, recursive: true});

        fs.mkdirSync(this.path);

        if (this.isEmpty())
        {
            return fs.existsSync(this.path);
        }
        else
        {
            this.filePaths().forEach(filePath => fs.writeFileSync(filePath, ""));
            this.dirPaths().forEach(dirPath => fs.mkdirSync(dirPath));

            return fs.readdirSync(this.path).every(existingDirentName => this.fileNames().concat(this.dirNames()).includes(existingDirentName));
        }
    }

    /**
     * Returns the names of the entries this directory element contains.
     *
     * @returns the names of the entries this directory contains
     *
     * @sealed
     * @function
     */
    public getContentNames(): ReadonlyArray<string>
    {
        return this.contentsSync().map<string>(dirent => dirent.name);
    }

    /**
     * Returns the absolute paths of the directory entries this directory
     * element contains.
     *
     * @returns the absolute paths of the directory entries this directory
     *          element contains
     *
     * @sealed
     * @function
     */
    public contentPaths(): ReadonlyArray<string>
    {
        return this.contentsSync().map<string>(dirContentName => path.join(this.path, dirContentName.name));
    }

    /**
     * Returns the name of the directories this directory element contains.
     *
     * @returns the name of the directories this directory element contains
     *
     * @sealed
     * @function
     */
    public dirNames(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.path, {withFileTypes: true}).filter(dirEnt => dirEnt.isDirectory()).map<string>(dir => dir.name);
    }

    /**
     * Returns the absolute paths of the directories this directory element
     * contains.
     *
     * @returns the absolute paths of the directories this directory element
     *          contains
     *
     * @sealed
     * @function
     */
    public dirPaths(): ReadonlyArray<string>
    {
        return this.dirNames().map<string>(dirName => path.join(this.path, dirName));
    }

    /**
     * Returns the name of the files this directory element contains.
     *
     * @returns the name of the files this directory element contains
     *
     * @sealed
     * @function
     */
    public fileNames(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.path, {withFileTypes: true}).filter(dirEnt => dirEnt.isFile()).map<string>(file => file.name);
    }

    /**
     * Returns the absolute paths of the files this directory element contains.
     *
     * @returns the absolute paths of the files this directory element contains
     *
     * @sealed
     * @function
     */
    public filePaths(): ReadonlyArray<string>
    {
        return this.fileNames().map<string>(fileName => path.join(this.path, fileName));
    }

    /**
     * Checks whether the provided file or directory name or path is present as
     * a directory entry in this directory element.
     *
     * @param nameOrPath the name or path of the directory or file whose
     *                   presence in this directory element is being checked for
     *
     * @returns `true` if the provided file or directory name or path is present
     *          in this directory element
     *
     * @sealed
     * @function
     */
    public contains(nameOrPath: string): boolean
    {
        return this.getContentNames().includes(nameOrPath)
            || this.contentPaths().includes(nameOrPath);
    }

    /**
     * Case-insensitive check whether the provided file or directory name or
     * path is present as a directory entry in this directory element.
     *
     * @param nameOrPath the name or path of the directory or file whose
     *                   presence in this directory element is being checked for
     *
     * @returns `true` if the provided file or directory name or path is present
     *          in this directory element
     *
     * @sealed
     * @function
     */
    public containsIgnoreCase(nameOrPath: string): boolean
    {
        return this.getContentNames().some(contentName => nameOrPath.localeCompare(contentName, undefined, {sensitivity: "base"}) === 0)
            || this.contentPaths().some(contentPath => nameOrPath.localeCompare(contentPath, undefined, {sensitivity: "base"}) === 0);
    }

    /**
     * Checks whether the provided file name or path is present in this
     * directory element as a file.
     *
     * @param fileNameOrPath the name or path of the file whose presence in this
     *                       directory element is being checked for
     *
     * @returns `true` if the provided file name or path is present in this
     *          directory element
     *
     * @sealed
     * @function
     */
    public containsFile(fileNameOrPath: string): boolean
    {
        return this.fileNames().includes(fileNameOrPath)
            || this.filePaths().includes(fileNameOrPath);
    }

    /**
     * Case-insensitive check whether the provided file name or path is present
     * in this directory element.
     *
     * @param fileNameOrPath the name or path of the file whose presence in this
     *                       directory element is being checked for
     *
     * @returns `true` if the provided file name or path is present in this
     *          directory element
     *
     * @sealed
     * @function
     */
    public containsFileIgnoreCase(fileNameOrPath: string): boolean
    {
        return this.fileNames().some(fileName => fileNameOrPath.localeCompare(fileName, undefined, {sensitivity: "base"}) === 0)
            || this.filePaths().some(filePath => fileNameOrPath.localeCompare(filePath, undefined, {sensitivity: "base"}) === 0);
    }

    /**
     * Checks whether the provided directory name or path is present in this
     * directory element as a directory.
     *
     * @param dirNameOrPath the name or path of the directory whose presence in
     *                     this  directory element is being checked for
     *
     * @returns `true` if the provided directory name or path is present in this
     *          directory element
     *
     * @sealed
     * @function
     */
    public containsDir(dirNameOrPath: string): boolean
    {
        return this.dirNames().includes(dirNameOrPath)
            || this.dirPaths().includes(dirNameOrPath);
    }

    /**
     * Case-insensitive check whether the provided directory name or path is
     * present in this directory element.
     *
     * @param dirNameOrPath the name or path of the directory whose presence in
     *                      this directory element is being checked for
     *
     * @returns `true` if the provided directory name or path is present in this
     *          directory element
     *
     * @sealed
     * @function
     */
    public containsDirIgnoreCase(dirNameOrPath: string): boolean
    {
        return this.dirNames().some(dirName => dirNameOrPath.localeCompare(dirName, undefined, {sensitivity: "base"}) === 0)
            || this.dirPaths().some(dirPath => dirNameOrPath.localeCompare(dirPath, undefined, {sensitivity: "base"}) === 0);
    }

    /**
     * Returns `true` if this directory element contains any other elements.
     *
     * @returns `true` if this directory element contains any other elements
     *
     * @override
     * @sealed
     * @function
     */
    public isEmpty(): boolean
    {
        return this.exists() && this.contentsSync().length === 0;
    }

    /**
     * Returns the number of directory entries this directory element contains.
     * If this directory element doesn't exist then `-1` is returned.
     *
     * @returns the number of directory entries this directory element contains
     *
     * @override
     * @sealed
     * @function
     */
    public length(): number
    {
        return this.exists() ? this.contentsSync().length : -1;
    }

    /**
     * Returns the number of directory entries this directory element contains
     * if it exists. Otherwise returns -1 if it does not exists.
     *
     * @returns number of directory entries this directory element contains if
     *          it exists, otherwise returns -1
     *
     * @override
     * @sealed
     * @function
     */
    public size(): number
    {
        return AbstractDirectory.sizeOf(this.path);
    }

    /**
     * Returns a string representation of this directory element. Returns a
     * string displaying the path of this element as well as the names of the
     * files and directories it contains.
     *
     * @returns the path of this directory element as well as the names of the
     *          files and directories it contains
     *
     * @override
     * @virtual
     * @function
     */
    public toString(): string
    {
        const fileNames: string = this.fileNames().length === 0 ? "[]" : `["${this.fileNames().join('", "')}"]`;
        const dirNames: string = this.fileNames().length === 0 ? "[]" : `["${this.fileNames().join('", "')}"]`;

        return `{\n\tpath: ${this.path},\n\tfiles: ${fileNames},\n\tdirectories: ${dirNames},\n}\n`;
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
                                                     ? getAllFilePaths(path.join(dirPath, dirent.name))
                                                     : path.join(dirPath, dirent.name));};

            const sumFileSizes = (dirPath: string): number  =>
                getAllFilePaths(dirPath).map(filePath => fs.lstatSync(filePath).size)
                                        .reduce((fileSize, nextFileSize) => fileSize + nextFileSize);

            return sumFileSizes(directoryPath);
        }
    }
}
