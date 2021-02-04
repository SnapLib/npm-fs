/**
 * @overview
 * The most fundamental elements of an npm file system are the directories and
 * files that make up the system. This interface defines the properties,
 * behavior, and functionality that is common to both file and directory
 * elements.
 *
 * @packageDocumentation
 *
 * @see AbstractElement
 * @see DirElement
 * @see FileElement
 *
 * @author Snap <snap@snaplib.org>
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
     * The type of file system element this element is.
     *
     * @readonly
     * @property
     */
    readonly elementType: ElementType;

    /**
     * The absolute path of this file system element.
     *
     * @readonly
     * @property
     */
    readonly path: string;

    /**
     * The name of this file system element including its extension. This is the
     * name that is at the tail or endmost part of its path.
     *
     * @readonly
     * @property
     */
    readonly name: string;

    /**
     * The absolute path of the directory this file system element resides in.
     * If this element does not have a parent directory (i.e. it resides in the
     * root directory of the operating system) then this property is set to
     * `undefined`.
     *
     * @readonly
     * @property
     */
    readonly parent: string;

    /**
     * Returns the length of this file system element.
     *
     * @remarks If this element is a directory, returns the number of entries
     * this directory contains in its root (non-recursive).
     *
     * @remarks If this element is a file, returns the number of lines this file
     * contains.
     *
     * @returns the length of this file system element
     *
     * @abstract
     * @function
     */
    length(): number;

    /**
     * Returns `true` if this file system element contains no data.
     *
     * @returns `true` if this element exists and contains data
     *
     * @abstract
     * @function
     */
    isEmpty(): boolean;

    /**
     * Returns a string representation of this file system element object.
     * Contains this element's properties formatted in a nice way for debugging
     * purposes.
     *
     * @returns a string representation of this file system element object
     *
     * @abstract
     * @function
     */
    toString(): string;
}

/**
 * Enum to identify file system element types.
 *
 * @readonly
 * @enum string
 */
export enum ElementType
{
    /** Type of file elements*/
    FILE = "FILE",
    /** Type of directory elements*/
    DIRECTORY = "DIRECTORY",
    /** Type of element that's not a file or directory */
    OTHER = "OTHER"
}

export {Element as default};
