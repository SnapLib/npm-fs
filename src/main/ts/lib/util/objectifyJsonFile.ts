import fs from "fs";
import ReadOnlyDict = NodeJS.ReadOnlyDict;

/**
 * Converts a json file to a frozen JavaScript object. Optionally, values can
 * be provided to omit specific keys from or only include specific keys in the
 * generated JS object (if they're present in the provided json file). If
 * arguments are provided to both omit and include keys an error gets thrown.
 * Additionally, if an empty array is provided as an argument for either key
 * omission or inclusion, an error gets thrown.
 *
 * @summary Converts a json file to a frozen JavaScript object.
 *
 * @param pathToJsonFile A path to a json file
 *
 * @param options Options to tweak the outputted object of the objectified JSON
 *                        file.
 *
 * @param options.keysToOmit Keys to not include in the generated JS object if
 *                           they're present in json file that gets getting
 *                           objectified.
 *
 * @param options.keysToInclude Keys to include from the json file that's
 *                              getting objectified. All other keys are not
 *                              included.
 *
 * @param assignProperty Property key-value entry to assign to newly created JS
 *                       object
 *
 * @throws Error if provided json file path can't be parsed correctly or
 *         invalid omit or include key arguments are passed.
 *
 * @returns [p: string]: any
 */
export const objectifyJsonFile = (pathToJsonFile: string, options?: {keysToOmit: ReadonlyArray<string>, keysToInclude: ReadonlyArray<string>}, assignProperty = new Array<string>()): ReadOnlyDict<unknown> =>
{
    if (options?.keysToOmit && options?.keysToInclude)
    {
        throw new Error("Keys to omit and include simultaneously defined");
    }
    else if (options?.keysToOmit.length === 0)
    {
        throw new Error("Empty omit keys array");
    }
    else if (options?.keysToInclude.length === 0)
    {
        throw new Error("Empty include keys array");
    }

    // Ensure that a package.json exists in the root directory of the npm project
    if ( ! fs.existsSync(pathToJsonFile))
    {
        throw new Error(`"${pathToJsonFile}" doesn't exist`);
    }

    // Ensure that the package.json element is a file
    if ( ! fs.lstatSync(pathToJsonFile).isFile())
    {
        throw new Error(`"${pathToJsonFile}" is not a file`);
    }

    // Store the json file as a string
    const jsonFileString: string =
        fs.readFileSync(pathToJsonFile, {encoding: "utf-8"});

    // Parse json file to JavaScript object
    const originalJsObj: ReadOnlyDict<unknown> = (jsonString =>
    {
        try
        {
            return JSON.parse(jsonString);
        }
        catch (err)
        {
            throw new Error(`error parsing package.json at "${pathToJsonFile}"`);
        }
    })(jsonFileString);

    // Create new JS object with specified keys omitted or included
    // TODO fix `assignProperty` object properties not overriding properties from
    //  original js obj
    const newJsObj: ReadOnlyDict<unknown> =
        Object.assign(
            Object.fromEntries(Object.entries(originalJsObj)
                                     .filter(pkgJsonEntry =>
                                                 // If specified keys to include, only include those keys
                                                 options?.keysToInclude.includes(pkgJsonEntry[0])
                                                 // If specified keys to exclude, include only keys that don't match those keys
                                                 ?? ! options?.keysToOmit.includes(pkgJsonEntry[0])
                                                 // If no keys specified to include or exclude, include all keys
                                                 ?? true)),
            assignProperty);

    // Create array of keys that are not present in the newly created JS object,
    // but are present in the original JS object
    const keysOmittedFromOriginalJSObj: ReadonlyArray<string> =
        Object.keys(originalJsObj).filter(key => ! (key in newJsObj));

    const keysIncludedFromOriginalJSObj: ReadonlyArray<string> =
            Object.keys(originalJsObj).filter(key => ! keysOmittedFromOriginalJSObj.includes(key));

    const keysUpdatedFromOriginalJSObj: ReadonlyArray<string> =
        Object.keys(newJsObj).filter(key => (key in originalJsObj) && originalJsObj[key] !== newJsObj[key]);

    // If there is a difference in keys between original and new JS object,
    // print which keys are omitted and which keys are retained to console
    if (keysOmittedFromOriginalJSObj.length !== 0)
    {
        console.log(`omitting keys from distributable package.json:\n["${keysOmittedFromOriginalJSObj.join('", "')}"]\n`);
    }

    if (keysIncludedFromOriginalJSObj.length !== 0)
    {
        console.log(`keys retained from npm root package.json:\n["${keysIncludedFromOriginalJSObj.join('", "')}"]\n`);
    }

    if (keysUpdatedFromOriginalJSObj.length !== 0)
    {
        const updatedKeysArrayShowingOldNewValues =
            keysUpdatedFromOriginalJSObj.map(updatedKey => `${updatedKey}: "${originalJsObj[updatedKey]}" -> "${newJsObj[updatedKey]}"`);

        console.log(`keys updated from npm root package.json:\n{${updatedKeysArrayShowingOldNewValues.join(",\n ")}}\n`);
    }

    // New JS object with specified keys omitted or included
    return newJsObj;
};

export {objectifyJsonFile as default};
