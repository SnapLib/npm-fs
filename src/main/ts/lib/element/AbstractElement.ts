import type Element from "./Element.js";
import { ElementType } from "./Element.js";
import { existsSync, lstatSync } from "fs";
import { dirname, basename } from "path";

/**
 * Contains the root constructor implementation used to set the absolute path
 * and properties of this file system element.
 *
 * @classdesc
 * This class makes it possible to define what this element object is going to
 * be represent via it's constructor arguments during instantiation. There are
 * 3 key properties used to define a file system element:
 *
 * 1. An absolute path for this element is required.
 * 2. A property indicating whether this element exists or not (whether it's
 *    virtual or not).
 * 3. What type of element this element is intended to be, a file or directory.
 *
 * @author Snap <snap@snaplib.org>
 *
 * @see AbstractFileElement
 * @see AbstractDirElement
 */
export abstract class AbstractElement implements Element
{
    /** @inheritDoc */
    public readonly elementType: ElementType;

    /** @inheritDoc */
    public readonly path: string;

    /** @inheritDoc */
    public readonly name: string;

    /** @inheritDoc */
    public readonly parent: string;

    /**
     * Constructs a file system element with the provided path and properties.
     *
     * Throws an error if file system element should exist but provided path
     * doesn't point to an existing file or directory or if the type this
     * element is set to isn't the same type as what it's path points to.
     *
     * @param path The absolute path of this file system element.
     * @param options options indicating whether this file system element is
     *                read from disk or virtual and what type of file system
     *                element this element is.
     *
     * @protected
     * @constructor
     */
    protected constructor(path: string, options: {exists?: boolean, type?: "file" | "directory" | ElementType})
    {
        if (path.trim().length === 0)
        {
            throw new Error("blank path argument");
        }
        else if (options.exists === undefined && options.type === undefined)
        {
            throw new Error("element missing both exist and type properties");
        }
        else if (options?.exists && ! existsSync(path))
        {
            throw new Error(`path does not exists: "${path}"`);
        }
        else if (options?.exists
            && options?.type?.localeCompare(ElementType.FILE, undefined, {sensitivity: "base"}) === 0
            && lstatSync(path).isDirectory())
        {
            throw new Error(`existing file element path points to a directory: "${path}"`);
        }
        else if (options?.exists
            && options?.type?.localeCompare(ElementType.DIRECTORY, undefined, {sensitivity: "base"}) === 0
            && lstatSync(path).isFile())
        {
            throw new Error(`existing directory element path points to a file: "${path}"`);
        }
        else
        {
            this.elementType = options?.type === ElementType.FILE ? ElementType.FILE
                             : options?.type === ElementType.DIRECTORY ? ElementType.DIRECTORY
                             : lstatSync(path).isFile() ? ElementType.FILE
                             : ElementType.DIRECTORY;

            this.path = path;
            this.name = basename(this.path);
            this.parent = dirname(this.path);
        }
    }

    /** @inheritDoc */
    public abstract length(): number;

    /** @inheritDoc */
    public abstract isEmpty(): boolean;

    /** @inheritDoc */
    public abstract toString(): string;
}

export {AbstractElement as default};
