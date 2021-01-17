import AbstractElement from "../AbstractElement.js";
import DirElement from "./DirElement.js";
import type {ExistingDirents, VirtualDirents} from "./DirElement.js";
import { join } from "path";

export abstract class AbstractDirElement extends AbstractElement implements DirElement
{
    protected constructor(path: string, options: {exists: boolean})
    {
        super(path, {exists: options.exists, type: "directory"});
    }

    public abstract fileSync(): ExistingDirents | VirtualDirents;

    public abstract dirSync(): ExistingDirents | VirtualDirents;

    public abstract direntSync(): ExistingDirents | VirtualDirents;

    public abstract fileNamesSync(): ReadonlyArray<string>;

    public abstract dirNamesSync(): ReadonlyArray<string>;

    public direntNamesSync(): ReadonlyArray<string>
    {
        throw this.fileSync().names.concat(this.dirSync().names);
    }

    public filePathsSync(): ReadonlyArray<string>
    {
        return this.fileSync().names.map(fileName => join(this.path, fileName));
    }

    public dirPathsSync(): ReadonlyArray<string>
    {
        return this.dirSync().names.map(dirName => join(this.path, dirName));
    }

    public direntPathsSync(): ReadonlyArray<string>
    {
        return this.direntSync().names.map(direntName => join(this.path, direntName));
    }

    public containsFileSync(fileName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.fileNamesSync().includes(fileName);
        }
        else
        {
            return this.fileNamesSync().some(npmRootFileName => fileName.localeCompare(npmRootFileName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public containsDirSync(dirName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.dirNamesSync().includes(dirName);
        }
        else
        {
            return this.dirNamesSync().some(npmRootDirName => dirName.localeCompare(npmRootDirName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public containsSync(direntName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.direntNamesSync().includes(direntName);
        }
        else
        {
            return this.direntNamesSync().some(npmRootDirentName => direntName.localeCompare(npmRootDirentName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public length(): number
    {
        return this.direntNamesSync().length;
    }

    public isEmpty(): boolean
    {
        return this.length() === 0;
    }

    public toString(): string
    {
        const formatStringArray = (prefixKey: string, strArray: ReadonlyArray<string>): string =>
        {
            const headTailQuotes = strArray.length !== 0 ? '"' : "";
            return `${prefixKey}: [${headTailQuotes}${strArray.join(`",\n${" ".repeat(prefixKey.length + 5)}"`)}${headTailQuotes}]`;
        };

        const formattedObjStrArray: ReadonlyArray<string> =
            [formatStringArray("files", this.fileNamesSync()),
             formatStringArray("directories", this.dirNamesSync())];

        return `{\n  path: "${this.path}",\n\n  ${formattedObjStrArray.join(",\n\n  ")}\n}`;
    }
}

export {AbstractDirElement as default};
