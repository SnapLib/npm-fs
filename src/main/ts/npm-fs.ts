/**
 * This is the entry point of the SnapLib `npm-fs` package.
 *
 * @overview
 * This class is responsible for exposing and exporting all the public classes
 * declared in this npm package to be used by other npm packages that install it
 * as a dependency.
 *
 * @remarks
 * It is assumed that this package directory will be located in the root
 * `node_modules` directory and that this source file will be located in the
 * root of this package directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export {ExistingFileElement} from "./element/file/ExistingFileElement";
export {ExistingDirElement} from "./element/directory/ExistingDirElement";
export {JSONFile} from "./element/file/JSON-File";
export {DirectoryRoot} from "./element/directory/DirectoryRoot";
