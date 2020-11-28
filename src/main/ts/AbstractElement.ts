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
        if (elementStatus)
        {
            // If element is set to be both directory and a file
            if (elementStatus.isDirectory && elementStatus.isFile)
            {
                throw new ElementStatusConflictError("element directory and file status both set to true");
            }
            // If element is set to not be a directory or a file
            else if (elementStatus.isDirectory === false && elementStatus.isFile === false)
            {
                throw new ElementStatusConflictError("element directory and file status both set to false");
            }
            // If element is not specified to be pre-existing or specified to not exist but does
            else if ( ! elementStatus.exists && fs.existsSync(elementPath))
            {
                throw new PreExistingElementError(elementPath);
            }
            // If element should be pre-existing file or directory
            else if (elementStatus.exists)
            {
                // If element should be pre-existing file or directory but doesn't exist
                if ( ! fs.existsSync(elementPath))
                {
                    throw new ElementDoesNotExistError(elementPath);
                }
                // If pre-existing element should be a directory but is a file
                else if (elementStatus.isDirectory && fs.lstatSync(elementPath).isFile())
                {
                    throw new DirectoryWithFilePathError(elementPath);
                }
                // If pre-existing element should be a file but is a directory
                else if (elementStatus.isFile && fs.lstatSync(elementPath).isDirectory())
                {
                    throw new FileWithDirectoryPathError(elementPath);
                }
            }

            this.path = elementPath;
            this.name = pathModule.basename(elementPath);
            this.parent = pathModule.dirname(elementPath)
        }
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

export class ElementStatus
{
    readonly exists?: boolean;
    readonly isFile?: boolean;
    readonly isDirectory?: boolean;
}

class ElementStatusConflictError extends Error
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
