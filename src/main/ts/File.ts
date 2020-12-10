import { AbstractElement } from "./AbstractElement";
import * as fs from "fs";

export class File extends AbstractElement
{
    private readonly _fileString: string;
    private readonly _lines: ReadonlyArray<string>

    public constructor(filePath: string, existsStatus: boolean)
    {
        super(filePath, {exists: existsStatus, isDirectory: false, isFile: true});

        this._fileString = fs.readFileSync(this.elementPath, {encoding: "utf8"});
        this._lines = this._fileString.split("\n");
    }

    public contents(): ReadonlyArray<string>
    {
        return this._lines;
    }

    public contains(aString: string): boolean
    {
        return this._fileString.includes(aString);
    }

    public isEmpty(): boolean
    {
        return this._fileString.length === 0;
    }

    get length(): number
    {
        return this.exists() ? this._lines.length : -1;
    }

    public size(): number
    {
        return this.exists() ? fs.statSync(this.elementPath).size : -1;
    }
}
