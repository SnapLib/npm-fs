import { Element } from "./Element";
import { ElementStatus } from "./ElementStatus";
import * as fs from "fs";
import * as path from "path";

/**
 * @overview
 * The most fundamental elements of an npm file system are the directories and
 * files that  the system contains. These elements share many common properties
 * such as having a path and name. However, each element type also has unique
 * properties that are implementation specific such as the contents and size.
 * For instance the contents of a directory are different than the contents of
 * a text file.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 *
 */

/**
 * @classdesc Contains the base implementation all file and directory elements
 *            inherit from.
 *
 * @abstract
 */
export abstract class AbstractElement implements Element
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

    /** @inheritDoc */
    public readonly elementPath: string;

    /** @inheritDoc */
    public readonly elementName: string;

    /** @inheritDoc */
    public readonly parent: string;

    /**
     * Creates an instance of directory or file element.
     *
     * @param elementPath The absolute path of this element
     * @param elementStatus The status of this element
     *
     * @throws `BlankElementPathError` if provided element path argument is
     *          blank or empty
     *
     * @throws `ElementDoesNotExistError` if provided element status `exists`
     *         property is `true` or no element status properties are provided
     *         and provided path argument doesn't point to a pre-existing file
     *         or directory
     *
     * @throws `PreExistingElementError` if provided element status `exists`
     *         property is `false` and provided path argument points to a
     *         pre-existing file or directory
     *
     * @throws `DirectoryWithFilePathError` if provided path argument points to
     *         file and no element status properties are provided or element
     *         status `directory` status is `true` or `file` status is `false`
     *
     * @throws `FileWithDirectoryPathError` if provided path argument points to
     *         directory and element status `directory` property is `true` or
     *         `file` property is `false`
     *
     * @protected
     */
    protected constructor(elementPath: string, elementStatus?: ElementStatus)
    {
        if (elementPath.trim().length === 0)
        {
            throw new BlankElementPathError("blank element path");
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

    /** @inheritDoc */
    public abstract contents(): ReadonlyArray<string>;

    /**
     * Returns `true` if this element exists when this method is called.
     *
     * @returns `true` if this element exists
     *
     * @override
     * @sealed
     * @function
     */
    public exists(): boolean
    {
        return fs.existsSync(this.elementPath);
    }

    /**
     * Returns `true` if this element's path points to (or is intended to point
     * to) a directory.
     *
     * @returns `true` if this element's path points to a directory
     *
     * @override
     * @sealed
     * @function
     */
    public isDir(): boolean
    {
        return this.status.isDirectory ?? false;
    }

    /**
     * Returns `true` if this element's path points to (or is intended to point
     * to) a file.
     *
     * @returns `true` if this element's path points to a file
     *
     * @override
     * @sealed
     * @function
     */
    public isFile(): boolean
    {
        return this.status.isFile ?? false;
    }

    /** @inheritDoc */
    public abstract size(): number;
}

/** @ignore */
class BlankElementPathError extends Error
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