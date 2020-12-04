import { ElementStatus } from "./ElementStatus";
import * as fs from "fs";
import * as path from "path";

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
     * This element's status info.
     *
     * @defaultValue existing directory
     * @private
     * @readonly
     * @property
     */
    private readonly status: ElementStatus;

    /**
     * The absolute path of this element.
     *
     * @readonly
     * @property
     */
    public readonly elementPath: string;

    /**
     * The name of this element.
     *
     * @readonly
     * @property
     */
    public readonly elementName: string;

    /**
     * The absolute path of the parent directory this element resides in. If
     * this element does not have a parent directory (i.e. it resides in the
     * root directory of the operating system) then this property is set to
     * `undefined`.
     *
     * @readonly
     * @property
     */
    public readonly parent: string;

    protected constructor(elementPath: string, elementStatus?: ElementStatus)
    {
        if (elementPath.trim().length === 0)
        {
            throw new BlankElementPath("blank element elementPath");
        }

        this.elementPath = elementPath === "." ? process.cwd()
                           : elementPath === ".." ? path.dirname(process.cwd())
                           : elementPath;

        if (elementStatus)
        {
            // If element is not specified to be pre-existing or specified to not exist but does
            if ( ! elementStatus.exists && fs.existsSync(this.elementPath))
            {
                throw new PreExistingElementError(this.elementPath);
            }
            // If element should be pre-existing
            if (elementStatus.exists)
            {
                // If element should be pre-existing but is not
                if (fs.existsSync(this.elementPath) !== true)
                {
                    throw new ElementDoesNotExistError(this.elementPath);
                }
                // If pre-existing element should be a directory or not a file,
                // but is a file
                else if ((elementStatus.isDirectory ||  elementStatus.isFile === false) && fs.lstatSync(this.elementPath).isFile())
                {
                    throw new DirectoryWithFilePathError(this.elementPath);
                }
                // If pre-existing element should be a file or not a directory,
                // but is a directory
                else if ((elementStatus.isFile || elementStatus.isDirectory === false) && fs.lstatSync(this.elementPath).isDirectory())
                {
                    throw new FileWithDirectoryPathError(this.elementPath);
                }
            }
        }
        // If no element status has been set and element is pre-existing, assume
        // it shouldn't be pre-existing to avoid overwriting element
        else if (fs.existsSync(this.elementPath))
        {
            throw new PreExistingElementError(this.elementPath);
        }

        // Assign element status default value of existing directory if not
        // explicitly set
        this.status = elementStatus ?? new ElementStatus(true, true, false);

        this.elementName = path.basename(this.elementPath);
        this.parent = path.dirname(this.elementPath);
    }

    /**
     * Returns the contents of this element.
     *
     * @remarks If this element is a directory, returns a read only array of the
     * names of this directory's entries.
     *
     * @remarks If this element is a file, returns a read only array containing
     * each line of the file.
     *
     * @returns The contents of this element
     *
     * @abstract
     * @function
     */
    public abstract contents(): ReadonlyArray<string>;

    /**
     * Returns `true` if this element exists exists when this method is called.
     *
     * @returns `true` if this element exists
     *
     * @sealed
     * @function
     */
    public exists(): boolean
    {
        return fs.existsSync(this.elementPath);
    }

    /**
     * Returns `true` if this element's elementPath points to (or is intended to point
     * to) a directory.
     *
     * @returns `true` if this element's elementPath points to a directory
     *
     * @sealed
     * @function
     */
    public isDir(): boolean
    {
        return this.status.isDirectory;
    }

    /**
     * Returns `true` if this element's elementPath points to (or is intended to point
     * to) a file.
     *
     * @returns `true` if this element's elementPath points to a file
     *
     * @sealed
     * @function
     */
    public isFile(): boolean
    {
        return this.status.isFile;
    }

    /**
     * Returns the size of this element.
     *
     * @remarks If this element is a directory, returns the number of entries
     * this directory contains.
     *
     * @remarks If this element is a file, returns the size (in bytes) of this
     * file.
     *
     * @returns the size of this element
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
    constructor(elementPath: string)
    {
        super(`path "${elementPath}" does not exist`);
    }
}

/** @ignore */
class PreExistingElementError extends Error
{
    constructor(elementPath: string)
    {
        super(`path "${elementPath}" already exists`);
    }
}

/** @ignore */
class DirectoryWithFilePathError extends Error
{
    constructor(elementPath: string)
    {
        super(`directory elementPath of "${elementPath}" points to a file`);
    }
}

/** @ignore */
class FileWithDirectoryPathError extends Error
{
    constructor(elementPath: string)
    {
        super(`file elementPath of "${elementPath}" points to a directory`);
    }
}
