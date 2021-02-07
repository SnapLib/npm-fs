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

export {ElementType as default};
