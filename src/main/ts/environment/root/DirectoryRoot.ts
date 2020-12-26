import {Directory} from "../../element/Directory";
import {DirContents} from "../DirContents";
import * as fs from "fs";

export class DirectoryRoot extends Directory
{
    private _required: Readonly<DirContents>;

    private _optional: Readonly<DirContents>;

    public constructor(rootPath: string)
    {
        if ( ! fs.existsSync(rootPath))
        {
            throw new Error(`root path does not exist: "${rootPath}"`);
        }
        else if (fs.lstatSync(rootPath).isFile())
        {
            throw new Error(`root path points to file: "${rootPath}"`);
        }
        else if (fs.lstatSync(rootPath).isSymbolicLink())
        {
            throw new Error(`root path is symbolic link: "${rootPath}"`);
        }
        else
        {
            const emptyArray: ReadonlyArray<string> = [];

            super(rootPath);
            this._required = new DirContents(emptyArray,emptyArray);
            this._optional = new DirContents(emptyArray,emptyArray);
        }
    }

    public getRequired(): Readonly<DirContents> {return this._required;}

    public getOptional(): Readonly<DirContents> {return this._optional;}

    public addRequiredDirs(dirNamesArray: ReadonlyArray<string> = [], ...dirNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._required = new DirContents(dirNamesArray.concat(this._required.directories.concat(dirNames)), this._required.files);
        return this;
    }

    public addRequiredFiles(fileNamesArray: ReadonlyArray<string> = [], ...fileNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._required = new DirContents(this._required.directories, fileNamesArray.concat(this._required.files.concat(fileNames)));
        return this;
    }

    public addOptionalDirs(dirNamesArray: ReadonlyArray<string> = [], ...dirNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._optional = new DirContents(dirNamesArray.concat(this._optional.directories.concat(dirNames)), this._optional.files);
        return this;
    }

    public addOptionalFiles(fileNamesArray: ReadonlyArray<string> = [], ...fileNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._optional = new DirContents(this._optional.directories, fileNamesArray.concat(this._optional.files.concat(fileNames)));
        return this;
    }

    public missingRequiredDirs(): ReadonlyArray<string>
    {
        return this._required.directories.filter(requiredDir => ! this.containsDirIgnoreCase(requiredDir));
    }

    public missingRequiredFiles(): ReadonlyArray<string>
    {
        return this._required.files.filter(requiredFile => ! this.containsFileIgnoreCase(requiredFile));
    }

    public missingOptionalDirs(): ReadonlyArray<string>
    {
        return this._optional.directories.filter(_optionalDir => ! this.containsDirIgnoreCase(_optionalDir));
    }

    public missingOptionalFiles(): ReadonlyArray<string>
    {
        return this._optional.files.filter(_optionalFile => ! this.containsFileIgnoreCase(_optionalFile));
    }

    public isMissingRequired(): boolean
    {
        return this.isMissingRequiredDir() || this.isMissingRequiredFile();
    }

    public isMissingRequiredDir(): boolean
    {
        return this.missingRequiredDirs().length !== 0;
    }

    public isMissingRequiredFile(): boolean
    {
        return this.missingRequiredFiles().length !== 0;
    }

    public isMissingOptional(): boolean
    {
        return this.isMissingOptionalDir() || this.isMissingOptionalFile();
    }

    public isMissingOptionalDir(): boolean
    {
        return this.missingOptionalDirs().length !== 0;
    }

    public isMissingOptionalFile(): boolean
    {
        return this.missingOptionalFiles().length !== 0;
    }
}
