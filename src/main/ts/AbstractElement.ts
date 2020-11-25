import { Element } from "./Element";
import * as fs from 'fs';
import * as pathModule from 'path';

export class AbstractElement implements Element
{
    readonly path: string;
    readonly name: string;
    readonly parent: string;

    public constructor(path: string, elementStatus?: ElementStatus)
    {
        if (elementStatus)
        {
            if (elementStatus.exists)
            {
                if ( ! fs.existsSync(path))
                {
                    throw new ElementDoesNotExistError(path);
                }
                else if (elementStatus.isDirectory && fs.lstatSync(this.path).isFile())
                {
                    throw new DirectoryWithFilePathError(path);
                }
                else if (elementStatus.isFile && fs.lstatSync(this.path).isDirectory())
                {
                    throw new FileWithDirectoryPathError(path);
                }
            }
            else if (elementStatus.exists === false && fs.existsSync(path))
            {
                throw new PreExistingElementError(path);
            }
        }
        else
        {
            this.path = path;
            this.name = pathModule.basename(path);
            this.parent = path.split(pathModule.delimiter).slice(1)[0]
        }
    }

    public getContents(): ReadonlyArray<string>
    {
        throw new MissingMethodImplementationError("Missing getContents() method implementation");
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
        throw new MissingMethodImplementationError("Missing getSize() method implementation");
    }

}

export class ElementStatus
{
    readonly exists?: boolean;
    readonly isFile?: boolean;
    readonly isDirectory?: boolean;
}

class ElementDoesNotExistError extends Error
{
    public constructor(path: string)
    {
        super(path);
    }
}

class PreExistingElementError extends Error
{
    public constructor(path: string)
    {
        super(path);
    }
}

class DirectoryWithFilePathError extends Error
{
    public constructor(path: string)
    {
        super('Directory path of "' + path + '" points to a file');
    }
}

class FileWithDirectoryPathError extends Error
{
    public constructor(path: string)
    {
        super('File path of "' + path + '" points to a directory');
    }
}

class MissingMethodImplementationError extends Error
{
    public constructor(msg: string)
    {
        super(msg);
    }
}
