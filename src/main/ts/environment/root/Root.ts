import {DirContents} from "./DirContents";
import * as fs from "fs";
import {Directory} from "../element/Directory";

export class Root extends Directory
{
    /**
     * Files and directories that should be present in all npm project root
     * directories.
     *
     * @remarks
     * If these aren't present, indicates that an npm project root directory is
     * malformed or the root directory isn't a root directory of an npm project.
     *
     * @static
     * @readonly
     */
    public static readonly REQUIRED_NODE: Readonly<DirContents> =
        new DirContents(["node_modules"], ["package.json", "package-lock.json"]);

    /**
     * Files and directories that should be present in all SnapLib based npm
     * projects.
     *
     * @remarks
     * These differ from the {@link REQUIRED_NODE} directories and files in that
     * these are specific to SnapLib based npm projects. If these aren't
     * present, indicates that this npm project is not following SnapLib project
     * specifications.
     *
     * @static
     * @readonly
     */
    public static readonly DEFAULT_REQUIRED: Readonly<DirContents> =
        new DirContents(["src"], [".editorconfig", ".eslintrc.json", "typedoc.json"]);

    /**
     * Default optional root directory file names and directory names.
     *
     * @static
     * @readonly
     */
    public static readonly DEFAULT_OPTIONAL: Readonly<DirContents> =
        new DirContents(["docs", ".git"],
                        [".gitignore", "LICENSE.txt", "README.md"]);

    public constructor(rootPath: string)
    {
        if ( ! fs.existsSync(rootPath))
        {
            throw new Error(`root path does not exist: "${rootPath}"`);
        }
        else if ( ! fs.lstatSync(rootPath).isDirectory())
        {
            throw new Error(`root path points to file: "${rootPath}"`);
        }
        else if (fs.lstatSync(rootPath).isSymbolicLink())
        {
            throw new Error(`root path is symbolic link: "${rootPath}"`);
        }
        else
        {
            super(rootPath);
        }
    }
}
