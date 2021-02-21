import type { TransformObjectReturnType } from "./transformObject";
import { transformObject } from "./transformObject";
import fs from "fs";
import ReadOnlyDict = NodeJS.ReadOnlyDict;

/**
 * Generates an object from a json string that can have transformations applied
 * to the generated JavaScript object.
 *
 * @param jsonString json string to objectify.
 *
 * @param options Options to omit or only include specific keys in the
 *                outputted objectified JSON string object.
 *
 * @param assignProperties An object whose properties get assigned to the
 *                         outputted objectified json object.
 */
export const objectifyJsonString = (jsonString: string, options?: {keysToOmit?: ReadonlyArray<string>, keysToInclude?: ReadonlyArray<string>}, assignProperties?: ReadOnlyDict<unknown>): TransformObjectReturnType<unknown> =>
{
    try
    {
        // New JS object with specified keys omitted, included, or updated
        return transformObject<unknown>(JSON.parse(jsonString), options, assignProperties);
    }
    catch (err)
    {
        throw {
            name: "ObjectTransformationError",
            message: `Error transforming object: ${jsonString}`,
            stack: err.stack
        };
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
 *                file.
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
