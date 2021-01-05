import {DirectoryRoot} from "./element/directory/DirectoryRoot";
import {dirname} from "path";
import {JSONFile} from "./element/file/JSON-File";

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
            new DirectoryRoot(dirname(dirname(__dirname)))
                .addRequiredDirs(["node_modules", "scripts", "src"])
                .addRequiredFiles([".eslintrc.json", "package.json"])
                .addOptionalDirs([".git", "docs"])
                .addOptionalFiles(["LICENSE.txt", "README.md", ".gitignore"]);

        const rootPkgJson = new JSONFile(rootDirectory.path, "package.json");

        if (rootDirectory.isMissingRequired())
        {
            console.log("\nMissing required root directory...");
            if (rootDirectory.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootDirectory.missingRequiredFiles().join('",\n""')}"]\n`);
            }

            if (rootDirectory.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootDirectory.missingRequiredDirs().join('",\n""')}"]\n`);
            }
        }
        else
        {
            console.log("No missing required root directory files or directories.");
        }

        if (rootDirectory.isMissingOptional())
        {
            console.log("\nMissing optional root directory...");
            if (rootDirectory.isMissingRequiredFile())
            {
                console.log(`file(s): ["${rootDirectory.missingOptionalFiles().join('",\n""')}"]\n`);
            }

            if (rootDirectory.isMissingRequiredDir())
            {
                console.log(`directory(ies): ["${rootDirectory.missingOptionalDirs().join('",\n""')}"]\n`);
            }
        }
        else
        {
            console.log("No missing optional root directory files or directories.");
        }

        console.log(`root json package contents:\n${rootPkgJson}`);
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
