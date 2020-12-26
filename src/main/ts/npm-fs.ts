import {dirname} from "path";
import {DirectoryRoot} from "./environment/DirectoryRoot";
import {RootDirectory} from "./environment/structure/RootDirectory";
import {NodeModulesDir} from "./environment/structure/NodeModulesDir";
import {NodeModuleTypesDir} from "./environment/structure/NodeModuleTypesDir";
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
        const rootDirectory =
            new DirectoryRoot((dirname(dirname(__dirname))))
                .addRequiredDirs(RootDirectory.required.npm.directories.concat(RootDirectory.required.project.directories))
                .addRequiredFiles(RootDirectory.required.npm.files.concat(RootDirectory.required.project.files))
                .addOptionalDirs(RootDirectory.optional.project.directories)
                .addOptionalFiles(RootDirectory.optional.project.files);

        const rootNodeModulesDirectory = new DirectoryRoot(rootDirectory.path.concat("/" + NodeModulesDir.dirName))
            .addRequiredDirs(NodeModulesDir.required.module.directories);

        const rootNodeModulesTypesDir = new DirectoryRoot(rootDirectory.path.concat("/" + NodeModuleTypesDir.dirName))
            .addRequiredDirs(NodeModuleTypesDir.required.type.directories);

        if (rootDirectory.isMissingRequired())
        {
            console.log("Missing required root directory...");
            if (rootDirectory.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootDirectory.missingRequiredFiles().join('",\n""')}"]`);
            }

            if (rootDirectory.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootDirectory.missingRequiredDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing required root directory files or directories.");
        }

        if (rootDirectory.isMissingOptional())
        {
            console.log("Missing optional root directory...");
            if (rootDirectory.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootDirectory.missingOptionalFiles().join('",\n""')}"]`);
            }

            if (rootDirectory.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootDirectory.missingOptionalDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing optional root directory files or directories.");
        }

        if (rootNodeModulesDirectory.isMissingRequired())
        {
            console.log("Missing required node module directory...");
            if (rootNodeModulesDirectory.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootNodeModulesDirectory.missingRequiredFiles().join('",\n""')}"]`);
            }

            if (rootNodeModulesDirectory.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootNodeModulesDirectory.missingRequiredDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing required node module files or directories.");
        }

        if (rootNodeModulesDirectory.isMissingOptional())
        {
            console.log("Missing optional node module directory...");
            if (rootNodeModulesDirectory.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootNodeModulesDirectory.missingOptionalFiles().join('",\n""')}"]`);
            }

            if (rootNodeModulesDirectory.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootNodeModulesDirectory.missingOptionalDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing optional node module files or directories.");
        }

        if (rootNodeModulesTypesDir.isMissingRequired())
        {
            console.log("Missing required node module @types directory...");
            if (rootNodeModulesTypesDir.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootNodeModulesTypesDir.missingRequiredFiles().join('",\n""')}"]`);
            }

            if (rootNodeModulesTypesDir.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootNodeModulesTypesDir.missingRequiredDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing required node module @types files or directories.");
        }

        if (rootNodeModulesTypesDir.isMissingOptional())
        {
            console.log("Missing optional node module @types directory...");
            if (rootNodeModulesTypesDir.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootNodeModulesTypesDir.missingOptionalFiles().join('",\n""')}"]`);
            }

            if (rootNodeModulesTypesDir.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootNodeModulesTypesDir.missingOptionalDirs().join('",\n""')}"]`);
            }
        }
        else
        {
            console.log("No missing optional node module @types files or directories.");
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
