import { AbstractElement } from "./AbstractElement";
import * as fs from "fs";

export class File extends AbstractElement
{
    public constructor(filePath: string, existsStatus: boolean)
    {
        super(filePath, {exists: existsStatus, isDirectory: false, isFile: true});
    }

    contents(): ReadonlyArray<string>
    {
        return fs.readFileSync(this.elementPath, {encoding: "utf8"}).split("\n");
    }

    size(): number
    {
        return this.exists() ? fs.statSync(this.elementPath).size : -1;
    }
}
