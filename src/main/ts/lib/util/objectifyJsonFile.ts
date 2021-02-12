import fs from "fs";
import ReadOnlyDict = NodeJS.ReadOnlyDict;
import path from "path";

export const transform = (obj: ReadOnlyDict<unknown>, options?: {keysToOmit?: ReadonlyArray<string>, keysToInclude?: ReadonlyArray<string>}, assignProperties?: ReadOnlyDict<unknown>): ReadOnlyDict<unknown> =>
{
    // Create new JS object with specified keys omitted or included
    const newJsObj: ReadOnlyDict<unknown> =
        Object.assign(
            Object.fromEntries(Object.entries(obj)
                                     .filter(pkgJsonEntry =>
                                                 // If specified keys to include, only include those keys
                                                 options?.keysToInclude?.includes(pkgJsonEntry[0])
                                                 // If specified keys to exclude, include only keys that don't match those keys
                                                 ?? ! options?.keysToOmit?.includes(pkgJsonEntry[0])
                                                 // If no keys specified to include or exclude, include all keys
                                                 ?? true)),
            assignProperties ?? {});

    // Create array of keys that are not present in the newly created JS object,
    // but are present in the original JS object
    const keysOmittedFromOriginalJSObj: ReadonlyArray<string> =
        Object.keys(obj).filter(key => ! (key in newJsObj));

    const keysIncludedFromOriginalJSObj: ReadonlyArray<string> =
            Object.keys(obj).filter(key => ! keysOmittedFromOriginalJSObj.includes(key));

    const keysUpdatedFromOriginalJSObj: ReadonlyArray<string> =
        Object.keys(newJsObj).filter(key => (key in obj) && obj[key] !== newJsObj[key]);

    // If there is a difference in keys between original and new JS object,
    // print which keys are omitted and which keys are retained to console
    if (keysOmittedFromOriginalJSObj.length !== 0)
    {
        console.log(`omitted keys from original package.json file:\n["${keysOmittedFromOriginalJSObj.join('", "')}"]\n`);
    }

    if (keysIncludedFromOriginalJSObj.length !== 0)
    {
        console.log(`retained keys from original package.json file:\n["${keysIncludedFromOriginalJSObj.join('", "')}"]\n`);
    }

    if (keysUpdatedFromOriginalJSObj.length !== 0)
    {
        const updatedKeysArrayShowingOldNewValues =
            keysUpdatedFromOriginalJSObj.map(updatedKey => `${updatedKey}: "${obj[updatedKey]}" -> "${newJsObj[updatedKey]}"`);

        console.log(`updated key values from original package.json file:\n{${updatedKeysArrayShowingOldNewValues.join(",\n ")}}\n`);
    }

    // New JS object with specified keys omitted, included, or updated
    return newJsObj;
};

export const objectifyJsonString = (jsonString: string, options?: {keysToOmit?: ReadonlyArray<string>, keysToInclude?: ReadonlyArray<string>}, assignProperties?: ReadOnlyDict<unknown>): ReadOnlyDict<unknown> =>
{
    try
    {
        // New JS object with specified keys omitted, included, or updated
        return transform(JSON.parse(jsonString), options, assignProperties);
    }
    catch (err)
    {
        throw new Error(`error parsing package.json at "${jsonString}"`);
    }
};

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
 * @param assignProperties Property key-value entry to assign to newly created
 *                         JS object
 *
 * @throws Error if provided json file path can't be parsed correctly or
 *         invalid omit or include key arguments are passed.
 *
 * @returns [p: string]: any
 */
export const objectifyJsonFile = (pathToJsonFile: string, options?: {keysToOmit?: ReadonlyArray<string>, keysToInclude?: ReadonlyArray<string>}, assignProperties?: ReadOnlyDict<unknown>): ReadOnlyDict<unknown> =>
{
    // Ensure that a package.json exists in the root directory of the npm project
    if ( ! fs.existsSync(pathToJsonFile))
    {
        throw new Error(`"${pathToJsonFile}" doesn't exist`);
    }
    // Ensure that the package.json element is a file
    else if ( ! fs.lstatSync(pathToJsonFile).isFile())
    {
        throw new Error(`"${pathToJsonFile}" is not a file`);
    }
    else
    {
        return objectifyJsonString(fs.readFileSync(pathToJsonFile, {encoding: "utf-8"}), options, assignProperties);
    }
};

export {objectifyJsonFile as default};
