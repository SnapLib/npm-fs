/**
 * @overview
 * The most fundamental elements of an npm file system are the directories and
 * files that make up the system. These elements share many common properties
 * such as having a path and name. However, each element type also has unique
 * properties that are implementation specific such as the contents and size.
 * For instance the contents of a directory are different than the contents of
 * a text file.
 *
 * @packageDocumentation
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */

/**
 * The root interface all file and directory elements implement.
 *
 * @classdesc
 * This interface defines all the behaviors and properties shared by all file
 * system directory and file elements.
 *
 * @interface
 */
export interface Element
{
    /**
     * The type of element this element is. Indicates whether this element
     * represents a directory or file.
     *
     * @readonly
     * @property
     */
    readonly type: Type;

    /**
     * The absolute path of this element.
     *
     * @readonly
     * @property
     */
    readonly path: string;

    /**
     * The name of this element. This is the the name that is at the tail
     * or endmost part of its path. The name of this file or directory
     * element including its extension.
     *
     * @readonly
     * @property
     */
    readonly name: string;

    /**
     * The absolute path of the directory this element resides in. If this
     * element does not have a parent directory (i.e. it resides in the root
     * directory of the operating system) then this property is set to
     * `undefined`.
     *
     * @readonly
     * @property
     */
    readonly parent: string;

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
     * @abstract
     * @function
     */
    contents(): ReadonlyArray<Element> | string;

    /**
     * Writes this element to the underlying operating system's disk if its path
     * doesn't point to a pre-existing element. Returns `true` if it's
     * successfully written otherwise returns `false`.
     *
     * @remarks The {@link overwrite} method can be used to write this element
     * to disk regardless of whether or not its path points to a pre-existing
     * element.
     *
     * @returns `true` if this element is successfully written to disk.
     *
     * @abstract
     * @function
     */
    create(): boolean;

    /**
     * Writes this element to the underlying operating system's disk regardless
     * of whether its path points to a pre-existing element or not. Returns
     * `true` if it's successfully written otherwise returns `false`.
     *
     * @returns `true` if this element is successfully written to disk.
     *
     * @abstract
     * @function
     */
    overwrite(): boolean;

    /**
     * Returns `true` if this element exists when this method is called.
     *
     * @returns `true` if this element exists
     *
     * @abstract
     * @function
     */
    exists(): boolean;

    /**
     * Returns `true` if this element's path points to (or is intended to point
     * to) a directory.
     *
     * @returns `true` if this element's path points to a directory
     *
     * @abstract
     * @function
     */
    isDir(): boolean;

    /**
     * Returns `true` if this element's path points to (or is intended to point
     * to) a file.
     *
     * @returns `true` if this element's path points to a file
     *
     * @abstract
     * @function
     */
    isFile(): boolean;

    /**
     * Returns `true` if this element exists and contains data.
     *
     * @returns `true` if this element exists and contains data
     */
    isEmpty(): boolean;

    /**
     * Returns the length of this element. If this element does not exist it
     * returns -1.
     *
     * @remarks If this element is a directory, returns the number of entries
     * this directory contains.
     *
     * @remarks If this element is a file, returns the number of lines this file
     * contains.
     *
     * @returns the length of this element
     *
     * @abstract
     * @function
     */
    length(): number;

    /**
     * Returns the size of this element in bytes. If this element does not exist
     * it returns -1.
     *
     * @remarks If this element is a directory, returns the size in bytes of all
     * the elements this directory contains summed together.
     *
     * @remarks If this element is a file, returns the size of this file in
     * bytes.
     *
     * @returns the length of this element
     *
     * @abstract
     * @function
     */
    size(): number;

    /**
     * Returns a string representation of this file system element. If it's a
     * file, returns the contents of the file as utf-8 encoded text. If it's a
     * directory, returns a string displaying the path of the directory as well
     * as the names of the files and directories it contains.
     *
     * @returns a string representation of this file system element
     *
     * @abstract
     * @function
     */
    toString(): string;
}

/**
 * Enum used to indicate what type of file system element an element is.
 *
 * @enum string
 */
export enum Type
{
    DIRECTORY = "directory",
    FILE = "file"
}
