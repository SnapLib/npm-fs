import {DirContents} from "./DirContents";

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project root directory.
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
