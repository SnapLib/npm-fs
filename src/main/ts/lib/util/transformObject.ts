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
