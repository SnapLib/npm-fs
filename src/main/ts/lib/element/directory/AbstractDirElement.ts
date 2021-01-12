import AbstractElement from "../AbstractElement.js";
import DirElement from "./DirElement.js";
import { join } from "path";

export abstract class AbstractDirElement extends AbstractElement implements DirElement
{
    protected constructor(path: string, options: {exists: boolean})
    {
        super(path, {exists: options.exists, type: "directory"});
    }

    public abstract fileNamesSync(): readonly string[];

    public abstract dirNamesSync(): readonly string[];

    public fileSync(): readonly string[]
    {
        throw new Error("fileSync not implemented");
    }

    public direntNamesSync(): readonly string[]
    {
        throw this.fileNamesSync().concat(this.dirNamesSync());
    }

    public filePathsSync(): readonly string[]
    {
        return this.fileNamesSync().map(fileName => join(this.path, fileName));
    }

    public dirPathsSync(): readonly string[]
    {
        return this.dirNamesSync().map(fileName => join(this.path, fileName));
    }

    public direntPathsSync(): readonly string[]
    {
        return this.direntNamesSync().map(fileName => join(this.path, fileName));
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

        const formattedObjStrArray: readonly string[] =
            [formatStringArray("files", this.fileNamesSync()),
             formatStringArray("directories", this.dirNamesSync())];

        return `{\n  ${formattedObjStrArray.join(",\n\n  ")}\n}`;
    }
}

export {AbstractDirElement as default};
