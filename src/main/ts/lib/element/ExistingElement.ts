import type Element from "./Element.js";

export interface ExistingElement extends Element
{
    inodeSync(): number;

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
