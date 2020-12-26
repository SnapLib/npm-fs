import {dirname} from "path";
import {DirectoryRoot} from "./environment/root/DirectoryRoot";
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
    private readonly _rootDir: DirectoryRoot;

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

        // Set root directory to directory that contains "node_modules"
        // directory
        this._rootDir =
            new DirectoryRoot((dirname(dirname(__dirname))))
                .addRequiredDirs(RootDirStructure.required.npm.directories.concat(RootDirStructure.required.project.directories))
                .addRequiredFiles(RootDirStructure.required.npm.files.concat(RootDirStructure.required.project.files))
                .addOptionalDirs(RootDirStructure.optional.project.directories)
                .addOptionalFiles(RootDirStructure.optional.project.files);

        if (this._rootDir.isMissingRequired())
        {
            console.log("Missing required...");
            if (this._rootDir.isMissingRequiredFile())
            {
                console.log(`file(s): ["${this._rootDir.missingRequiredFiles().join('",\n""')}"]`);
            }

            if (this._rootDir.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${this._rootDir.missingRequiredDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing required files or directories.");
        }

        if (this._rootDir.isMissingOptional())
        {
            console.log("Missing optional...");
            if (this._rootDir.isMissingRequiredFile())
            {
                console.log(`file(s): ["${this._rootDir.missingOptionalFiles().join('",\n""')}"]`);
            }

            if (this._rootDir.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${this._rootDir.missingOptionalDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing optional files or directories.");
        }
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
