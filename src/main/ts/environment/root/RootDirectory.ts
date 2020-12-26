import {Directory} from "../../element/Directory";
import { DirContents } from "../structure/DirContents";
import * as fs from "fs";

export class RootDirectory extends Directory
{
    public required: DirContents;

    public optional: DirContents;
    public constructor(rootPath: string)
    {
        if ( ! fs.existsSync(rootPath))
        {
            throw new Error(`root path does not exist: "${rootPath}"`);
        }
        else if ( ! fs.lstatSync(rootPath).isDirectory())
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
            this.required = new DirContents(emptyArray,emptyArray);
            this.optional = new DirContents(emptyArray,emptyArray);
        }
    }

    public addRequiredDirs(...dirNames: ReadonlyArray<string>): RootDirectory
    {
        this.required = new DirContents(this.required.directories.concat(dirNames), this.required.files);
        return this;
    }

    public addRequiredFiles(...fileNames: ReadonlyArray<string>): RootDirectory
    {
        this.required = new DirContents(this.required.directories, this.required.files.concat(fileNames));
        return this;
    }

    public addOptionalDirs(...dirNames: ReadonlyArray<string>): RootDirectory
    {
        this.optional = new DirContents(this.optional.directories.concat(dirNames), this.optional.files);
        return this;
    }

    public addOptionalFiles(...fileNames: ReadonlyArray<string>): RootDirectory
    {
        this.optional = new DirContents(this.optional.directories, this.optional.files.concat(fileNames));
        return this;
    }
}
