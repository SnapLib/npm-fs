import type Element from "../Element.js";
import type {Dirent} from "fs";

export interface Dirents
{
        dirents?: ReturnType<() => ReadonlyArray<Dirent>>,
        names: ReturnType<() => ReadonlyArray<string>>,
        paths: ReturnType<() => ReadonlyArray<string>>
}

export type ExistingDirents = Required<Dirents>;

export type VirtualDirents = Required<Omit<Dirents, "dirents">>;

export interface DirElement extends Element
{
    fileSync(): ExistingDirents | VirtualDirents;

    dirSync():ExistingDirents | VirtualDirents;

    direntSync(): ExistingDirents | VirtualDirents;

    contains(): {
            file: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean,
            directory: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean,
            dirent: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean
        }

    containsFileSync(fileName: string, options?: {caseSensitive: boolean}): boolean;

    containsDirSync(dirName: string, options?: {caseSensitive: boolean}): boolean;

    /**
     * Returns `true` if this directory element contains an entry whose name
     * matches the provided string argument.
     *
     * @param fileOrDirName file or directory name to search this directory
     *                      element for
     *
     * @param options option indicating whether to perform a case sensitive
     *                search or not
     *
     * @returns `true` if this directory element contains an entry whose name
     *           matches the provided string
     */
    containsSync(fileOrDirName: string, options?: {caseSensitive: boolean}): boolean;
}

export {DirElement as default};
