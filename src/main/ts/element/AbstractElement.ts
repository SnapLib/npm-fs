import { Element, ElementType } from "./Element";
import { existsSync, lstatSync } from "fs";
import { dirname, basename } from "path";

export abstract class AbstractElement implements Element
{
    public readonly elementType: ElementType;

    public readonly path: string;

    public readonly name: string;

    public readonly parent: string;

    protected constructor(path: string, options: {exists?: boolean, type?: "file" | "directory" | ElementType})
    {
        if (path.trim().length === 0)
        {
            throw new Error("blank path argument");
        }
        else if (options.exists === undefined && options.type === undefined)
        {
            throw new Error("element missing both exist and type properties");
        }
        else if (options?.exists && ! existsSync(path))
        {
            throw new Error(`path does not exists: "${path}"`);
        }
        else if (options?.exists && options?.type === ElementType.FILE && lstatSync(path).isDirectory())
        {
            throw new Error(`existing file element path points to a directory: "${path}"`);
        }
        else if (options?.exists && options?.type === ElementType.DIRECTORY && lstatSync(path).isFile())
        {
            throw new Error(`existing directory element path points to a file: "${path}"`);
        }
        else
        {
            this.elementType = options?.type === ElementType.FILE ? ElementType.FILE
                             : options?.type === ElementType.DIRECTORY ? ElementType.DIRECTORY
                             : lstatSync(path).isFile() ? ElementType.FILE
                             : ElementType.DIRECTORY;

            this.path = path;
            this.name = basename(this.path);
            this.parent = dirname(this.path);
        }
    }

    public abstract containsSync(aString: string, options?: { caseSensitive: boolean; }): boolean;

    public abstract length(): number;

    public abstract isEmpty(): boolean;

    public abstract toString(): string;
}
