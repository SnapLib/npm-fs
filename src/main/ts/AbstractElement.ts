import * as fs from 'fs';
import * as pathModule from 'path';
import { Element } from "./Element";

export class AbstractElement implements Element
{
    readonly path: string;
    readonly name: string;
    readonly parent: string;

    public constructor(path: string, elementType?: Type)
    {
        if (elementType !== undefined)
        {
            if (elementType === Type.DIRECTORY && fs.lstatSync(this.path).isFile())
            {
                throw new DirectoryWithFilePathError(this.path);
            }
            else if (elementType === Type.FILE && fs.lstatSync(this.path).isDirectory())
            {
                throw new FileWithDirectoryPathError(this.path);
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

export enum Type
{
    DIRECTORY = 1,
    FILE = 2

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
