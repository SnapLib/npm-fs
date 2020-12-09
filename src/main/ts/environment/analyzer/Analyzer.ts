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
    private readonly _originPath: string;

    private readonly _originName: string;

    private readonly _parentPath: string;

    private readonly _parentDirents: ReadonlyArray<Dirent>;

    private readonly _parentDirentNames: ReadonlyArray<string>;

    private readonly _parentFiles: ReadonlyArray<Dirent>;

    private readonly _parentFileNames: ReadonlyArray<string>;

    private readonly _parentDirs: ReadonlyArray<Dirent>;

    private readonly _parentDirNames: ReadonlyArray<string>;

    public get path(): string {return this._originPath;}

    get name(): string {return this._originName;}

    get parentPath(): string {return this._parentPath;}

    get parentDirents(): ReadonlyArray<Dirent> {return this._parentDirents;}

    get parentDirentNames(): ReadonlyArray<string> {return this._parentDirentNames;}

    get parentFiles(): ReadonlyArray<Dirent> {return this._parentFiles;}

    get parentFileNames(): ReadonlyArray<string> {return this._parentFileNames;}

    get parentDirectories(): ReadonlyArray<Dirent> {return this._parentDirs;}

    get parentDirectoryNames(): ReadonlyArray<string> {return this._parentDirNames;}

    public isFile(): boolean
    {
        return lstatSync(this._originPath).isFile();
    }

    public isDirectory(): boolean
    {
        return lstatSync(this._originPath).isDirectory();
    }

    public containsNameIgnoreCase(direntName: string): boolean
    {
        return this._parentDirentNames.some(presentDirentName => direntName.localeCompare(presentDirentName, undefined, {sensitivity: "base"}) === 0);
    }

    public containsFileNameIgnoreCase(fileName: string): boolean
    {
        return this._parentFileNames.some(presentFileName => fileName.localeCompare(presentFileName, undefined, {sensitivity: "base"}) === 0);
    }

    public containsDirNameIgnoreCase(directoryName: string): boolean
    {
        return this._parentDirNames.some(presentDirName => directoryName.localeCompare(presentDirName, undefined, {sensitivity: "base"}) === 0);
    }

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
            this._originPath = originPath;

            this._originName = basename(originPath);

            this._parentPath = dirname(originPath);

            this._parentDirents = readdirSync(this._parentPath, {withFileTypes: true});

            this._parentDirentNames = this._parentDirents.map<string>(dirEnt => dirEnt.name);

            this._parentFiles = readdirSync(this._parentPath, {withFileTypes: true})
                                    .filter(dirEnt => dirEnt.isFile());

            this._parentFileNames = this._parentFiles.map<string>(fileDirent => fileDirent.name);

            this._parentDirs = readdirSync(this._parentPath, {withFileTypes: true})
                                   .filter(dirEnt => dirEnt.isDirectory());

            this._parentDirNames = this._parentDirs.map<string>(dirDirent => dirDirent.name);
        }
    }
}
