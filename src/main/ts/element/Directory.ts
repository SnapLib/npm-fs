import type {Element} from "./Element";

interface Directory extends Element
{
    readonly inode: number;

    contentsSync(): ReadonlyArray<Element>;
}
