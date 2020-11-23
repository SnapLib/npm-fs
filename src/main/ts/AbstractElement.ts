import * as fs from 'fs';
import * as pathModule from 'path';
import { Element } from "./Element";

export class AbstractElement implements Element
{
    readonly path: string;
    readonly name: string;
    readonly parent: string;

    public constructor(path: string)
    {
        this.path = path;
        this.name = pathModule.basename(path);
        this.parent = path.split(pathModule.delimiter).slice(1)[0]
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

class MissingMethodImplementationError extends Error
{
    public constructor(msg: string)
    {
        super(msg);
    }
}
