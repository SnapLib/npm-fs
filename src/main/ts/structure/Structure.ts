/**
 * Defines the root structure of a directory.
 *
 * @classdesc
 * This class simply accepts two string arrays to define the names of files and
 * directories that should be present in a directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class Structure
{
    public readonly directories: ReadonlyArray<string>;
    public readonly files: ReadonlyArray<string>;

    constructor(directories: ReadonlyArray<string>, files: ReadonlyArray<string>)
    {
        this.directories = directories;
        this.files = files;
    }
}
