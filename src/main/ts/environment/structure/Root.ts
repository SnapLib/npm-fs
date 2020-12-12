import {DirContents} from "./DirContents";

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project `Root` directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class Root
{
    private static readonly REQUIRED_DIR_NAMES: ReadonlyArray<string> =
        ["node_modules", ".project.resources", "src"];

    private static readonly REQUIRED_FILE_NAMES: ReadonlyArray<string> =
        ["package.json",
         "typedoc.json"];

    private static readonly OPTIONAL_DIR_NAMES: ReadonlyArray<string> =
        ["docs", ".git"];

    private static readonly OPTIONAL_FILE_NAMES: ReadonlyArray<string> =
        [".eslintrc.json",
         ".gitignore",
         "LICENSE.txt",
         "package-lock.json",
         "README.md"];

    /**
     * Property containing all required files and directories that must be
     * present in the root directory of a SnapLib npm project.
     *
     * @static
     * @readonly
     * @property
     */
    public static readonly REQUIRED: DirContents = new DirContents(Root.REQUIRED_DIR_NAMES, Root.REQUIRED_FILE_NAMES);

    /**
     * Property containing all optional files and directories that must be
     * present in the root directory of a SnapLib npm project.
     *
     * @static
     * @readonly
     * @property
     */
    public static readonly OPTIONAL: DirContents = new DirContents(Root.OPTIONAL_DIR_NAMES, Root.OPTIONAL_FILE_NAMES);
}
