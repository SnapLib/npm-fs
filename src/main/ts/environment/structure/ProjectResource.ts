import {DirContents} from "./DirContents";

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project `Project Resources` directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class ProjectResource
{
    private static readonly REQUIRED_DIR_NAMES: ReadonlyArray<string> =
        ["scripts", "configs"];

    private static readonly REQUIRED_FILE_NAMES: ReadonlyArray<string> =
        ["diagnostic.json"];

    private static readonly OPTIONAL_DIR_NAMES: ReadonlyArray<string> = [];

    private static readonly OPTIONAL_FILE_NAMES: ReadonlyArray<string> =
        ProjectResource.OPTIONAL_DIR_NAMES;

    /**
     * Property containing all required files and directories that must be
     * present in the project resource directory of a SnapLib npm project.
     *
     * @static
     * @readonly
     * @property
     */
    public static readonly REQUIRED: DirContents = new DirContents(ProjectResource.REQUIRED_DIR_NAMES, ProjectResource.REQUIRED_FILE_NAMES);

    /**
     * Property containing all optional files and directories that must be
     * present in the project resource directory of a SnapLib npm project.
     *
     * @static
     * @readonly
     * @property
     */
    public static readonly OPTIONAL: DirContents = new DirContents(ProjectResource.OPTIONAL_DIR_NAMES, ProjectResource.OPTIONAL_FILE_NAMES);
}
