import type {Dirent} from "fs";

export interface DirectoryI
{
    /**
     * The absolute path of this directory element.
     *
     * @readonly
     * @abstract
     * @property
     */
    readonly path: string;

    /**
     * The name of this directory element.
     *
     * @readonly
     * @abstract
     * @property
     */
    readonly name: string;

    /**
     * The parent directory of this directory element.
     *
     * @readonly
     * @abstract
     * @property
     */
    readonly parent: string;

    /**
     * Returns the directory entries of this directory element.
     *
     * @returns the directory entries of this directory element.
     *
     * @abstract
     * @function
     */
    dirents(): ReadonlyArray<Dirent>;

    /**
     * Returns the names of the files this directory element contains.
     *
     * @returns the names of the files this directory element contains.
     *
     * @abstract
     * @function
     */
    fileNames(): ReadonlyArray<string>;

    /**
     * Returns the names of the directories this directory element contains.
     *
     * @returns the names of the directories this directory element contains.
     *
     * @abstract
     * @function
     */
    directoryNames(): ReadonlyArray<string>;

    /**
     * Returns the names of the files and directories this directory element
     * contains.
     *
     * @returns the names of the files and directories this directory element
     *          contains.
     *
     * @abstract
     * @function
     */
    contents(): ReadonlyArray<string>;

    /**
     * Returns the absolute paths of the files this directory element contains.
     *
     * @returns the absolute paths of the files this directory element contains.
     *
     * @abstract
     * @function
     */
    fileAbsolutePaths(): ReadonlyArray<string>;

    /**
     * Returns the absolute paths of the directories this directory element
     * contains.
     *
     * @returns the absolute paths of the directories this directory element
     *          contains.
     *
     * @abstract
     * @function
     */
    dirAbsolutePaths(): ReadonlyArray<string>;

    /**
     * Returns the paths of the files relative to the root path of this
     * directory element.
     *
     * @remarks
     * For example, a directory element, `myDirectoryElement` with an absolute
     * path of `/Users/Main/MyDirectory` containing the following file,
     * `myRootFile.txt`, and the directory, `MyNestedDirectory` containing the file
     * `myNestedFile.txt` would have the following paths and structure:
     *
     * @example Absolute paths
     * ```
     * /Users/Main/MyDirectory -> root directory absolute path
     * /Users/Main/MyDirectory/myRootFile.txt -> root file absolute path
     * /Users/Main/MyDirectory/MyNestedDirectory -> nested directory absolute path
     * /Users/Main/MyDirectory/MyNestedDirectory/myNestedFile.txt -> non-root nested file absolute path
     * ```
     *
     * @example Structure tree
     * ```
     * Users
     * └── Main
     *     └── MyDirectory
     *         ├── MyNestedDirectory
     *         │   └── myNestedFile.txt
     *         └── myRootFile.txt
     * ```
     * Calling the function `fileRelativePaths()` on `myDirectoryElement` would
     * result in the following:
     *
     * @example
     * ```
     * console.log(myDirectoryElement.fileRelativePaths())
     * // would print: "myRootFile.txt, MyNestedDirectory/myNestedFile.txt"
     * ```
     *
     * @returns the paths of the files relative to the root path of this
     *          directory element.
     *
     * @abstract
     * @function
     */
    fileRelativePaths(): ReadonlyArray<string>;

    dirRelativePaths(): ReadonlyArray<string>;

    contentAbsolutePaths(): ReadonlyArray<string>;

    contentRelativePaths(): ReadonlyArray<string>;

    containsFile(fileName: string, options: {caseSensitive: boolean} | undefined): boolean;

    containsDir(dirName: string, options: {caseSensitive: boolean} | undefined): boolean;

    contains(fileOrDirName: string, options: {caseSensitive: boolean} | undefined): boolean;
}
