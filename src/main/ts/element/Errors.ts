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
 * @classdesc Error thrown if an element status is constructed that indicates
 * an element should be a file and directory element at the same time.
 *
 * @sealed
 * @extends Error
 */
export class ElementStatusConflictError extends Error
{
    /**
     * Constructs `ElementStatusConflictError` with the provided string as its
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
 * @classdesc Error thrown when a non file element contains a path to a file.
 *
 * @sealed
 * @extends Error
 */
export class NonFilePathError extends Error
{
    /**
     * Constructs `NonFilePathError` with the provided string as its error
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
 * @classdesc Error thrown if an element status is constructed with an exists
 * property of `undefined` or `null`.
 *
 * @sealed
 * @extends Error
 */
export class UndefinedElementStatusExistsError extends Error
{
    /**
     * Constructs `UndefinedElementStatusExistsError` with the provided string
     * as its error message.
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
 * @classdesc Error thrown when a non directory element contains a path to a
 *            directory.
 *
 * @sealed
 * @extends Error
 */
export class NonDirectoryPathError extends Error
{
    /**
     * Constructs `NonDirectoryPathError` with the provided string as its
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
