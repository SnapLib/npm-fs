import ReadOnlyDict = NodeJS.ReadOnlyDict;

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

interface ObjectTransform<T>
{
    original: T;
    new: ReadOnlyDict<unknown>;
}

interface ObjectTransformMeta
{
    includedKeys: ReadonlyArray<string>;
    keysToInclude: ReadonlyArray<string>;
    keysToOmit: ReadonlyArray<string>;
    omittedKeys: ReadonlyArray<string>;
    updatedKeys: ReadonlyArray<{key: string, original: unknown, new: unknown}>;
}

export type TransformObjectReturnType<T> = {to: ObjectTransform<T>, get: ObjectTransformMeta}
