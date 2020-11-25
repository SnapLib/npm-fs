import { AbstractElement, ElementStatus } from "./AbstractElement";
import * as fs from 'fs';
import * as pathModule from 'path';

export class Directory extends AbstractElement
{
    constructor(directoryPath: string, directoryStatus?: ElementStatus)
    {
        if (directoryStatus)
        {
            if (directoryStatus.isDirectory === false)
            {
                throw new IllegalDirectoryStatusError("false directory status for directory");
            }
            else if (directoryStatus.isFile)
            {
                throw new IllegalDirectoryStatusError("true file status for directory");
            }
            else
            {
                super(directoryPath, {exists: directoryStatus.exists, isDirectory: directoryStatus.isDirectory ?? true, isFile: directoryStatus.isFile ?? false});
            }
        }
        else
        {
            super(directoryPath, {isDirectory: true, isFile: false});
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
        return this.getContentNames().some(contentName => nameOrPath.localeCompare(contentName, undefined, {sensitivity: 'base'}) === 0)
            || this.getContentPaths().some(contentPath => nameOrPath.localeCompare(contentPath, undefined, {sensitivity: 'base'}) === 0)
    }

    public containsFile(fileNameOrPath: string): boolean
    {
        return this.getFileNames().includes(fileNameOrPath)
            || this.getFilePaths().includes(fileNameOrPath)
    }

    public containsFileIgnoreCase(nameOrPath: string): boolean
    {
        return this.getFileNames().some(fileName => nameOrPath.localeCompare(fileName, undefined, {sensitivity: 'base'}) === 0)
            || this.getFilePaths().some(filePath => nameOrPath.localeCompare(filePath, undefined, {sensitivity: 'base'}) === 0)
    }

    public containsDir(dirNameOrPath: string): boolean
    {
        return this.getDirNames().includes(dirNameOrPath)
            || this.getDirPaths().includes(dirNameOrPath)
    }

    public containsDirIgnoreCase(nameOrPath: string): boolean
    {
        return this.getDirNames().some(dirName => nameOrPath.localeCompare(dirName, undefined, {sensitivity: 'base'}) === 0)
            || this.getDirPaths().some(dirPath => nameOrPath.localeCompare(dirPath, undefined, {sensitivity: 'base'}) === 0)
    }

    public size(): number
    {
        return this.getContentNames().length;
    }
}

class IllegalDirectoryStatusError extends Error
{
    public constructor(msg: string)
    {
        super(msg);
    }
}
