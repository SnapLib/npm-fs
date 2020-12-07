/**
 * @overview
 * Errors thrown by the classes of this package.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */

/**
 * @classdesc Error thrown if a new directory or file element is attempted to be
 * created with an empty path or a path that contains only white space.
 *
 * @sealed
 * @extends Error
 */
export class BlankElementPathError extends Error
{
    /**
     * Constructs `BlankElementPathError` with the provided string as its error
     * message.
     *
     * @param msg message printed to console
     *
     * @constructor
     */
    constructor(msg: string)
    {
        super(msg);
    }
}

/**
 * @classdesc Error thrown if a new directory element is attempted to be created
 * with a path that points to a file.
 *
 * @sealed
 * @extends Error
 */
export class DirectoryWithFilePathError extends Error
{
    /**
     * Constructs `DirectoryWithFilePathError` with the provided string as its
     * error message.
     *
     * @param msg message printed to console
     *
     * @constructor
     */
    constructor(msg: string)
    {
        super(msg);
    }
}

/**
 * @classdesc Error thrown if a new directory or file element based on a
 * pre-existing directory or file is attempted to be created with a path that
 * does not point to a directory or a file.
 *
 * @sealed
 * @extends Error
 */
export class ElementDoesNotExistError extends Error
{
    /**
     * Constructs `ElementDoesNotExistError` with the provided string as its
     * error message.
     *
     * @param msg message printed to console
     *
     * @constructor
     */
    constructor(msg: string)
    {
        super(msg);
    }
}

/**
 * @classdesc Error thrown if a new File element is attempted to be created with
 * a path that points to a directory.
 *
 * @sealed
 * @extends Error
 */
export class FileWithDirectoryPathError extends Error
{
    /**
     * Constructs `FileWithDirectoryPathError` with the provided string as its
     * error message.
     *
     * @param msg message printed to console
     *
     * @constructor
     */
    constructor(msg: string)
    {
        super(msg);
    }
}

/**
 * @classdesc Error thrown if a new directory or file element based on a
 * non-preexisting directory or file is attempted to be created with a path that
 * points to a pre-existing directory or a file.
 *
 * @sealed
 * @extends Error
 */
export class PreExistingElementError extends Error
{
    /**
     * Constructs `PreExistingElementError` with the provided string as its
     * error message.
     *
     * @param msg message printed to console
     *
     * @constructor
     */
    constructor(msg: string)
    {
        super(msg);
    }
}
