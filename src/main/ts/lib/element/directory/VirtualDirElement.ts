import AbstractDirElement from "./AbstractDirElement.js";
import type { VirtualDirents } from "./DirElement.js";
import path from "path";

export class VirtualDirElement extends AbstractDirElement
{
    readonly #relativeFilePaths: Set<string> = new Set<string>();
    readonly #relativeDirPaths: Set<string> = new Set<string>();

    public constructor(virtualDirPath:string, ...morePaths: ReadonlyArray<string>)
    {
        super(path.normalize([virtualDirPath].concat(morePaths).join(path.sep)), {exists: false});
    }

    public fileSync(): VirtualDirents
    {
        const fileRelativePathsArray: ReadonlyArray<string> =
            Array.from(this.#relativeFilePaths);

        return {
            names: fileRelativePathsArray,
            paths: fileRelativePathsArray.map(fileName => path.join(this.path, fileName))
        };
    }

    public dirSync(): VirtualDirents
    {
        const relativeDirPathsArray: ReadonlyArray<string> =
            Array.from(this.#relativeDirPaths);

        return {
            names: relativeDirPathsArray,
            paths: relativeDirPathsArray.map(dirName => path.join(this.path, dirName))
        };
    }

    public direntSync(): VirtualDirents
    {
        return {
            names: this.fileSync().names.concat(this.dirSync().names),
            paths: this.fileSync().paths.concat(this.dirSync().paths)
        };
    }

    public length(): number
    {
        return this.direntSync().names.length;
    }

    public toString(): string
    {
        return "VirtualDirElement:\n".concat(super.toString());
    }
}

export {VirtualDirElement as default};
