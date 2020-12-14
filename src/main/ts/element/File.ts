import { AbstractElement } from "./AbstractElement";
import * as fs from "fs";

export class File extends AbstractElement
{
    public readonly fileString: string;
    public readonly lines: ReadonlyArray<string>;
    public readonly length: number;

    public constructor(filePath: string, existsStatus: boolean)
    {
        super(filePath, {exists: existsStatus, isDirectory: false, isFile: true});

        this.fileString = fs.readFileSync(this.elementPath, {encoding: "utf8"});
        this.lines = this.fileString.split("\n");
        this.length = this.exists() ? this.lines.length : -1;
    }

    public contents(): ReadonlyArray<string>
    {
        return this.lines;
    }

    public contains(aString: string): boolean
    {
        return this.fileString.includes(aString);
    }

    public isEmpty(): boolean
    {
        return this.fileString.length === 0;
    }

    public size(): number
    {
        return this.exists() ? fs.statSync(this.elementPath).size : -1;
    }
}
