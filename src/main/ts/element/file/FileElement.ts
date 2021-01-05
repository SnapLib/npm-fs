import type Element from "../Element";

export interface FileElement extends Element
{
    lines(): ReadonlyArray<string>;

    /**
     * Returns `true` if this file element contains a substring that matches the
     * provided string argument.
     *
     * @param aString substring to search this file element for
     *
     * @param options option indicating whether to perform a case sensitive
     *                search or not
     *
     * @returns `true` if this file element contains a substring that matches the
     *           provided string argument.
     */
    containsSync(aString: string, options?: {caseSensitive: boolean}): boolean;
}

export {FileElement as default};
