import { AbstractElement } from "./AbstractElement";
import * as fs from "fs";
import * as path from "path";

export class Directory extends AbstractElement
{
    public constructor(directoryPath: string, existsStatus: boolean)
    {
        super(directoryPath, {exists: existsStatus, isDirectory: true, isFile: false});
    }

    public contents(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.elementPath);
    }

    public contentPaths(): ReadonlyArray<string>
    {
        return this.contents().map<string>(dirContentName => path.join(this.elementPath, dirContentName));
    }

    public getDirNames(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.elementPath, {withFileTypes: true}).filter(dirEnt => dirEnt.isDirectory()).map<string>(dir => dir.name);
    }

    public getDirPaths(): ReadonlyArray<string>
    {
        return this.getDirNames().map<string>(dirName => path.join(this.elementPath, dirName));
    }

    public getFileNames(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.elementPath, {withFileTypes: true}).filter(dirEnt => dirEnt.isFile()).map<string>(file => file.name);
    }

    public getFilePaths(): ReadonlyArray<string>
    {
        return this.getFileNames().map<string>(fileName => path.join(this.elementPath, fileName));
    }

    public contains(nameOrPath: string): boolean
    {
        return this.contents().includes(nameOrPath)
            || this.contentPaths().includes(nameOrPath);
    }

    public containsIgnoreCase(nameOrPath: string): boolean
    {
        return this.contents().some(contentName => nameOrPath.localeCompare(contentName, undefined, {sensitivity: "base"}) === 0)
            || this.contentPaths().some(contentPath => nameOrPath.localeCompare(contentPath, undefined, {sensitivity: "base"}) === 0);
    }

    public containsFile(fileNameOrPath: string): boolean
    {
        return this.getFileNames().includes(fileNameOrPath)
            || this.getFilePaths().includes(fileNameOrPath);
    }

    public containsFileIgnoreCase(nameOrPath: string): boolean
    {
        return this.getFileNames().some(fileName => nameOrPath.localeCompare(fileName, undefined, {sensitivity: "base"}) === 0)
            || this.getFilePaths().some(filePath => nameOrPath.localeCompare(filePath, undefined, {sensitivity: "base"}) === 0);
    }

    public containsDir(dirNameOrPath: string): boolean
    {
        return this.getDirNames().includes(dirNameOrPath)
            || this.getDirPaths().includes(dirNameOrPath);
    }

    public containsDirIgnoreCase(nameOrPath: string): boolean
    {
        return this.getDirNames().some(dirName => nameOrPath.localeCompare(dirName, undefined, {sensitivity: "base"}) === 0)
            || this.getDirPaths().some(dirPath => nameOrPath.localeCompare(dirPath, undefined, {sensitivity: "base"}) === 0);
    }

    public size(): number
    {
        return this.exists() ? this.contents().length : -1;
    }

    public static ofExisting(dirPath: string): Directory
    {
        return new Directory(dirPath, true);
    }
}
