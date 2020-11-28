export class ElementStatus
{
    public readonly exists?: boolean;
    public readonly isDirectory?: boolean;
    public readonly isFile?: boolean;

    public constructor(exists: boolean, isDirectory?: boolean, isFile?: boolean)
    {
        if (isDirectory || isFile && isDirectory === isFile)
        {
            throw new ElementStatusPropertyConflictError(`directory and file property status of ${isDirectory}`);
        }

        this.exists = exists;
        this.isDirectory = isDirectory !== undefined ? isDirectory
                           : isFile !== undefined ? ! isFile
                           : true;

        this.isFile = isFile !== undefined ? isDirectory
                      : isDirectory !== undefined ? ! isDirectory
                      : false;
    }
}

class ElementStatusPropertyConflictError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}
