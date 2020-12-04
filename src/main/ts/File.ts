import { Element } from "./Element";
import * as fs from "fs";

export class File extends Element
{
    public constructor(filePath: string, existsStatus: boolean)
    {
        super(filePath, {exists: existsStatus, isDirectory: false, isFile: true});
    }

    contents(): ReadonlyArray<string>
    {
        return [];
    }

    size(): number
    {
        return this.exists() ? fs.statSync(this.elementPath).size : -1;
    }
}
