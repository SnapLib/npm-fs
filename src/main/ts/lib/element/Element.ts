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
    readonly elementType: ElementType;

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
     * Returns `true` if this element exists and contains data.
     *
     * @returns `true` if this element exists and contains data
     */
    isEmpty(): boolean;

    /**
     * Returns a string representation of this Element object. Contains this
     * Element's properties formatted in a nice way for debugging purposes.
     */
    toString(): string;
}

export enum ElementType
{
    FILE = "file",
    DIRECTORY = "directory"
}

export {Element as default};
