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
        else if (isDirectory !== undefined || isFile !== undefined && isDirectory === isFile)
        {
            throw new ElementStatusPropertyConflictError(`directory and file property status of ${isDirectory}`);
        }

        this.exists = exists;

        this.isDirectory = isDirectory !== undefined ? isDirectory
                           : isFile !== undefined ? ! isFile
                           : true;

        this.isFile = isFile !== undefined ? isFile
                      : isDirectory !== undefined ? ! isDirectory
                      : false;
    }
}

class IllegalElementStatusExistsPropertyError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

class ElementStatusPropertyConflictError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}
