import * as err from "./Errors";
import type {Element} from "./Element";
import {Type} from "./Element";
import * as fs from "fs";
import * as path from "path";

/**
 * @classdesc Contains the base implementation all file and directory elements
 *            inherit from.
 *
 * @abstract
 * @implements Element
 */
export abstract class AbstractElement implements Element
{
    /**
     * The contents of this file system element. If this element is a directory
     * element, returns the entries it contains. If this element is a file
     * element, returns the lines of the file.
     *
     * @abstract
     * @protected
     * @property
     */
    protected abstract contents: AbstractElement[] | string;

    /** @inheritDoc */
    public readonly type: Type;

    /** @inheritDoc */
    public readonly path: string;

    /** @inheritDoc */
    public readonly name: string;

    /** @inheritDoc */
    public readonly parent: string;

    /**
     * Creates an instance of a directory or file element.
     *
     * @param elementType The type of element (file or directory) this element
     *                    is
     *
     * @param elementPath The absolute path of this element
     *
     * @throws {@link BlankElementPathError} if provided element path argument
     *          is blank or empty
     *
     * @protected
     * @constructor
     */
    protected constructor(elementType: Type, elementPath: string)
    {
        if (elementPath.trim().length === 0)
        {
            throw new err.BlankElementPathError("blank element path");
        }
        else if (fs.lstatSync(elementPath).isFile() && elementType !== Type.FILE)
        {
            throw new err.NonFilePathError(
                `Non-File element with path to file: ${elementPath}`);
        }
        else if (fs.lstatSync(elementPath).isDirectory() && elementType !== Type.DIRECTORY)
        {
            throw new err.NonDirectoryPathError(
                `Non-Directory element with path to directory: ${elementPath}`);
        }

        this.type = elementType;
        this.path = elementPath;
        this.name = path.basename(this.path);
        this.parent = path.dirname(this.path);
    }

    /**
     * Returns the contents of this element.
     *
     * @remarks If this element is a directory, returns a read only array of the
     * names of this directory's entries.
     *
     * @remarks If this element is a file, returns a read only array containing
     * each line of this file as text.
     *
     * @returns The contents of this element
     *
     * @sealed
     * @abstract
     * @function
     */
    public abstract getContents(): ReadonlyArray<AbstractElement> | string;

    /** @inheritDoc */
    public abstract create(): boolean;

    /** @inheritDoc */
    public abstract overwrite(): boolean;

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

    /** @inheritDoc */
    public abstract isEmpty(): boolean;

    /** @inheritDoc */
    public abstract length(): number;

    /** @inheritDoc */
    public abstract size(): number;
}
