import { Element } from "./Element";
import * as fs from "fs";
import * as path from "path";

export class Directory extends Element
{
    public constructor(directoryPath: string, existsStatus: boolean)
    {
        super(directoryPath, {exists: existsStatus, isDirectory: true, isFile: false});
    }

    public contents(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.path);
    }

    public getContentNames(): ReadonlyArray<string>
    {
        return fs.readdirSync(this.path);
    }

    public getContentPaths(): ReadonlyArray<string>
    {
        return this.getContentNames().map<string>(dirContentName => path.join(this.path, dirContentName));
    }

    public getDirPaths(): ReadonlyArray<string>
    {
        return this.getContentPaths().filter(dirContentPath => fs.lstatSync(dirContentPath).isDirectory());
    }

    public getDirNames(): ReadonlyArray<string>
    {
        return this.getDirPaths().map<string>(dirPath => path.basename(dirPath));
    }

    public getFilePaths(): ReadonlyArray<string>
    {
        return this.getContentPaths().filter(dirContentPath => fs.lstatSync(dirContentPath).isFile());
    }

    public getFileNames(): ReadonlyArray<string>
    {
        return this.getFilePaths().map(filePath => path.basename(filePath));
    }

    public contains(nameOrPath: string): boolean
    {
        return this.getContentNames().includes(nameOrPath)
            || this.getContentPaths().includes(nameOrPath);
    }

    public containsIgnoreCase(nameOrPath: string): boolean
    {
        return this.getContentNames().some(contentName => nameOrPath.localeCompare(contentName, undefined, {sensitivity: "base"}) === 0)
            || this.getContentPaths().some(contentPath => nameOrPath.localeCompare(contentPath, undefined, {sensitivity: "base"}) === 0);
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
        return this.getContentNames().length;
    }
}
