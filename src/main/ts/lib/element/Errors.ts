/**
 * Error thrown when an element is initialized with a mal formed path.
 *
 * This is only thrown if an element is passed an empty string argument during
 * initialization.
 *
 * If stricter element path formats are enforced and trigger an error to be
 * thrown, the thrown error should extend from this error class.
 */
export class MalFormedElementPathError extends Error
{
    constructor(msg?: string)
    {
        super(msg);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
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
export class PathDoesNotExistError extends Error
{
    constructor(msg?: string)
    {
        super(msg);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace)
        {
          Error.captureStackTrace(this, PathDoesNotExistError);
        }
    }
}
