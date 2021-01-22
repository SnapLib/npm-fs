import type Element from "../Element.js";
import type {Dirent} from "fs";

export interface DirElement extends Element
{
    fileSync(): ExistingDirents | VirtualDirents;

    dirSync():ExistingDirents | VirtualDirents;

    direntSync(): ExistingDirents | VirtualDirents;

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
