import {Structure} from "./Structure";

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project `Root` directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class Root
{
    private static readonly REQUIRED_DIR_NAMES: ReadonlyArray<string> =
        ["docs", "src"];

    private static readonly REQUIRED_FILE_NAMES: ReadonlyArray<string> =
        ["package.json",
         "typedoc.json"];

    private static readonly OPTIONAL_DIR_NAMES: ReadonlyArray<string> =
        [".git",
         "node_modules"];

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
     * @property
     */
    public static readonly REQUIRED: Structure = new Structure(Root.REQUIRED_DIR_NAMES, Root.REQUIRED_FILE_NAMES);

    /**
     * Property containing all optional files and directories that must be
     * present in the root directory of a SnapLib npm project.
     *
     * @static
     * @property
     */
    public static readonly OPTIONAL: Structure = new Structure(Root.OPTIONAL_DIR_NAMES, Root.OPTIONAL_FILE_NAMES);
}
