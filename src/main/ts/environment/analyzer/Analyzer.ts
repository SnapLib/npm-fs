import {basename, dirname} from "path";
import {Dirent, existsSync, lstatSync, readdirSync} from "fs";

export class Analyzer
{
    public readonly origin: PathAnalyzer;
    public readonly parent: PathAnalyzer;

    public constructor(originPath: string)
    {
        this.origin = new PathAnalyzer(originPath);
        this.parent = new PathAnalyzer(dirname(originPath));
    }
}

class PathAnalyzer
{
    public readonly originPath: string;

    public readonly originName: string;

    public readonly parentPath: string;

    public readonly parentDirents: ReadonlyArray<Dirent>;

    public readonly parentDirentNames: ReadonlyArray<string>;

    public readonly parentFiles: ReadonlyArray<Dirent>;

    public readonly parentFileNames: ReadonlyArray<string>;

    public readonly parentDirs: ReadonlyArray<Dirent>;

    public readonly parentDirNames: ReadonlyArray<string>;

    public constructor(originPath: string)
    {
        if (originPath === undefined || originPath === null)
        {
            throw new Error(`${originPath} origin path`);
        }
        else if (originPath.trim().length === 0)
        {
            throw new Error("blank origin path");
        }
        else if (existsSync(originPath) !== true)
        {
            throw new Error("path does not exist: ".concat(originPath));
        }
        else
        {
            this.originPath = originPath;

            this.originName = basename(originPath);

            this.parentPath = dirname(originPath);

            this.parentDirents = readdirSync(this.parentPath, {withFileTypes: true});

            this.parentDirentNames = this.parentDirents.map<string>(dirEnt => dirEnt.name);

            this.parentFiles = readdirSync(this.parentPath, {withFileTypes: true})
                                    .filter(dirEnt => dirEnt.isFile());

            this.parentFileNames = this.parentFiles.map<string>(fileDirent => fileDirent.name);

            this.parentDirs = readdirSync(this.parentPath, {withFileTypes: true})
                                   .filter(dirEnt => dirEnt.isDirectory());

            this.parentDirNames = this.parentDirs.map<string>(dirDirent => dirDirent.name);
        }
    }

    public isFile(): boolean
    {
        return lstatSync(this.originPath).isFile();
    }

    public isDirectory(): boolean
    {
        return lstatSync(this.originPath).isDirectory();
    }

    public containsNameIgnoreCase(direntName: string): boolean
    {
        return this.parentDirentNames.some(presentDirentName => direntName.localeCompare(presentDirentName, undefined, {sensitivity: "base"}) === 0);
    }

    public containsFileNameIgnoreCase(fileName: string): boolean
    {
        return this.parentFileNames.some(presentFileName => fileName.localeCompare(presentFileName, undefined, {sensitivity: "base"}) === 0);
    }

    public containsDirNameIgnoreCase(directoryName: string): boolean
    {
        return this.parentDirNames.some(presentDirName => directoryName.localeCompare(presentDirName, undefined, {sensitivity: "base"}) === 0);
    }
}
