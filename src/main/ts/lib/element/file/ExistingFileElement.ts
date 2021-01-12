import AbstractFileElement from "./AbstractFileElement.js";
import { normalize, sep } from "path";
import fs from "fs";
import ExistingElement from "../ExistingElement";

export class ExistingFileElement extends AbstractFileElement implements ExistingElement
{
    public constructor(path: string, ...morePaths: readonly string[])
    {
        super(normalize([path].concat(morePaths).join(sep)), {exists: true});
    }

    public inodeSync(): number
    {
        return fs.lstatSync(this.path).ino;
    }

    public deleteSync(): boolean
    {
        fs.rmSync(this.path);
        return ! fs.existsSync(this.path);
    }

    public copyToSync(dest: string, options?: { overwrite: boolean; }): boolean
    {
        if ( ! options?.overwrite && fs.existsSync(dest))
        {
            return false;
        }
        else
        {
            fs.copyFileSync(this.path, dest);
            return fs.existsSync(dest);
        }
    }

    public renameSync(newName: string, options?: { overwrite: boolean; }): boolean
    {
        if ( ! options?.overwrite && fs.existsSync(newName))
        {
            return false;
        }
        else
        {
            fs.renameSync(this.path, newName);
            return fs.existsSync(newName);
        }
    }

    public sizeSync(): number
    {
        return fs.lstatSync(this.path).size;
    }

    public toString(): string
    {
        return fs.readFileSync(this.path, {encoding: "utf-8"});
    }
}

export {ExistingFileElement as default};
