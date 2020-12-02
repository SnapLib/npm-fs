export class ElementStatus
{
    public readonly exists: boolean;
    public readonly isDirectory?: boolean;
    public readonly isFile?: boolean;

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

    public static of(existsStatus: boolean, directoryFileStatus?: Omit<ElementStatus, "exists">): ElementStatus
    {
        if (directoryFileStatus !== undefined && directoryFileStatus !== null)
        {
            return new ElementStatus(existsStatus, directoryFileStatus.isDirectory, directoryFileStatus.isFile)
        }
        else
        {
            return new ElementStatus(existsStatus, undefined, undefined);
        }
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
