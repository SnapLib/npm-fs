import {DirContents} from "./DirContents";

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project `Resource Scripts` directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class ResourceScripts
{
    private static readonly REQUIRED_DIR_NAMES: ReadonlyArray<string> =
        [];

    private static readonly REQUIRED_FILE_NAMES: ReadonlyArray<string> =
        ["InitAnalyzer.ts"];

    private static readonly OPTIONAL_DIR_NAMES: ReadonlyArray<string> =
        ResourceScripts.REQUIRED_DIR_NAMES;

    private static readonly OPTIONAL_FILE_NAMES: ReadonlyArray<string> =
        ResourceScripts.OPTIONAL_DIR_NAMES;

    /**
     * Property containing all required files and directories that must be
     * present in the resource scripts directory of a SnapLib npm project.
     *
     * @static
     * @readonly
     * @property
     */
    public static readonly REQUIRED: DirContents = new DirContents(ResourceScripts.REQUIRED_DIR_NAMES, ResourceScripts.REQUIRED_FILE_NAMES);

    /**
     * Property containing all optional files and directories that must be
     * present in the resource scripts directory of a SnapLib npm project.
     *
     * @static
     * @readonly
     * @property
     */
    public static readonly OPTIONAL: DirContents = new DirContents(ResourceScripts.OPTIONAL_DIR_NAMES, ResourceScripts.OPTIONAL_FILE_NAMES);
}
