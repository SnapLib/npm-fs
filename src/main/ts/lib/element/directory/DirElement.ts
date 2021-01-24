import type Element from "../Element.js";
import type {Dirent} from "fs";

/**
 * Interface for objects that represent directory elements.
 *
 * @classdesc
 * A `DirElement` is used to represent directory of a fle system. It can contain
 * files and directories and be read/searched either recursively or not. It's
 * possible to return the files and directories either filtered separately or
 * combined. Certain properties of the files and directories can be returned
 * such as their absolute paths and size.
 *
 * @author Snap <snap@snaplib.org>
 */
export interface DirElement extends Element
{
    /**
     * Synchronously returns this existing directory element's files and
     * formatted in various ways.
     *
     * This function can be used to retrieve and perform operations on all files
     * this directory element contains.
     *
     * @param options Whether to retrieve files recursively or not. If not set
     *                to true, only directory entries contained in the root of
     *                this existing directory element are returned.
     *
     * @returns The directory entries this existing directory element contains
     *          filtered and formatted in various ways
     *
     * @see dirSync
     * @see direntSync
     */
    fileSync(options?: {recursive: boolean}): ExistingDirents | VirtualDirents;

    /**
     * Synchronously returns this existing directory element's directories
     * formatted in various ways.
     *
     * This function can be used to retrieve and perform operations on all
     * directories this directory element contains.
     *
     * @param options Whether to retrieve directories recursively or not. If not
     *                set to true, only directory entries contained in the root
     *                of this existing directory element are returned.
     *
     * @returns The directory entries this existing directory element contains
     *          filtered and formatted in various ways
     *
     * @see fileSync
     * @see direntSync
     */
    dirSync(options?: {recursive: boolean}):ExistingDirents | VirtualDirents;

    /**
     * Synchronously returns this existing directory element's directory entries
     * formatted in various ways.
     *
     * This function can be used to retrieve and perform operations on all files
     * and directories this directory element contains.
     *
     * @param options Whether to retrieve directory entries recursively or not.
     *                If not set to true, only directory entries contained in
     *                the root of this existing directory element are returned.
     *
     * @returns The directory entries this existing directory element contains
     *          filtered and formatted in various ways.
     *
     * @see fileSync
     * @see dirSync
     */
    direntSync(options?: {recursive: boolean}): ExistingDirents | VirtualDirents;

    contains(options?: {ignoreCase?: boolean, recursive?: boolean}): {
            file: (fileNameOrPath: string) => boolean,
            directory: (fileNameOrPath: string) => boolean,
            dirent: (fileNameOrPath: string) => boolean
        }

    /**
     * Returns the number of files and directories this directory element
     * contains. By default, only returns the number of files and directories
     * from the root of this directory element (depth of 0).
     *
     * @returns the number of files and directories this directory element
     *          contains
     *
     * @override
     * @abstract
     * @function
     */
    length(): number;

    /**
     * Returns `true` if this directory element doesn't contain any files or
     * directories.
     *
     * @returns `true` if this directory element doesn't contain any files or
     *          directories
     *
     * @override
     * @abstract
     * @function
     */
    isEmpty(): boolean;

    /**
     * Returns a string representation of this directory element object.
     * Contains this information such as this directory element's path and
     * names of any files/directories located in its root.
     *
     * @returns a string representation of this `Element` object
     *
     * @override
     * @abstract
     * @function
     */
    toString(): string;
}

interface Dirents
{
    dirents?: ReturnType<() => ReadonlyArray<Dirent>>,
    names: ReturnType<() => ReadonlyArray<string>>,
    paths: ReturnType<() => ReadonlyArray<string>>,
    count: number;
}

/**
 * Contains the type of properties the directory entries (dirents) of an
 * existing directory element posses. The dirents of an existing directory
 * element can be returned as absolute path strings, name strings, and as
 * `Dirent` objects. The total number of directory entries can be returned as
 * well.
 */
export type ExistingDirents = Required<Dirents>;

/**
 * Contains the type of properties the directory entries (dirents) of a virtual
 * directory element posses. The dirents of a virtual directory element can be
 * returned as absolute path strings and name strings. The total number of
 * directory entries can be returned as well.
 */
export type VirtualDirents = Required<Omit<Dirents, "dirents">>;

export {DirElement as default};
