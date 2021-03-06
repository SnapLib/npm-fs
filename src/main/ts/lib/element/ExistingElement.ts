import type Element from "./Element";

export interface ExistingElement extends Element
{
    /**
     * Synchronously returns the inode number of this existing directory
     * element.
     *
     * @returns The inode number of this existing directory element
     */
    inodeSync(): number;

    /**
     * Synchronously removes the directory located at this directory element's
     * path.
     *
     * @returns `true` if nothing exists at this directory element's path after
     *           performing remove operation.
     */
    deleteSync(): boolean;

    copyToSync(dest: string, options?: {overwrite: boolean}): boolean;

    renameSync(newName: string, options?: {overwrite: boolean}): boolean;

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
    sizeSync(): number;
}

export {ExistingElement as default};
