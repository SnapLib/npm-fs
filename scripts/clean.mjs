"use-strict";

import * as global from "./globals.mjs";
import * as fs from "fs";
import {join} from "path";

// Valid cli args that can be passed to clean script
const VALID_CLI_ARGS = ["dist", "docs", "src", "test"];

// Removes directory at provided path(s)
const rmDir = async (...dirPaths) =>
{
    // If single passed
    if (dirPaths.length === 1)
    {
        // If passed argument is not an array
        if ( ! Array.isArray(dirPaths[0]))
        {
            if (fs.existsSync(dirPaths[0]))
            {
                // If passed argument is path that points to a file
                if (fs.lstatSync(dirPaths[0]).isFile())
                {
                    throw new Error(`path points to file:\n${dirPaths[0]}`);
                }
                // If passed argument is a path that points to an existing
                // directory
                else
                {
                    await fs.rmdir(dirPaths[0], {recursive: true},
                                   err =>
                                   {if (err) throw err;
                                    else console.log(`removed directory:\n"${dirPaths[0]}"`);});
                }
            }
            // If passed argument isn't a path that points to an existing
            // directory
            else
            {
                console.log(`no directory to remove with path:\n"${dirPaths[0]}"`);
            }
        }
        // If passed argument is an array
        else
        {
            dirPaths[0].forEach(dirPath => rmDir(dirPath));
        }
    }
    // If passed argument is comma separated path strings
    else if (dirPaths.length > 1)
    {
        dirPaths.forEach(dirPath => rmDir(dirPath));
    }
};

const translateCliArgsToPaths = cliArgsArray =>
{
    // Src code files that compile to JavaScript
    const COMPILE_TO_JS_SRC_DIRS = ["js", "ts", "cs"];

    // Src code files that compile to CSS
    const COMPILE_TO_CSS_SRC_DIRS = ["css", "scss", "sass", "less"];

    let paths = [];

    if (cliArgsArray.includes("dist"))
    {
        if (fs.existsSync(global.DIST_DIR_PATH)
            && fs.lstatSync(global.DIST_DIR_PATH).isDirectory())
        {
            paths.push(global.DIST_DIR_PATH);
        }
    }

    if (cliArgsArray.includes("docs"))
    {
        if (fs.existsSync(global.BUILD_DOCS_DIR_PATH)
            && fs.lstatSync(global.BUILD_DOCS_DIR_PATH).isDirectory())
        {
            paths.push(global.BUILD_DOCS_DIR_PATH);
        }
    }

    if (cliArgsArray.includes("test"))
    {
        if (fs.existsSync(global.BUILD_TEST_DIR_PATH)
            && fs.lstatSync(global.BUILD_TEST_DIR_PATH).isDirectory())
        {
            paths.push(global.BUILD_TEST_DIR_PATH);
        }
    }

    if (cliArgsArray.includes("src"))
    {
        const srcMainDirContents = fs.readdirSync(global.SRC_MAIN_DIR_PATH);

        if (srcMainDirContents.includes("html"))
        {
            const htmlBuildDirPath = join(global.BUILD_DIR_PATH, "html");

            if (fs.existsSync(htmlBuildDirPath)
                && fs.lstatSync(htmlBuildDirPath).isDirectory())
            {
                paths.push(htmlBuildDirPath);
            }
        }

        if (srcMainDirContents.includes("resources"))
        {
            const resourcesBuildDirPath = join(global.BUILD_DIR_PATH, "resources");

            if (fs.existsSync(resourcesBuildDirPath)
                && fs.lstatSync(resourcesBuildDirPath).isDirectory())
            {
                paths.push(resourcesBuildDirPath);
            }
        }

        if (srcMainDirContents.some(srcDir => COMPILE_TO_JS_SRC_DIRS.includes(srcDir)))
        {
            const jsBuildDirPath = join(global.BUILD_DIR_PATH, "js");

            if (fs.existsSync(jsBuildDirPath)
                && fs.lstatSync(jsBuildDirPath).isDirectory())
            {
                paths.push(jsBuildDirPath);
            }
        }

        if (srcMainDirContents.some(srcDir => COMPILE_TO_CSS_SRC_DIRS.includes(srcDir)))
        {
            const cssBuildDirPath = join(global.BUILD_DIR_PATH, "css");

            if (fs.existsSync(cssBuildDirPath)
                && fs.lstatSync(cssBuildDirPath).isDirectory())
            {
                paths.push(cssBuildDirPath);
            }
        }
    }

    return paths;
};

// If no cli args passed to script
if (process.argv.length === 2)
{
    // Remove entire build directory
    rmDir(global.BUILD_DIR_PATH);
}
// If one or more cli args passed to script
else if (process.argv.length > 2)
{
    const cliArgs = process.argv.slice(2);

    // Validate cli args
    if ( ! cliArgs.every(cliArg => VALID_CLI_ARGS.includes(cliArg)))
    {
        throw new Error(`unrecognized argument(s): ${cliArgs.filter(cliArg => ! VALID_CLI_ARGS.includes(cliArg)).join(", ")}`);
    }
    else
    {
        rmDir(translateCliArgsToPaths(cliArgs));
    }
}
