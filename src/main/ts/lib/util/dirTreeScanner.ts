import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";

/**
 * Used to specify file type being queried for when directory tree is scanned.
 *
 * @interface
 */
interface ScanQueryResults
{
    /**
     * Returns the absolute path of the first directory encountered that
     * contains a file whose name matches the provided string argument. The
     * search can optionally be explicitly made case sensitive or insensitive
     * via the `options caseSensitive` boolean flag parameter.
     *
     * @readonly
     * @abstract
     * @public
     * @function
     *
     * @returns string | null
     */
    readonly file: (fileNameQuery:string, options?: {caseSensitive?: boolean}) => string | null,

    /**
     * Returns the absolute path of the first directory encountered that
     * contains a directory whose name matches the provided string argument. The
     * search can optionally be explicitly made case sensitive or insensitive
     * via the `options caseSensitive` boolean flag parameter.
     *
     * @readonly
     * @abstract
     * @public
     * @function
     *
     * @returns string | null
     */
    readonly directory: (dirNameQuery:string, options?: {caseSensitive?: boolean}) => string | null,

    /**
     * @readonly
     * @abstract
     * @public
     * @function
     *
     * @returns ReadonlyArray<string>
     */
    readonly files: (fileNameQuery:string, options?: {caseSensitive?: boolean}) => ReadonlyArray<string>,

    /**
     * @readonly
     * @abstract
     * @public
     * @function
     *
     * @returns ReadonlyArray<string>
     */
    readonly directories: (dirNameQuery:string, options?: {caseSensitive?: boolean}) => ReadonlyArray<string>
}

/**
 * Scans a directory tree for a specific file and/or directory starting with the
 * provided directory at the provided path.
 *
 * Begin directory tree scan starting with the provided directory path string
 * argument.
 *
 * The returned `file(string)` and `directory(string)` functions can then be
 * used to query the directory tree for a specific file or directory. These
 * functions return the absolute path to the first directory encountered that
 * contains the file or directory being queried for.
 *
 * The returned `files(string)` and `directories(string)` functions behave very
 * similarly to their singular counterparts. However, they're guaranteed to
 * always walk the entire directory tree to the root regardless of whether the
 * file or directory being queried for is found. And instead, an array of paths
 * pointing to all directories in the walked directory tree containing the
 * queried for file/directory gets returned. If no queries are found then an
 * empty array is returned.
 *
 * @param dirPath Path to directory to begin scanning for file or directory
 *
 * @returns ScanQueryResults An object for querying file or directory names.
 *
 * @throws Error If provided path string argument doesn't point to an existing
 *               non-symlinked directory
 *
 * @sealed
 * @function
 */
export const scanDirTree = (dirPath: string): Readonly<{for: Readonly<ScanQueryResults>}> =>
{
    if (dirPath.length === 0)
    {
        throw new Error("empty directory path argument");
    }
    // If path isn't absolute
    else if ( ! path.isAbsolute(dirPath))
    {
        throw new Error("non-absolute path provided:"
                            + (typeof dirPath === "string" ? `"${dirPath}"` : dirPath));
    }
    // If path doesn't exist, throw error
    else if ( ! fs.existsSync(dirPath))
    {
        throw new Error("path does not exist:\n"
                            + (typeof dirPath === "string" ? `"${dirPath}"` : dirPath));
    }
    // If path is a symlink
    else if (fs.lstatSync(dirPath).isSymbolicLink())
    {
        throw new Error(`path points to a symlinked directory:\n"${dirPath}"`);
    }
    else if (fs.lstatSync(dirPath).isDirectory() !== true)
    {
        throw new Error(`path does not point to a directory:\n"${dirPath}"`);
    }
    // If path points to a valid existing directory, begin scanning for
    // `package.json` files
    else
    {
        const direntEqualsQueryName = (dirent: fs.Dirent, fileOrDirNameQuery: string, isCaseSensitive?: boolean): boolean =>
        {
            return fileOrDirNameQuery.localeCompare(
                dirent.name,
                undefined,
                {sensitivity: (isCaseSensitive !== false ? "variant" : "base")}) === 0;
        };

        const direntEqualsQueryDirentType = (dirent: fs.Dirent, direntType: {file: boolean, directory: boolean}): boolean =>
        {
            if (dirent.isFile() && (direntType.file === true || direntType.directory === false))
            {
                return true;
            }
            else if (dirent.isDirectory() && (direntType.directory === true || direntType.file === false))
            {
                return true;
            }
            else
            {
                return false;
            }
        };

        const direntEqualsQuery = (dirent: fs.Dirent, fileOrDirNameQuery: string, options: {file: boolean, directory: boolean, isCaseSensitive?: boolean}): boolean =>
        {
            return direntEqualsQueryName(dirent, fileOrDirNameQuery, options.isCaseSensitive) && direntEqualsQueryDirentType(dirent, {file: options.file, directory: options.directory});
        };

        const dirPathTreeQueryResults = (dirPathArg: string, fileOrDirNameQuery: string, options: {file: boolean, directory: boolean, isCaseSensitive?: boolean}): string | null =>
        {
            if (fs.readdirSync(dirPathArg, {withFileTypes: true}).some(dirent => direntEqualsQuery(dirent, fileOrDirNameQuery, {file: options.file, directory: options.directory, isCaseSensitive: options?.isCaseSensitive})))
            {
                return dirPathArg;
            }
            // If provided path is root directory and doesn't contain `package.json`
            // file, return `null`
            else if (path.basename(dirPathArg).length === 0)
            {
                return null;
            }
            else
            {
                let parentDirectory = path.dirname(dirPathArg);

                do
                {
                    if (fs.readdirSync(parentDirectory, {withFileTypes: true}).some(dirent => direntEqualsQuery(dirent, fileOrDirNameQuery, {file: options.file, directory: options.directory, isCaseSensitive: options?.isCaseSensitive})))
                    {
                        return parentDirectory;
                    }
                    else
                    {
                        parentDirectory = path.dirname(parentDirectory);
                    }
                }
                while (path.basename(parentDirectory).length !== 0);

                return null;
            }
        };

        return {
            for:
                {
                    file: (fileNameQuery:string, options?: {caseSensitive?: boolean}): string | null =>
                    {
                        return dirPathTreeQueryResults(dirPath, fileNameQuery, {file: true, directory: false, isCaseSensitive: options?.caseSensitive});
                    },
                    directory: (dirNameQuery:string, options?: {caseSensitive?: boolean}): string | null =>
                    {
                        return dirPathTreeQueryResults(dirPath, dirNameQuery, {file: false, directory: true, isCaseSensitive: options?.caseSensitive});
                    },
                    files: (fileNameQuery:string, options?: {caseSensitive?: boolean}): ReadonlyArray<string> =>
                    {
                        return [];
                    },
                    directories: (dirNameQuery:string, options?: {caseSensitive?: boolean}): ReadonlyArray<string> =>
                    {
                        return [];
                    }
                }
        };
    }
};

/**
 * Scans a directory tree for a specific file and/or directory starting with the
 * provided directory at the provided url.
 *
 * Begin directory tree scan starting with the provided directory url string
 * argument.
 *
 * The returned `file(string)` and `directory(string)` functions can then be
 * used to query the directory tree for a specific file or directory. These
 * functions return the absolute path to the first directory encountered that
 * contains the file or directory being queried for.
 *
 * The returned `files(string)` and `directories(string)` functions behave very
 * similarly to their singular counterparts. However, they're guaranteed to
 * always walk the entire directory tree to the root regardless of whether the
 * file or directory being queried for is found. And instead, an array of paths
 * pointing to all directories in the walked directory tree containing the
 * queried for file/directory gets returned. If no queries are found then an
 * empty array is returned.
 *
 * @remarks
 * Identical to {@link #scanDirTree}, except the url gets converted to a path.
 *
 * @param urlString Path to directory to begin scanning for file or directory
 *
 * @returns ScanQueryResults An object for querying file or directory names.
 *
 * @throws Error If provided url string argument doesn't point to an existing
 *               non-symlinked directory
 *
 * @sealed
 * @function
 */
export const scanDirTreeUrl = (urlString: string): Readonly<{for: ScanQueryResults}> =>
{
    return scanDirTree(path.dirname(fileURLToPath(urlString)));
};

export {scanDirTree as default};
