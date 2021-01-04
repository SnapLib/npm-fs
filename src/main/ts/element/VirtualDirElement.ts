import { AbstractDirElement } from "./AbstractDirElement";
import { normalize, sep } from "path";

export class VirtualDirElement extends AbstractDirElement
{
    private readonly _fileNames: Set<string> = new Set<string>();

    private readonly _dirNames: Set<string> = new Set<string>();

    public constructor(path:string, ...morePaths: ReadonlyArray<string>)
    {
        super(normalize([path].concat(morePaths).join(sep)), {exists: false});
    }

    public fileNamesSync(): readonly string[]
    {
        return Array.from(this._fileNames);
    }
    public dirNamesSync(): readonly string[]
    {
        return Array.from(this._dirNames);
    }

}
