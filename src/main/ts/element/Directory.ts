import type {Element} from "./Element";

interface Directory extends Element
{
    readonly inode: number;

    contents(): ReadonlyArray<Element>;
}
