import ExistingFileElement from "./ExistingFileElement";
import { objectifyJsonFile } from "../../util/objectifyJsonFile";
import { normalize, sep } from "path";
import ReadOnlyDict = NodeJS.ReadOnlyDict;

export class JSONFile extends ExistingFileElement
{
    readonly #originalJsonObj: ReadOnlyDict<unknown>;
    readonly #newJsonObj: ReadOnlyDict<unknown>;

    private readonly _jsonObject: ReadOnlyDict<unknown>;

    public constructor(jsonFilePath: string, ...nestedJsonFilePaths: ReadonlyArray<string>)
    {
        super(normalize([jsonFilePath].concat(nestedJsonFilePaths).join(sep)));

        this._jsonObject = ((): ReadOnlyDict<unknown> =>
        {
            try
            {
                return Object.freeze(JSON.parse(this.toString()));
            }
            catch (err)
            {
                throw new Error(`error parsing json file at "${this.path}"`);
            }
        })();
    }

    public getOriginalJsonString = () => {return this.toString();};

    public getOriginalJsonObject = () => {return this.#originalJsonObj;};

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

    public withKeys(keyToInclude: string, ...keysToInclude: ReadonlyArray<string>): ReadOnlyDict<unknown>
    {
        return Object.fromEntries(this.entries().filter(jsonEntry => [keyToInclude].concat(keysToInclude).includes(jsonEntry[0])));
    }

    public withOutKeys(...keysToOmit: ReadonlyArray<string>): ReadOnlyDict<unknown>
    {
        if (keysToOmit.length === 0)
        {
            return this._jsonObject;
        }
        else
        {
            return Object.fromEntries(this.entries().filter(jsonEntry => ! keysToOmit.includes(jsonEntry[0])));
        }
    }
}

export {JSONFile as default};
