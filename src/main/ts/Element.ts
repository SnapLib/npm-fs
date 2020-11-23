export interface Element
{
    readonly path: string;
    readonly name: string;
    readonly parent: string;

    getContents(): ReadonlyArray<string>;

    exists(): boolean;

    isDir(): boolean;

    isFile(): boolean;

    size(): number;
}
