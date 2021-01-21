import AbstractDirElement from "./AbstractDirElement.js";
import type { VirtualDirents } from "./DirElement.js";
import fs from "fs";
import path from "path";

export class VirtualDirElement extends AbstractDirElement
{
    readonly #relativeFilePaths: Set<string>;
    readonly #relativeDirPaths: Set<string>;

    public constructor(virtualDirPath:string, ...morePaths: ReadonlyArray<string>)
    {
        super(path.normalize([virtualDirPath].concat(morePaths).join(path.sep)), {exists: false});

        if (fs.existsSync(this.path) && fs.lstatSync(this.path).isDirectory())
        {
            const dirents: ReadonlyArray<fs.Dirent> =
                fs.readdirSync(this.path, {withFileTypes: true});

            this.#relativeFilePaths =
                new Set<string>(dirents.filter(dirent => dirent.isFile())
                                       .map(fileDirent => path.join(this.path, fileDirent.name)));

            this.#relativeDirPaths =
                new Set<string>(dirents.filter(dirent => dirent.isDirectory())
                                       .map(fileDirent => path.join(this.path, fileDirent.name)));
        }
        else
        {
            this.#relativeFilePaths = new Set<string>();
            this.#relativeDirPaths = new Set<string>();
        }
    }

    public fileSync(): VirtualDirents
    {
        const fileRelativePathsArray: ReadonlyArray<string> =
            Array.from(this.#relativeFilePaths);

        return {
            names: fileRelativePathsArray,
            paths: fileRelativePathsArray.map(fileName => path.join(this.path, fileName)),
            count: fileRelativePathsArray.length
        };
    }

    public dirSync(): VirtualDirents
    {
        const relativeDirPathsArray: ReadonlyArray<string> =
            Array.from(this.#relativeDirPaths);

        return {
            names: relativeDirPathsArray,
            paths: relativeDirPathsArray.map(dirName => path.join(this.path, dirName)),
            count: relativeDirPathsArray.length
        };
    }

    public direntSync(): VirtualDirents
    {
        return {
            names: this.fileSync().names.concat(this.dirSync().names),
            paths: this.fileSync().paths.concat(this.dirSync().paths),
            count: this.fileSync().count + this.direntSync().count
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
