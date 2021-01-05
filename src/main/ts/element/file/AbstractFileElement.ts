import type { FileElement } from "./FileElement";
import { AbstractElement } from "../AbstractElement";

export abstract class AbstractFileElement extends AbstractElement implements FileElement
{
    protected constructor(path: string, options: {exists: boolean})
    {
        super(path, {exists: options.exists, type: "file"});
    }

    public lines(): readonly string[]
    {
        return this.toString().split("\n");
    }

    public containsSync(aString: string, options?: { caseSensitive: boolean; }): boolean
    {
        if (options?.caseSensitive)
        {
            return this.toString().includes(aString);
        }
        else
        {
            return new RegExp(`^.*${aString}{1}?.*$`, "gi").test(this.toString());
        }
    }

    public length(): number
    {
        return this.lines().length - 1;
    }

    public isEmpty(): boolean
    {
        return this.toString().length === 0;
    }

    public abstract toString(): string;
}
