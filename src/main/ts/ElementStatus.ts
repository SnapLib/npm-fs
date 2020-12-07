import { UndefinedElementStatusExistsError, ElementStatusConflictError } from "./Errors";

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
     * @throws {@link UndefinedElementStatusExistsError} if provided exists
     *         argument is `undefined` or `null`
     *
     * @throws {@link ElementStatusConflictError} if provided isDirectory and
     *         isFile `boolean` properties are defined with equal boolean values
     *
     * @constructor
     */
    public constructor(exists: boolean, isDirectory?: boolean, isFile?: boolean)
    {
        if (exists === undefined || exists === null)
        {
            throw new UndefinedElementStatusExistsError(`exists element property can't be ${exists}`);
        }
        else if (((isDirectory !== undefined && isDirectory !== null) || (isFile !== undefined && isFile !== null)) && isDirectory === isFile)
        {
            throw new ElementStatusConflictError(`directory and file property status of ${isDirectory}`);
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
     * @throws {@link UndefinedElementStatusExistsError} if provided exists
     *         argument is `undefined` or `null`
     *
     * @throws {@link ElementStatusConflictError} if provided isDirectory and
     *         isFile `boolean` properties are defined with equal boolean values
     *
     * @returns an `ElementStatus` object constructed with the provided
     *          status properties
     *
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
     * Creates an instance of an `ElementStatus` for a directory element.
     * Requires an argument to indicate whether the directory element this
     * status is for should be pre-existing or not.
     *
     * @param existsStatus `boolean` indicating whether this directory element
     *                     status should be pre-existing or not
     *
     * @returns an instance of an `ElementStatus` appropriate for a file
     */
    public static ofDirectory(existsStatus: boolean): ElementStatus
    {
        return new ElementStatus(existsStatus, true, false);
    }

    /**
     * Static function to instantiate an `ElementStatus` for a directory element
     * that should exist/be pre-existing.
     *
     * @returns an `ElementStatus` for an existing directory
     *
     * @static
     * @function
     * @constructs {@link ElementStatus}
     */
    public static ofExistingDirectory(): ElementStatus
    {
        return new ElementStatus(true, true, false);
    }

    /**
     * Creates an instance of an `ElementStatus` for a file element. Requires an
     * argument to indicate whether the file element this status is for should
     * be pre-existing or not.
     *
     * @param existsStatus `boolean` indicating whether this file element status
     *                     should be pre-existing or not
     *
     * @returns an instance of an `ElementStatus` appropriate for a file
     */
    public static ofFile(existsStatus: boolean): ElementStatus
    {
        return new ElementStatus(existsStatus, false, true);
    }

    /**
     * Static function to instantiate an `ElementStatus` for a file element that
     * should exist/be pre-existing.
     *
     * @returns an `ElementStatus` for an existing file
     *
     * @static
     * @function
     * @constructs {@link ElementStatus}
     */
    public static ofExistingFile(): ElementStatus
    {
        return new ElementStatus(true, false, true);
    }
}
