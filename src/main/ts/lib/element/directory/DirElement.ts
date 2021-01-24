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
     * Returns in a synchronous manner this existing directory element's
     * files filtered and formatted in various ways.
     *
     * @param options Whether to retrieve files recursively or not. If not set
     *                to true, only directory entries contained in the root of
     *                this existing directory element are returned.
     *
     * @returns The directory entries this existing directory element contains
     *          filtered and formatted in various ways.
     *
     * @see dirSync
     * @see direntSync
     */
    fileSync(options?: {recursive: boolean}): ExistingDirents | VirtualDirents;

    /**
     * Returns in a synchronous manner this existing directory element's
     * directories filtered and formatted in various ways.
     *
     * @param options Whether to retrieve directories recursively or not. If not
     *                set to true, only directory entries contained in the root
     *                of this existing directory element are returned.
     *
     * @returns The directory entries this existing directory element contains
     *          filtered and formatted in various ways.
     *
     * @see fileSync
     * @see direntSync
     */
    dirSync(options?: {recursive: boolean}):ExistingDirents | VirtualDirents;

    /**
     * Returns in a synchronous manner this existing directory element's
     * directory entries filtered and formatted in various ways.
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
}

interface Dirents
{
    dirents?: ReturnType<() => ReadonlyArray<Dirent>>,
    names: ReturnType<() => ReadonlyArray<string>>,
    paths: ReturnType<() => ReadonlyArray<string>>,
    count: number;
}

export type ExistingDirents = Required<Dirents>;

export type VirtualDirents = Required<Omit<Dirents, "dirents">>;

export {DirElement as default};
