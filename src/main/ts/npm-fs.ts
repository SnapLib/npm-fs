/**
 * This is the entry point of the SnapLib `npm-fs` package.
 *
 * @overview
 * This class is responsible for exposing and exporting all the public classes
 * declared in this npm package to be used by other npm packages that install it
 * as a dependency.
 *
 * @author Snap <snap@snaplib.org>
 */
export {ExistingFileElement} from "./lib/element/file/ExistingFileElement";
export {ExistingDirElement} from "./lib/element/directory/ExistingDirElement";
export {JSONFile} from "./lib/element/file/JSONFile";
export {DirectoryRoot} from "./lib/element/directory/DirectoryRoot";
