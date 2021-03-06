/**
 * Defines the root structure of a directory.
 *
 * @classdesc
 * This class simply accepts two string arrays to define the names of files and
 * directories that should be present in a directory.
 *
 * @internal
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class DirContents
{
    /**
     * The directories that should be present in this directory structure.
     *
     * @readonly
     * @property
     */
    public readonly directories: ReadonlyArray<string>;

    /**
     * The files that should be present in this directory structure
     *
     * @readonly
     * @property
     */
    public readonly files: ReadonlyArray<string>;

    /**
     * The directories and files that should be present in this directory
     * structure.
     *
     * @readonly
     * @property
     */
    public readonly all: ReadonlyArray<string>;

    /**
     * Constructor that takes in a string array of directory names and file
     * names that should be present in this directory structure.
     *
     * @param directories array of directory names that should be present in
     *                    this directory structure
     *
     * @param files array of file names that should be present in this directory
     *              structure
     *
     *  @package
     *  @constructor
     */
    public constructor(directories: ReadonlyArray<string>, files: ReadonlyArray<string>)
    {
        this.directories = directories;
        this.files = files;
        this.all = directories.concat(files);
    }
}

export {DirContents as default};
