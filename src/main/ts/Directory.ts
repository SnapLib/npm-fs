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

    public getDirPaths(): ReadonlyArray<string>
    {
        return this.getContentPaths().filter(dirContentPath => fs.lstatSync(dirContentPath).isDirectory());
    }

    public getDirNames(): ReadonlyArray<string>
    {
        return this.getDirPaths().map(dirPath => pathModule.basename(dirPath));
    }

    public getFilePaths(): ReadonlyArray<string>
    {
        return this.getContentPaths().filter(dirContentPath => fs.lstatSync(dirContentPath).isFile());
    }

    public getFileNames(): ReadonlyArray<string>
    {
        return this.getFilePaths().map(filePath => pathModule.basename(filePath));
    }

    public contains(nameOrPath: string): boolean
    {
        return this.getContentNames().includes(nameOrPath)
            || this.getContentPaths().includes(nameOrPath)
    }

    public containsIgnoreCase(nameOrPath: string): boolean
    {
        return this.getContentNames().some(contentName => nameOrPath.localeCompare(contentName))
            || this.getContentPaths().some(contentPath => nameOrPath.localeCompare(contentPath))
    }

    public containsFile(fileNameOrPath: string): boolean
    {
        return this.getFileNames().includes(fileNameOrPath)
            || this.getFilePaths().includes(fileNameOrPath)
    }

    public containsFileIgnoreCase(nameOrPath: string): boolean
    {
        return this.getFileNames().some(fileName => nameOrPath.localeCompare(fileName))
            || this.getFilePaths().some(filePath => nameOrPath.localeCompare(filePath))
    }

    public containsDir(dirNameOrPath: string): boolean
    {
        return this.getDirNames().includes(dirNameOrPath)
            || this.getDirPaths().includes(dirNameOrPath)
    }

    public containsDirIgnoreCase(nameOrPath: string): boolean
    {
        return this.getDirNames().some(dirName => nameOrPath.localeCompare(dirName))
            || this.getDirPaths().some(dirPath => nameOrPath.localeCompare(dirPath))
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
