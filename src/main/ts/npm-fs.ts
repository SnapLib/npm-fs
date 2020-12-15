import { dirname } from "path";
import {Root} from "./environment/Root";

/**
 * This is the entry point of the SnapLib `npm-fs` node package.
 *
 * @classdesc
 * This class is responsible for consuming and parsing command line arguments as
 * well as acts as the origin point for validating and parsing the npm package
 * structure this package is installed to as a dependency.
 *
 * @remarks
 * It is assumed that this package will be used in npm based projects wishing to
 * adhere to the SnapLib npm project structure. This API breaks a SnapLib
 * categorizes project structures. The first simply being an npm project, the
 * second being a SnapLib npm project.
 *
 * @remarks
 * Building on top of the above remark, it can be assumed that this package
 * directory will be located in the root `node_modules` directory and that this
 * source file will be located in the root of this package directory. So if a programmer has
 * a project with the root project directory "my-npm-project", it'd be
 * structured like:
 *
 * @example Sample SnapLib npm project structure
 * ```shell
 * .
 * ├──src
 * ├──node_modules
 * │  └──npm-fs
 * │     └── npm-fs.js
 * ```
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */
export class NpmFS
{
    private readonly rootDir: Root;

    private constructor(private readonly cliArgs: ReadonlyArray<string>)
    {
        if (dirname(__dirname) === "node-modules")
        {
            throw new Error("Invalid node modules directory");
        }

        // Set root directory to parent directory that contains "node_modules"
        // directory
        this.rootDir = new Root((dirname(dirname(__dirname))));

        // S
        const missingNPMDirectories: ReadonlyArray<string> =
            Root.REQUIRED_NODE.directories.filter(requiredNodeDir => ! this.rootDir.containsDirIgnoreCase(requiredNodeDir));

        const missingNPMFiles: ReadonlyArray<string> =
            Root.REQUIRED_NODE.files.filter(requiredNodeFile => ! this.rootDir.containsFileIgnoreCase(requiredNodeFile));

        console.log(this.rootDir);
        console.log(`Missing node dirs: ["${missingNPMDirectories.join('", "')}"]`);
        console.log(`Missing node files: ["${missingNPMFiles.join('", "')}"]`);

        // if (missingNPMDirectories.length !== 0)
        // {
        //     throw new Error(`missing required npm directories: ${missingNPMDirectories}`);
        // }
        // else if (missingNPMFiles.length !== 0)
        // {
        //     throw new Error(`missing required npm files: ${missingNPMFiles}`);
        // }
    }

    public static exec(cliArgs?: ReadonlyArray<string>): void
    {
        const npmFs: NpmFS = new NpmFS(cliArgs ?? process.argv.slice(2));
    }
}

NpmFS.exec();
