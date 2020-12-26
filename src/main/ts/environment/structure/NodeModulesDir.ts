import {DirContents} from "../DirContents";

/**
 * Defines the required and optional files and directories that should be
 * present in a SnapLib based npm project root `node_modules` directory.
 *
 * @classdesc
 * This class is essentially an enum/singleton that contains string arrays of
 * the file and directory names that should be (or can be) present in the root
 * `node_modules` directory of SnapLib based npm projects. If any of these
 * directories or files can't be found then it's assumed that this npm project
 * is missing imported node module dependencies.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class NodeModulesDir
{
    private static readonly EMPTY_ARRAY: ReadonlyArray<string> = [];

    private static readonly REQUIRED_NODE_MODULE_DIRECTORIES: ReadonlyArray<string> =
        ["@types", "@typescript-eslint", "chai", "commander", "eslint", "mocha",
         "mochawesome", "rimraf", "ts-node", "tslib", "typedoc", "typescript"];

    public static readonly required = class
    {
        public static readonly module: Readonly<DirContents> =
            new DirContents(NodeModulesDir.REQUIRED_NODE_MODULE_DIRECTORIES, NodeModulesDir.EMPTY_ARRAY);
    }
}
