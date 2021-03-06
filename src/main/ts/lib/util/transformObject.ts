import ReadOnlyDict = NodeJS.ReadOnlyDict;

/**
 * Generates a new JavaScript object from an existing one transformations
 * applied to it.
 *
 * An array of string arguments can be provided to omit specific keys from or
 * only include specific keys in the generated JavaScript object (if they're
 * present in the provided target JavaScript object).
 *
 * If arguments are provided to both omit and include keys an error gets thrown.
 * Additionally, if an empty array is provided as an argument for either key
 * omission or inclusion, an error gets thrown.
 *
 * An additional JavaScript object argument can be passed that gets merged with
 * the generated JavaScript object output. If any of the keys of the target
 * and merged JavaScript object match, then the property from the newly merged
 * object takes precedence and is used in the generated JavaScript object.
 *
 * There are additional "meta" values that can be retrieved from the function
 * as well such as:
 *
 * - the keys with values that get updated/changed from the target JavaScript
 *   object.
 * - The keys that are present in the target JavaScript object but omitted in
 *   the generated JavaScript object.
 * - The keys that are present in both the target JavaScript object and the
 *   generated JavaScript object.
 * - As well as the keys that are either getting omitted or included in the
 *   newly generated JavaScript object (defined by the argument initially passed
 *   to the function)
 *
 * @example Accessing transformed outputted object and meta data about transformations
 * ```ts
 * const mockObj: any = {val1: 1, val2: true, val3: "third"};
 *
 * console.log(transformObject(mockObj, {keysToOmit: ["val2"]}).to.new);
 * // prints "{val1: 1, val3: "third"}"
 *
 * console.log(transformObject(mockObj, {keysToInclude: ["val2"]}).to.new);
 * // prints "{val2: true}"
 *
 * console.log(transformObject(mockObj, {keysToInclude: ["val2"]}).to.original);
 * // prints "{val1: 1, val2: true, val3: "third"}"
 *
 * console.log(transformObject(mockObj, {keysToOmit: ["val2"]}).get.includedKeys);
 * // prints "['val1', 'val3']"
 *
 * console.log(transformObject(mockObj, {keysToInclude: ["val1", "val3", "foo"]}).get.keysToInclude);
 * // prints "['val1', 'val3', 'foo']"
 *
 * console.log(transformObject(mockObj, {keysToInclude: ["val1", "val3"]}).get.omittedKeys);
 * // prints "['val2']"
 * ```
 *
 * @summary Converts a JavaScript object to a new JavaScript object with
 *          transformations applied.
 *
 * @param obj A JavaScript object
 *
 * @param options Options to omit or only include specific keys in generated
 *                JavaScript object.
 *
 * @param assignProperties JavaScript object whose key-values get written to the
 *                         generated JavaScript object.
 *
 * @returns TransformObjectReturnType Returns the newly generated JavaScript
 *          object from the target JavaScript object with transformations
 *          applied.
 *
 * @author Snap <snap@snaplib.org>
 */
export function transformObject<T>(obj: T, options?: {keysToOmit?: ReadonlyArray<string>, keysToInclude?: ReadonlyArray<string>}, assignProperties?: ReadOnlyDict<unknown>): Readonly<TransformObjectReturnType<T>>
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

    // Create array of keys that are present in the newly created JS object
    // that are also present in the original JS object
    const keysIncludedFromOriginalJSObj: ReadonlyArray<string> =
            Object.keys(obj).filter(key => ! keysOmittedFromOriginalJSObj.includes(key));

    // Create array of keys that are present in the newly created JS object
    // that are also present in the original JS object but have different values
    const keysUpdatedFromOriginalJSObj: ReadonlyArray<string> =
        Object.keys(newJsObj).filter(key => (key in obj) && obj[key] !== newJsObj[key]);

    return {
        to: {
            original: obj,
            new: newJsObj
        },

        get: {
            includedKeys: keysIncludedFromOriginalJSObj,
            keysToInclude: options?.keysToInclude ?? [],
            keysToOmit: options?.keysToOmit ?? [],
            omittedKeys: keysOmittedFromOriginalJSObj,
            updatedKeys: keysUpdatedFromOriginalJSObj.map(updatedKey =>
                                                              Object.assign({key: updatedKey}, {original: obj[updatedKey]}, {new: newJsObj[updatedKey]}))
        }
    };
}

/**
 * A container for the original JavaScript object and the new JavaScript object
 * that gets generated by the {@link transformObject} function
 *
 * @interface
 */
interface ObjectTransform<T>
{
    original: T;
    new: ReadOnlyDict<unknown>;
}

/**
 * A container for meta data about how the target JavaScript object gets
 * transformed in the new JavaScript object.
 *
 * @interface
 */
interface ObjectTransformMeta
{
    includedKeys: ReadonlyArray<string>;
    keysToInclude: ReadonlyArray<string>;
    keysToOmit: ReadonlyArray<string>;
    omittedKeys: ReadonlyArray<string>;
    updatedKeys: ReadonlyArray<{key: string, original: unknown, new: unknown}>;
}

/**
 * The new JavaScript object generated from the target JavaScript object with
 * the transformations applied. Also contains meta information about the type
 * of transformations applied and how the outputted JavaScript object compares
 * to the target JavaScript object.
 */
export type TransformObjectReturnType<T> = {to: ObjectTransform<T>, get: ObjectTransformMeta}

export {transformObject as default};
