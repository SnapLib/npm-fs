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
     * The absolute path of this element.
     *
     * @readonly
     * @property
     */
    readonly elementPath: string;

    /**
     * The name of this element. This is the the name that is at the tail
     * or endmost part of its absolute path. The name of this file or directory
     * element.
     *
     * @readonly
     * @property
     */
    readonly elementName: string;

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
    contents(): ReadonlyArray<string>;

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

    isEmpty(): boolean;

    /**
     * Returns the size of this element. If this element does not exist it
     * returns -1.
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
    size(): number;
}
