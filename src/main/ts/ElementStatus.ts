/**
 * @overview Contains properties an npm {@link AbstractElement} should posses
 * pertaining to it's status at run time.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */

/**
 * @classdesc Class used to set various properties of {@link AbstractElement}
 *            objects pertaining to their run time status.
 */
export class ElementStatus
{
    /**
     * `boolean` property to indicate whether an element should exist/be a
     * pre-existing element or not.
     *
     * @readonly
     * @property
     */
    public readonly exists: boolean;

    /**
     * `boolean` property to indicate whether this element should be a directory
     * or not.
     *
     * @readonly
     * @property
     */
    public readonly isDirectory?: boolean;

    /**
     * `boolean` property to indicate whether this element should be a file or
     * not.
     *
     * @readonly
     * @property
     */
    public readonly isFile?: boolean;

    /**
     * @param exists `boolean` indicating whether an element's path should be
     *               pointing to a pre-existing directory or file
     *
     * @param isDirectory `boolean` indicating whether an element's path should
     *                    be pointing to a directory
     * @param isFile `boolean` indicating whether an element's path should be
     *               pointing to a file
     *
     * @throws `IllegalElementStatusExistsPropertyError` if provided exists
     *         argument is `undefined` or `null`
     *
     * @throws `ElementStatusPropertyConflictError` if provided isDirectory and
     *         isFile `boolean` properties are equal
     *
     * @constructor
     */
    public constructor(exists: boolean, isDirectory?: boolean, isFile?: boolean)
    {
        if (exists === undefined || exists === null)
        {
            throw new IllegalElementStatusExistsPropertyError(`exists element property can't be ${exists}`);
        }
        else if (((isDirectory !== undefined && isDirectory !== null) || (isFile !== undefined && isFile !== null)) && isDirectory === isFile)
        {
            throw new ElementStatusPropertyConflictError(`directory and file property status of ${isDirectory}`);
        }

        this.exists = exists;

        this.isDirectory = (isDirectory !== undefined && isDirectory !== null) ? isDirectory
                           : (isFile !== undefined && isFile !== null) ? ! isFile
                           : true;

        this.isFile = (isFile !== undefined && isFile !== null) ? isFile
                      : (isDirectory !== undefined && isDirectory !== null) ? ! isDirectory
                      : false;
    }

    /**
     * Static function to instantiate an `ElementStatus` object.
     *
     * @remarks This function can be used in place of the constructor offering a
     * less verbose way to create an `ElementStatus` object.
     *
     * @param existsStatus
     * @param directoryFileStatus
     *
     * @sealed
     * @static
     * @function
     * @constructs {@link ElementStatus}
     */
    public static of(existsStatus: boolean, directoryFileStatus?: Omit<ElementStatus, "exists">): ElementStatus
    {
        if (directoryFileStatus !== undefined && directoryFileStatus !== null)
        {
            return new ElementStatus(existsStatus, directoryFileStatus.isDirectory, directoryFileStatus.isFile);
        }
        else
        {
            return new ElementStatus(existsStatus, undefined, undefined);
        }
    }

    /**
     * Static function to instantiate an `ElementStatus` for a directory element
     * that should exist/be pre-existing.
     *
     * @sealed
     * @static
     * @function
     * @constructs {@link ElementStatus}
     */
    public static ofExistingDirectory(): ElementStatus
    {
        return new ElementStatus(true, true, false);
    }

    /**
     * Static function to instantiate an `ElementStatus` for a file element that
     * should exist/be pre-existing.
     *
     * @sealed
     * @static
     * @function
     * @constructs {@link ElementStatus}
     */
    public static ofExistingFile(): ElementStatus
    {
        return new ElementStatus(true, false, true);
    }
}

/** @ignore */
class IllegalElementStatusExistsPropertyError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

/** @ignore */
class ElementStatusPropertyConflictError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}
