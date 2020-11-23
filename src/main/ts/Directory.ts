import { AbstractElement } from "./AbstractElement";
import * as fs from 'fs';
import * as pathModule from 'path';

export class Directory extends AbstractElement
{
    constructor(directoryPath: string)
    {
        super(directoryPath);

        if (this.isFile())
        {
            throw new DirectoryWithFilePathError(this.path);
        }
    }

    public getContentNames(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.path);
    }

    public getContentPaths(): ReadonlyArray<string>
    {
        return this.getContentNames().map<string>(dirContentName => pathModule.join(this.path, dirContentName));
    }

    public getDirNames(): ReadonlyArray<string>
    {
        return this.getContentPaths().filter(dirContentPath => fs.lstatSync(dirContentPath).isDirectory());
    }

    public getFileNames(): ReadonlyArray<string>
    {
        return this.getContentPaths().filter(dirContentPath => fs.lstatSync(dirContentPath).isFile());
    }

    public size(): number
    {
        return this.getContentNames().length;
    }
}

class DirectoryWithFilePathError extends Error
{
    public constructor(path: string)
    {
        super('Directory path of "' + path + '" points to a file');
    }
}
