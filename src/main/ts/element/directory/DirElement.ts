import type { Element } from "../Element";

export interface DirElement extends Element
{
    fileNamesSync(): ReadonlyArray<string>;

    dirNamesSync(): ReadonlyArray<string>;

    direntNamesSync(): ReadonlyArray<string>;

    filePathsSync(): ReadonlyArray<string>;

    dirPathsSync(): ReadonlyArray<string>;

    direntPathsSync(): ReadonlyArray<string>;

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
