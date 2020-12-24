import {DirContents} from "./DirContents";
import ReadOnlyDict = NodeJS.ReadOnlyDict;

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project `RootDirectory` directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class RootDirStructure
{
    private static readonly REQUIRED_NODE_DIRECTORIES: ReadonlyArray<string> =
        ["node_modules"];

    private static readonly REQUIRED_NODE_FILES: ReadonlyArray<string> =
        ["package.json", "package-lock.json"];

    private static readonly REQUIRED_SNAP_PROJ_DIRS: ReadonlyArray<string> =
        ["src"];

    private static readonly REQUIRED_SNAP_PROJ_FILES: ReadonlyArray<string> =
        [".editorconfig", ".eslintrc.json", "typedoc.json"];

    private static readonly OPTIONAL_SNAP_PROJ_DIRS: ReadonlyArray<string> =
        ["docs", ".git"];

    private static readonly OPTIONAL_SNAP_PROJ_FILES: ReadonlyArray<string> =
        [".gitignore", "LICENSE.txt", "README.md"];

    public static readonly required: ReadOnlyDict<DirContents> =
        {
            node: new DirContents(RootDirStructure.REQUIRED_NODE_DIRECTORIES, RootDirStructure.REQUIRED_NODE_FILES),
            project: new DirContents(RootDirStructure.REQUIRED_SNAP_PROJ_DIRS, RootDirStructure.REQUIRED_SNAP_PROJ_FILES)
        }

    public static readonly optional: ReadOnlyDict<DirContents> =
        {
            project: new DirContents(RootDirStructure.OPTIONAL_SNAP_PROJ_DIRS, RootDirStructure.OPTIONAL_SNAP_PROJ_FILES)
        }
}
