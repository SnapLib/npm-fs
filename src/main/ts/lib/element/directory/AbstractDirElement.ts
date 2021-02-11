import AbstractElement from "../AbstractElement";
import DirElement from "./DirElement";
import type {ExistingDirents, VirtualDirents} from "./DirElement";
import {isAbsolute, join} from "path";

export abstract class AbstractDirElement extends AbstractElement implements DirElement
{
    protected constructor(path: string, options: {exists: boolean})
    {
        super(path, {exists: options.exists, type: "directory"});
    }

    public abstract fileSync(options?: {recursive: boolean}): ExistingDirents | VirtualDirents;

    public abstract dirSync(options?: {recursive: boolean}): ExistingDirents | VirtualDirents;

    public abstract direntSync(options?: {recursive: boolean}): ExistingDirents | VirtualDirents;

    public abstract length(): number;

    public contains(options?: {ignoreCase?: boolean, recursive?: boolean}):
        Readonly<{ file: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean;
                   directory: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean;
                   dirent: (fileNameOrPath: string, options?: {ignoreCase: boolean}) => boolean }>
    {
        const checkForFileOrDirName = (dirents: ExistingDirents | VirtualDirents,
                                       fileOrDirSearchString: string) =>
        {
            if (isAbsolute(fileOrDirSearchString) && ! fileOrDirSearchString.startsWith(fileOrDirSearchString))
            {
                return false;
            }
            // Perform case insensitive search if ignore case is true
            else
            {
                const formattedCompareString = isAbsolute(fileOrDirSearchString)
                                               ? fileOrDirSearchString
                                               : join(this.path, fileOrDirSearchString);

                if (options?.ignoreCase === true)
                {

                    return dirents.names.some(direntName => formattedCompareString.localeCompare(direntName, undefined, {sensitivity: "base"}) === 0)
                           || dirents.paths.some(direntPath => formattedCompareString.localeCompare(direntPath, undefined, {sensitivity: "base"}) === 0);
                }
                else
                {
                    return dirents.names.includes(formattedCompareString)
                           || dirents.paths.includes(formattedCompareString);
                }
            }
        };

        return {
            file: (fileNameOrPath: string) =>
                {return checkForFileOrDirName(this.fileSync({recursive: options?.recursive ?? false}), fileNameOrPath);},

            directory: (dirNameOrPath: string) =>
                {return checkForFileOrDirName(this.dirSync({recursive: options?.recursive ?? false}), dirNameOrPath);},

            dirent: (fileOrDirNameOrPath: string) =>
                {return checkForFileOrDirName(this.direntSync({recursive: options?.recursive ?? false}), fileOrDirNameOrPath);}
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
