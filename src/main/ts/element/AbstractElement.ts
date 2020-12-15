import * as err from "./Errors";
import type {Element} from "./Element";
import {Type} from "./Element";
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
 * @internal
 * @abstract
 */
export abstract class AbstractElement implements Element
{
    /** @inheritDoc */
    public readonly type: Type;

    /** @inheritDoc */
    public readonly path: string;

    /** @inheritDoc */
    public readonly name: string;

    /** @inheritDoc */
    public readonly parent: string;

    /**
     * Creates an instance of directory or file element.
     *
     * @param elementType The type of element (file or directory) this element
     *                    is
     *
     * @param elementPath The absolute path of this element
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
    protected constructor(elementType: Type, elementPath: string)
    {
        if (elementPath.trim().length === 0)
        {
            throw new err.BlankElementPathError("blank element path");
        }

        this.type = elementType;
        this.path = elementPath;
        this.name = path.basename(this.path);
        this.parent = path.dirname(this.path);
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
        return fs.existsSync(this.path);
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
        return this.type === Type.DIRECTORY;
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
        return this.type === Type.FILE;
    }

    public abstract isEmpty(): boolean;

    /** @inheritDoc */
    public abstract size(): number;
}
