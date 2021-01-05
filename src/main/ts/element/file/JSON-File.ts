import ExistingFileElement from "./ExistingFileElement";
import { normalize, sep } from "path";
import ReadOnlyDict = NodeJS.ReadOnlyDict;

export class JSONFile extends ExistingFileElement
{
    private readonly _jsonObject: ReadOnlyDict<unknown>;

    public constructor(jsonFilePath: string, ...nestedJsonFilePaths: ReadonlyArray<string>)
    {
        super(normalize([jsonFilePath].concat(nestedJsonFilePaths).join(sep)));

        this._jsonObject = Object.freeze(JSON.parse(this.toString()));
    }

    public toJSO(): ReadOnlyDict<unknown>
    {
        return this._jsonObject;
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

    public withOutKeys(...keys: ReadonlyArray<string>): ReadOnlyDict<unknown>
    {
        if (keys.length === 0)
        {
            return this._jsonObject;
        }
        else
        {
            return Object.fromEntries(this.entries().filter(jsonEntry => ! keys.includes(jsonEntry[0])));
        }
    }
}

export {JSONFile as default};
