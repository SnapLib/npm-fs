import fs from "fs";
import {join} from "path";

/**
 * Returns the total size (in bytes) of the existing directory the provided
 * string path argument points to. This includes the sum of all the sizes of
 * it's sub directories and files.
 *
 * If the provided path doesn't point to an existing directory system element,
 * an error is thrown.
 *
 * @param directoryPath The path pointing to the directory to return the size
 *                      of.
 *
 * @returns The total size (in bytes) of the directory at the provided path.
 *
 * @throws Error If provided path points to an element that's not a directory.
 */
export const dirSize = (directoryPath: string): number =>
{
    if ( ! fs.existsSync(directoryPath))
    {
        throw new Error(`path doesn't exist: ${directoryPath}`);
    }
    // Parse directory size if provided path points to a directory
    else if (fs.lstatSync(directoryPath).isDirectory())
    {
        const getAllFilePaths = (dirPath: string): ReadonlyArray<string> => {
            return fs.readdirSync(dirPath, {withFileTypes: true})
                     .flatMap(dirent => dirent.isDirectory()
                                                 ? getAllFilePaths(join(dirPath, dirent.name))
                                                 : join(dirPath, dirent.name));};

        return ((dirPath: string): number  =>
            getAllFilePaths(dirPath).map(filePath => fs.lstatSync(filePath).size)
                                    .reduce((fileSize, nextFileSize) => fileSize + nextFileSize))(directoryPath);
    }
    // If provided path doesn't point to a directory throw an error
    else
    {
        throw new Error(`path doesn't point to a directory: ${directoryPath}`);
    }
};
