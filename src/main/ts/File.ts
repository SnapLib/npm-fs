import { AbstractElement } from "./AbstractElement";
import * as fs from 'fs';
import * as pathModule from 'path';

export class Directory extends AbstractElement
{
    constructor(directoryPath: string)
    {
        super(directoryPath);

        if (this.isDir())
        {
            throw new FileWithDirectoryPathError(this.path);
        }
    }

    public getContents(): ReadonlyArray<string>
    {
        return super.getContents();
    }

    public size(): number
    {
        return super.size();
    }
}

class FileWithDirectoryPathError extends Error
{
    public constructor(path: string)
    {
        super('File path of "' + path + '" points to a directory');
    }
}
