import type {Element} from "./Element";
import type {File} from "./File";
import type {Dirent} from "fs";

export interface Directory extends Element
{
    readonly inode: number;

    /**
     * Returns the directory entries of this directory element.
     *
     * @returns the directory entries of this directory element.
     *
     * @abstract
     * @function
     */
    direntsSync(): ReadonlyArray<Dirent>;

    fileElementsSync(): ReadonlyArray<File>;

    dirElementsSync(): ReadonlyArray<Directory>;

    contentsSync(): ReadonlyArray<Element>;

    fileNamesSync(): ReadonlyArray<string>;

    dirNamesSync(): ReadonlyArray<string>;

    direntNamesSync(): ReadonlyArray<string>;

    filePathsSync(): ReadonlyArray<string>;

    dirPathsSync(): ReadonlyArray<string>;

    direntPathsSync(): ReadonlyArray<string>;

    relativeFilePathsSync(): ReadonlyArray<string>;

    relativeDirPathsSync(): ReadonlyArray<string>;

    relativeDirentPathsSync(): ReadonlyArray<string>;

    containsFileSync(fileName: string, options?: {caseSensitive: boolean, recursive: boolean}): boolean;

    containsDirSync(dirName: string, options?: {caseSensitive: boolean, recursive: boolean}): boolean;

    containsSync(fileOrDirName: string, options?: {caseSensitive: boolean, recursive: boolean}): boolean;
}
