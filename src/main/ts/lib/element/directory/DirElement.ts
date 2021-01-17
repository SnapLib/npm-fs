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
}

export {DirElement as default};
