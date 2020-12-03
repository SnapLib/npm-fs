import { ElementStatus } from "./ElementStatus";
import * as fs from 'fs';
import * as pathModule from 'path';

/**
 * The most fundamental elements of an npm file system are the directories and
 * files that  the system contains. These elements share many common properties
 * such as having a path and name. However, each element type also has unique
 * properties that are implementation specific such as the contents and size.
 * For instance the contents of a directory are different than the contents of
 * a text file.
 *
 * @overview
 */

/**
 * @classdesc Contains the base implementation all file and directory element
 *            objects inherit from.
 *
 * @abstract
 */
export abstract class Element
{
    /**
     * The path of this element.
     *
     * @readonly
     * @property
     */
    public readonly path: string;

    /**
     * The name of this element.
     *
     * @readonly
     * @property
     */
    public readonly name: string;

    /**
     * The path of the parent directory this element resides in.
     *
     * @readonly
     * @property
     */
    public readonly parent: string;

    public constructor(elementPath: string, elementStatus?: ElementStatus)
    {
        if (elementPath.trim().length === 0)
        {
            throw new BlankElementPath("blank element path");
        }

        if (elementStatus)
        {
            // If element is not specified to be pre-existing or specified to not exist but does
            if ( ! elementStatus.exists && fs.existsSync(elementPath))
            {
                throw new PreExistingElementError(elementPath);
            }
            // If element should be pre-existing file or directory
            if (elementStatus.exists)
            {
                // If element should be pre-existing file or directory but doesn't exist
                if (fs.existsSync(elementPath) !== true)
                {
                    throw new ElementDoesNotExistError(elementPath);
                }
                // If pre-existing element should be a directory or not a file but is a file
                else if ((elementStatus.isDirectory ||  elementStatus.isFile === false) && fs.lstatSync(elementPath).isFile())
                {
                    throw new DirectoryWithFilePathError(elementPath);
                }
                // If pre-existing element should be a file or not a directory but is a directory
                else if ((elementStatus.isFile || elementStatus.isDirectory === false) && fs.lstatSync(elementPath).isDirectory())
                {
                    throw new FileWithDirectoryPathError(elementPath);
                }
            }
        }
        // If no element status has been set and element is pre-existing, assume it shouldn't be pre-existing
        else if (fs.existsSync(elementPath))
        {
            throw new PreExistingElementError(elementPath);
        }

        this.path = elementPath;
        this.name = pathModule.basename(elementPath);
        this.parent = pathModule.dirname(elementPath)
    }

    /**
     * Returns the contents of this directory or file element. If this element is a directory, returns a read only array
     * of the names of the directories and files this directory contains. If this element is a file, returns a read only
     * array containing each line of the file.
     *
     * @returns The contents of this directory or file element
     *
     * @throws `MissingMethodImplementationError` if method isn't overridden
     *          and provided an implementation
     *
     * @abstract
     * @function
     */
    public abstract contents(): ReadonlyArray<string>;

    /**
     * Returns `true` if this file or directory element exists.
     *
     * @returns `true` if this file or directory element exists when this method is called
     *
     * @sealed
     * @function
     */
    public exists(): boolean
    {
        return fs.existsSync(this.path);
    }

    /**
     * Returns `true` if this element's path points to a directory.
     *
     * @returns `true` if this element's path points to a directory
     *
     * @sealed
     * @function
     */
    public isDir(): boolean
    {
        return this.exists() && fs.lstatSync(this.path).isDirectory();
    }

    /**
     * Returns `true` if this element's path points to a file
     *
     * @returns `true` if this element's path points to a file
     *
     * @sealed
     * @function
     */
    public isFile(): boolean
    {
        return this.exists() && fs.lstatSync(this.path).isFile();
    }

    /**
     * Returns the size of this element. If it's a directory, returns the number of files and directories this directory
     * element contains. If it's a file, returns the size in bytes of the file.
     *
     * @returns the size of this element
     *
     * @throws `MissingMethodImplementationError` if method isn't overridden
     *         and provided an implementation
     *
     * @abstract
     * @function
     */
    public abstract size(): number;
}


/** @ignore */
class BlankElementPath extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

/** @ignore */
class ElementDoesNotExistError extends Error
{
    constructor(path: string)
    {
        super(`path "${path}" does not exist`);
    }
}

/** @ignore */
class PreExistingElementError extends Error
{
    constructor(path: string)
    {
        super(`path "${path}" already exists`);
    }
}

/** @ignore */
class DirectoryWithFilePathError extends Error
{
    constructor(path: string)
    {
        super(`directory path of "${path}" points to a file`);
    }
}

/** @ignore */
class FileWithDirectoryPathError extends Error
{
    constructor(path: string)
    {
        super(`file path of "${path}" points to a directory`);
    }
}
