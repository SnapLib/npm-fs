import {AbstractElement} from "./AbstractElement";
import {Type} from "./Element";
import * as path from "path";
import * as fs from "fs";

/**
 * Root implementation for all file elements.
 *
 * @classdesc
 * The `File` class is used to create a file element object that represents a
 * file in a file system.
 *
 * @remarks
 * Note that there is a discernible difference between a "file element" and a
 * "file". A "file element" is a typescript object and exists purely as a
 * typescript struct. While a "file" is a literal file that exists within an
 * operating system. While a file and file element are closely related and the
 * terms can often be used interchangeably and make sense within the context
 * they're used, they are not the same thing. A file element is how a file can
 * be represented programmatically via typescript.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 *
 * @extends AbstractElement
 */
export class File extends AbstractElement
{
    private readonly _string: string;

    /**
     * The contents of this file element. This file parsed into a string with
     * utf-8 encoding.
     *
     * @override
     * @protected
     * @property
     */
    protected contents: string;

    /**
     * Creates a new instance of a `File` element. A file element only requires
     * a path to write a file to.
     *
     * @param filePath Full path or root of the path of this file element
     *
     * @param nestedFilePaths Nested paths to resolve that point to this file
     *                        element
     *
     * @throws {@link BlankElementPathError} if provided file path argument is
     *         empty or only consists of whitespace
     *
     * @constructor
     */
    public constructor(filePath: string, ...nestedFilePaths: ReadonlyArray<string>)
    {
        super(Type.FILE, path.normalize([filePath].concat(nestedFilePaths).join(path.sep)));

        this._string = fs.existsSync(this.path) ? fs.readFileSync(this.path, {encoding: "utf8"}): "";
        this.contents = this._string;
    }

    /**
     * Writes this file element to the underlying operating system's disk if
     * its path doesn't point to a pre-existing element. Returns `true` if it's
     * successfully written otherwise returns `false`.
     *
     * @remarks The {@link overwrite} method can be used to write this file
     * element to disk regardless of whether or not its path points to a
     * pre-existing element.
     *
     * @returns `true` if this file element is successfully written to disk
     *
     * @override
     * @sealed
     * @function
     */
    public create(): boolean
    {
        if (fs.existsSync(this.path))
        {
            return false;
        }
        else
        {
            fs.writeFileSync(this.path, "");

            return fs.existsSync(this.path);
        }
    }

    /**
     * Writes this file element to the underlying operating system's disk
     * regardless of whether its path points to a pre-existing element or not.
     * Returns `true` if it's successfully written otherwise returns `false`.
     *
     * @returns `true` if this file element is successfully written to disk
     *
     * @override
     * @sealed
     * @function
     */
    public overwrite(): boolean
    {
        fs.rmSync(this.path, {force: true, recursive: true});

        fs.writeFileSync(this.path, "");

        return fs.existsSync(this.path);
    }

    /**
     * Returns an array consisting of each line of the file as text.
     *
     * @returns an array consisting of each line of the file as text
     *
     * @sealed
     * @function
     */
    public lines(): ReadonlyArray<string>
    {
        return this._string.split("\n");
    }

    /**
     *
     * @override
     * @virtual
     * @function
     */
    public getContents(): string
    {
        return this.contents;
    }

    /**
     * @override
     * @sealed
     * @function
     */
    public isEmpty(): boolean
    {
        return this.contents.length === 0;
    }

    /**
     * @override
     * @sealed
     * @function
     */
    public length(): number
    {
        return this.lines().length - 1;
    }

    /**
     * @override
     * @sealed
     * @function
     */
    public size(): number
    {
        return this.exists() ? fs.lstatSync(this.path).size : -1;
    }

    public toString(): string
    {
        return this._string;
    }
}
