/**
 * Error thrown when an element is initialized with an illegal path string.
 *
 * @internal
 * @abstract
 */
abstract class IllegalPathError extends Error
{
    public readonly path?: string;

    /**
    * Constructs an `IllegalPathError` with the optionally passed message string
    * and path string that caused the error this error to be thrown.
    *
    * @param msg the message printed when this error is thrown
    *
    * @param path The path string that triggered this error to be
    *             thrown
     *
     * @protected
    */
    protected constructor(msg?: string, path?: string)
    {
        super(msg);
        this.path = path;
    }

}

/**
 * Error thrown when an element is initialized with a mal formed path.
 *
 * This is only thrown if an element is passed an empty string argument during
 * initialization.
 *
 * If stricter element path formats are enforced and trigger an error to be
 * thrown, the thrown error should extend from this error class.
 *
 * @sealed
 */
export class MalFormedElementPathError extends IllegalPathError
{
    /**
     * @override
     * @public
     * @readonly
     * @property
     */
    public readonly name: string = "MalFormedElementPathError";

    /**
     * @public
     * @readonly
     * @property
     */
    public readonly regexPattern?: RegExp;

    /**
     * Constructs a `MalFormedElementPathError` with the optionally passed
     * message string, mal formed path string, and regex pattern arguments.
     *
     * @param msg the message printed when this error is thrown
     *
     * @param path The path string that triggered this error to be
     *             thrown
     *
     * @param regexPattern The regex pattern (if one was being used) that caused
     *                     this error to be thrown
     */
    public constructor(msg?: string, path?: string, regexPattern?: RegExp)
    {
        super(msg, path);

        this.regexPattern = regexPattern;

        // Maintains proper stack trace for where our error was thrown (only
        // available on V8)
        if (Error.captureStackTrace)
        {
          Error.captureStackTrace(this, MalFormedElementPathError);
        }
    }
}

/**
 * Error thrown indicating that an existing element was passed a path that
 * doesn't exist (point to a pre-existing file or directory).
 */
export class PathDoesNotExistError extends IllegalPathError
{
    /**
     * @override
     * @public
     * @readonly
     * @property
     */
    public readonly name: string = "PathDoesNotExistError";

    /**
     * Constructs a `PathDoesNotExistError` with the optionally passed
     * message string, mal formed path string, and regex pattern arguments.
     *
     * @param msg the message printed when this error is thrown
     *
     * @param path The path string that triggered this error to be
     *             thrown
     */
    public constructor(msg?: string, path?: string)
    {
        super(msg, path);

        // Maintains proper stack trace for where our error was thrown (only
        // available on V8)
        if (Error.captureStackTrace)
        {
          Error.captureStackTrace(this, PathDoesNotExistError);
        }
    }
}

/**
 * Error thrown indicating that an element was passed a path that pointed to
 * the wrong type of file system element.
 *
 * For example, if an existing directory element is initialized with a path that
 * points to an existing file.
 */
export class IllegalPathTypeError extends IllegalPathError
{
    /**
     * @override
     * @public
     * @readonly
     * @property
     */
    public readonly name: string = "IllegalPathTypeError";

    public constructor(msg?: string, path?: string)
    {
        super(msg, path);

        // Maintains proper stack trace for where our error was thrown (only
        // available on V8)
        if (Error.captureStackTrace)
        {
          Error.captureStackTrace(this, IllegalPathTypeError);
        }
    }
}
