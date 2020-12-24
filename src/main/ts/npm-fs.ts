import {dirname} from "path";
import {RootDirectory} from "./environment/root/RootDirectory";
import {JSONFile} from "./element/JSONFile";
import {RootDirStructure} from "./environment/structure/RootDirStructure";
// import * as fs from "fs";

/**
 * This is the entry point of the SnapLib `npm-fs` package.
 *
 * @classdesc
 * This class is responsible for consuming command line arguments as well as
 * acts as the origin point for validating and parsing the npm package structure
 * this package is installed to as a dependency.
 *
 * @remarks
 * It is assumed that this package directory will be located in the root
 * `node_modules` directory and that this source file will be located in the
 * root of this package directory.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class NpmFS
{
    /**
     * @private
     * @readonly
     * @property
     */
    private readonly _cliArgs: ReadonlyArray<string>;

    /**
     * @private
     * @readonly
     * @property
     */
    private readonly _rootDir: RootDirectory;

    /** @constructor */
    private constructor(cliArgs: ReadonlyArray<string>)
    {
        this._cliArgs = cliArgs;

        if (this._cliArgs.length === 0)
        {
            console.log("no cli args passed");
        }
        else
        {
            console.log(`cli args passed: ["${this._cliArgs.join('", "')}"]`);
        }

        if (dirname(__dirname) !== "node_modules")
        {
            console.log("entry point not in node modules");
        }

        // Set root directory to parent directory that contains "node_modules"
        // directory
        this._rootDir = new RootDirectory((dirname(dirname(__dirname))));

        const missingNPMDirectories: ReadonlyArray<string> =
            RootDirStructure.required.node.directories.filter(requiredNodeDir => ! this._rootDir.containsDirIgnoreCase(requiredNodeDir));
            // RootDirectory.REQUIRED_NODE.directories.filter(requiredNodeDir => ! this._rootDir.containsDirIgnoreCase(requiredNodeDir));

        const missingNPMFiles: ReadonlyArray<string> =
            RootDirectory.REQUIRED_NODE.files.filter(requiredNodeFile => ! this._rootDir.containsFileIgnoreCase(requiredNodeFile));

        const missingSnapDirectories: ReadonlyArray<string> =
            RootDirectory.DEFAULT_REQUIRED.directories.filter(requiredSnapDir => ! this._rootDir.containsDirIgnoreCase(requiredSnapDir));

        const missingSnapFiles: ReadonlyArray<string> =
            RootDirectory.DEFAULT_REQUIRED.files.filter(requiredSnapFile => ! this._rootDir.containsFileIgnoreCase(requiredSnapFile));

        const jsonFile: JSONFile = new JSONFile(this._rootDir.path.concat("/package.json"));

        console.log(`Package.json entries: ${jsonFile.entries()}\n`);
        console.log(`Package.json keys: ${jsonFile.keys()}\n`);
        console.log(`Package.json values: ${jsonFile.values()}\n`);
        console.log(`Package.json obj:\n${jsonFile.toString()}\n`);

        console.log(`Missing node dirs: ["${missingNPMDirectories.join('", "')}"]`);
        console.log(`Missing node files: ["${missingNPMFiles.join('", "')}"]`);
        console.log(`Missing SnapLib dirs: ["${missingSnapDirectories.join('", "')}"]`);
        console.log(`Missing SnapLib files: ["${missingSnapFiles.join('", "')}"]`);

        // if (missingNPMDirectories.length !== 0)
        // {
        //     throw new Error(`missing required npm directories: ${missingNPMDirectories}`);
        // }

        // if (missingNPMFiles.length !== 0)
        // {
        //     throw new Error(`missing required npm files: ${missingNPMFiles}`);
        // }
    }

    public static exec(cliArgs?: ReadonlyArray<string>): void
    {
        const npmFs: NpmFS = new NpmFS(cliArgs ?? process.argv.slice(2));

        // To get rid of TS lint error
        if (npmFs)
        {
            true;
        }
    }
}

NpmFS.exec();
