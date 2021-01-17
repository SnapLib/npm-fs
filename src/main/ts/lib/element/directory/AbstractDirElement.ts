import AbstractElement from "../AbstractElement.js";
import DirElement from "./DirElement.js";
import type {ExistingDirents, VirtualDirents} from "./DirElement.js";

export abstract class AbstractDirElement extends AbstractElement implements DirElement
{
    protected constructor(path: string, options: {exists: boolean})
    {
        super(path, {exists: options.exists, type: "directory"});
    }

    public abstract fileSync(): ExistingDirents | VirtualDirents;

    public abstract dirSync(): ExistingDirents | VirtualDirents;

    public abstract direntSync(): ExistingDirents | VirtualDirents;

    public abstract length(): number;

    public containsFileSync(fileName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.fileSync().names.includes(fileName);
        }
        else
        {
            return this.fileSync().names.some(direntFileName => fileName.localeCompare(direntFileName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public containsDirSync(dirName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.dirSync().names.includes(dirName);
        }
        else
        {
            return this.dirSync().names.some(dirDirentName => dirName.localeCompare(dirDirentName, undefined, {sensitivity: "base"}) === 0);
        }
    }

    public containsSync(direntName: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.direntSync().names.includes(direntName);
        }
        else
        {
            return this.direntSync().names.some(direntName => direntName.localeCompare(direntName, undefined, {sensitivity: "base"}) === 0);
        }
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
            [formatStringArray("files", this.fileSync().names),
             formatStringArray("directories", this.dirSync().names)];

        return `{\n  path: "${this.path}",\n\n  ${formattedObjStrArray.join(",\n\n  ")}\n}`;
    }
}

export {AbstractDirElement as default};
