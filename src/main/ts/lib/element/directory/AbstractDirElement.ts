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

    public contains(options?: {ignoreCase?: boolean, recursive?: boolean}):
        Readonly<{ file: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean;
                   directory: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean;
                   dirent: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean }>
    {
        const checkForFileOrDirName = (dirents: ExistingDirents | VirtualDirents,
                                       compareString: string) =>
        {
            // Perform case insensitive search if ignore case is true
            if (options?.ignoreCase === true)
            {
                return dirents.names.some(direntName => compareString.localeCompare(direntName, undefined, {sensitivity: "base"}) === 0)
                       || dirents.paths.some(direntPath => compareString.localeCompare(direntPath, undefined, {sensitivity: "base"}) === 0);
            }
            else
            {
                return dirents.names.includes(compareString)
                       || dirents.paths.includes(compareString);
            }
        };

        return {
            file: (fileNameOrPath: string) =>
                {return checkForFileOrDirName(this.fileSync(), fileNameOrPath);},

            directory: (fileNameOrPath: string) =>
                {return checkForFileOrDirName(this.dirSync(), fileNameOrPath);},

            dirent: (fileNameOrPath: string) =>
                {return checkForFileOrDirName(this.direntSync(), fileNameOrPath);}
        };
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
