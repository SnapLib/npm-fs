import {File} from "./File";
import * as path from "path";
import ReadOnlyDict = NodeJS.ReadOnlyDict;

export class JSONFile extends File
{
    private readonly _jsonObject: ReadOnlyDict<unknown>;

    public constructor(jsonFilePath: string, ...nestedJsonFilePaths: ReadonlyArray<string>)
    {
        super(path.normalize([jsonFilePath].concat(nestedJsonFilePaths).join(path.sep)));

        this._jsonObject = JSON.parse(this.toString());
    }

    public entries(): readonly [string, unknown][]
    {
        return Object.entries(this._jsonObject);
    }

    public keys(): ReadonlyArray<string>
    {
        return Object.keys(this._jsonObject);
    }

    public values(): ReadonlyArray<unknown>
    {
        return Object.values(this._jsonObject);
    }

    public containsKey(key: string): boolean
    {
        return key in this._jsonObject;
    }
}
