export class BlankElementPathError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

export class DirectoryWithFilePathError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

export class ElementDoesNotExistError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

export class FileWithDirectoryPathError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

export class PreExistingElementError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}
