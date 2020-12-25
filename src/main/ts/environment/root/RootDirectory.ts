import {Directory} from "../../element/Directory";
import * as fs from "fs";

export class RootDirectory extends Directory
{
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
            super(rootPath);
        }
    }
}
