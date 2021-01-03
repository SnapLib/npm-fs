import type {Element} from "./Element";
import type {File} from "./File";
import type {Dirent} from "fs";

export interface Directory extends Element
{
    readonly inode: number;

    /**
     * The absolute path of this directory element.
     *
     * @readonly
     * @property
     */
    readonly path: string;

    /**
     * The name of this directory element. This is the the name that is at the
     * tail or endmost part of its path.
     *
     * @readonly
     * @property
     */
    readonly name: string;

    /**
     * The absolute path of the directory this directory element resides in. If
     * this directory element does not have a parent directory (i.e. it resides
     * in the root directory of the operating system) then this property is set
     * to `undefined`.
     *
     * @readonly
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
