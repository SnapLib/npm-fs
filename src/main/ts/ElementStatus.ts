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
        else if ((ElementStatus.isDefined(isDirectory) || ElementStatus.isDefined(isFile)) && isDirectory === isFile)
        {
            throw new ElementStatusPropertyConflictError(`directory and file property status of ${isDirectory}`);
        }

        this.exists = exists;

        this.isDirectory = ElementStatus.isDefined(isDirectory) ? isDirectory
                           : ElementStatus.isDefined(isFile) ? ! isFile
                           : true;

        this.isFile = ElementStatus.isDefined(isFile) ? isFile
                      : ElementStatus.isDefined(isDirectory) ? ! isDirectory
                      : false;
    }

    public static of(existsStatus: boolean, directoryFileStatus: Omit<ElementStatus, "exists">): ElementStatus
    {
        return new ElementStatus(existsStatus, directoryFileStatus.isDirectory, directoryFileStatus.isFile);
    }

    private static isDefined(prop: any): boolean
    {
        return prop !== undefined && prop !== null;
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
