import { AbstractElement } from "./AbstractElement";
import * as fs from "fs";
import * as path from "path";
import {Type} from "./Element";

/**
 * Root implementation for all directory elements.
 *
 * @classdesc
 * The `Directory` class is used to create a directory element object that
 * represent a directory in a file system. It must be specified during
 * instantiation whether a directory element is based on a pre-existing
 * directory that is already present in the file system.
 *
 * @remarks
 * Note that there is a discernible difference between a "directory element" and
 * a "directory". A "directory element" is a typescript object and exists purely
 * as a typescript struct. While a "directory" is a literal directory that
 * exists within an operating system. While a directory and directory element
 * are closely related, they are not the same thing. A directory element is how
 * a directory can be represented programmatically via typescript. These two
 * terms can be used interchangeably, but their technical differences should be
 * noted.
 *
 * @extends AbstractElement
 */
export class Directory extends AbstractElement
{
    /**
     * Creates a new instance of a `Directory` element. A directory element
     * requires a path and a `boolean` flag indicating whether it should already
     * be present as a directory in the file system.
     *
     * @param directoryPath path of this directory element
     *
     * @param nestedDirectoryPaths Nested paths to resolve that point to this
     *                             directory element
     *
     * @throws {@link BlankElementPathError} if provided element path argument
     *         is empty or only consists of whitespace
     *
     * @throws {@link DirectoryWithFilePathError} if this directory element
     *         should be pre-existing and the provided path points to a file
     *
     * @throws {@link ElementDoesNotExistError} if this directory element should
     *         be pre-existing and the provided path doesn't point to a
     *         pre-existing directory
     *
     * @throws {@link PreExistingElementError} if this directory element should
     *         not be a pre-existing directory and the provided path points to a
     *         pre-existing file or directory
     *
     * @constructor
     */
    public constructor(directoryPath: string, ...nestedDirectoryPaths: ReadonlyArray<string>)
    {
        super(Type.DIRECTORY, path.normalize([directoryPath].concat(nestedDirectoryPaths).join(path.sep)));
    }

    /**
     * Returns the name of the directory entries this directory element
     * contains.
     *
     * @returns the name of the directory entries this directory element
     *          contains
     *
     * @override
     * @sealed
     * @function
     */
    public contents(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.path);
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
        return this.contents().map<string>(dirContentName => path.join(this.path, dirContentName));
    }

    /**
     * Returns the name of the directory entries that are directories this
     * directory element contains.
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
     * Returns the absolute paths of the directory entries that are directories
     * this directory element contains.
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
     * Returns the name of the directory entries that are files this directory
     * element contains.
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
     * Returns the absolute paths of the directory entries that are files this
     * directory element contains.
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
     */
    public contains(nameOrPath: string): boolean
    {
        return this.contents().includes(nameOrPath)
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
     */
    public containsIgnoreCase(nameOrPath: string): boolean
    {
        return this.contents().some(contentName => nameOrPath.localeCompare(contentName, undefined, {sensitivity: "base"}) === 0)
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
     */
    public containsDirIgnoreCase(dirNameOrPath: string): boolean
    {
        return this.dirNames().some(dirName => dirNameOrPath.localeCompare(dirName, undefined, {sensitivity: "base"}) === 0)
            || this.dirPaths().some(dirPath => dirNameOrPath.localeCompare(dirPath, undefined, {sensitivity: "base"}) === 0);
    }

    public isEmpty(): boolean
    {
        return this.exists() && this.contents().length === 0;
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
        return this.exists() ? this.contents().length : -1;
    }
}
