import {DirContents} from "./DirContents";

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project root directory.
 *
 * @classdesc
 * This class is essentially an enum/singleton that contains string arrays of
 * the file and directory names that should be (or can be) present in the root
 * directory of SnapLib based npm projects. If any of these directories or files
 * can't be found then it's assumed that either the project is a malformed npm
 * project (for example if there's no `node_nodules` directory or `package.json`
 * file) or the project is a malformed SnapLib npm project (for example if
 * there's no `.editorconfig` or `.eslintrc.json` file which all SnapLib npm
 * projects require).
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class RootDirStructure
{
    private static readonly REQUIRED_NPM_DIRECTORIES: ReadonlyArray<string> =
        ["node_modules"];

    private static readonly REQUIRED_NPM_FILES: ReadonlyArray<string> =
        ["package.json"];

    private static readonly REQUIRED_SNAP_PROJ_DIRS: ReadonlyArray<string> =
        ["src"];

    private static readonly REQUIRED_SNAP_PROJ_FILES: ReadonlyArray<string> =
        [".editorconfig", ".eslintrc.json", "typedoc.json"];

    private static readonly OPTIONAL_SNAP_PROJ_DIRS: ReadonlyArray<string> =
        ["docs", ".git"];

    private static readonly OPTIONAL_SNAP_PROJ_FILES: ReadonlyArray<string> =
        [".gitignore", "LICENSE.txt", "README.md"];

    public static readonly required = class
    {
        public static readonly npm: Readonly<DirContents> =
            new DirContents(RootDirStructure.REQUIRED_NPM_DIRECTORIES, RootDirStructure.REQUIRED_NPM_FILES);
        public static readonly project: Readonly<DirContents> =
            new DirContents(RootDirStructure.REQUIRED_SNAP_PROJ_DIRS, RootDirStructure.REQUIRED_SNAP_PROJ_FILES);
    }

    public static readonly optional = class
    {
        public static readonly project: Readonly<DirContents> =
            new DirContents(RootDirStructure.OPTIONAL_SNAP_PROJ_DIRS, RootDirStructure.OPTIONAL_SNAP_PROJ_FILES);
    }
}
