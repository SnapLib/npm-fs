import { ElementStatus } from "./ElementStatus";
import { Element } from "./Element";
import * as fs from 'fs';
import * as pathModule from 'path';

export class AbstractElement implements Element
{
    public readonly path: string;
    public readonly name: string;
    public readonly parent: string;

    public constructor(elementPath: string, elementStatus?: ElementStatus)
    {
        if (elementPath.trim().length === 0)
        {
            throw new BlankElementPath("blank element path");
        }

        if (elementStatus)
        {
            // If element is not specified to be pre-existing or specified to not exist but does
            if ( ! elementStatus.exists && fs.existsSync(elementPath))
            {
                throw new PreExistingElementError(elementPath);
            }
            // If element should be pre-existing file or directory
            if (elementStatus.exists)
            {
                // If element should be pre-existing file or directory but doesn't exist
                if (fs.existsSync(elementPath) !== true)
                {
                    throw new ElementDoesNotExistError(elementPath);
                }
                // If pre-existing element should be a directory or not a file but is a file
                else if ((elementStatus.isDirectory ||  elementStatus.isFile === false) && fs.lstatSync(elementPath).isFile())
                {
                    throw new DirectoryWithFilePathError(elementPath);
                }
                // If pre-existing element should be a file or not a directory but is a directory
                else if ((elementStatus.isFile || elementStatus.isDirectory === false) && fs.lstatSync(elementPath).isDirectory())
                {
                    throw new FileWithDirectoryPathError(elementPath);
                }
            }
        }
        // If no element status has been set and element is pre-existing, assume it shouldn't be pre-existing
        else if (fs.existsSync(elementPath))
        {
            throw new PreExistingElementError(elementPath);
        }

        this.path = elementPath;
        this.name = pathModule.basename(elementPath);
        this.parent = pathModule.dirname(elementPath)
    }

    public getContents(): ReadonlyArray<string>
    {
        throw new MissingMethodImplementationError("missing getContents() method implementation");
    }

    public exists(): boolean
    {
        return fs.existsSync(this.path);
    }

    public isDir(): boolean
    {
        return this.exists() && fs.lstatSync(this.path).isDirectory();
    }

    public isFile(): boolean
    {
        return this.exists() && fs.lstatSync(this.path).isFile();
    }

    public size(): number
    {
        throw new MissingMethodImplementationError("missing size() method implementation");
    }

}

class BlankElementPath extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}

class ElementDoesNotExistError extends Error
{
    constructor(path: string)
    {
        super(`path "${path}" does not exist`);
    }
}

class PreExistingElementError extends Error
{
    constructor(path: string)
    {
        super(`path "${path}" already exists`);
    }
}

class DirectoryWithFilePathError extends Error
{
    constructor(path: string)
    {
        super(`directory path of "${path}" points to a file`);
    }
}

class FileWithDirectoryPathError extends Error
{
    constructor(path: string)
    {
        super(`file path of "${path}" points to a directory`);
    }
}

class MissingMethodImplementationError extends Error
{
    constructor(msg: string)
    {
        super(msg);
    }
}
