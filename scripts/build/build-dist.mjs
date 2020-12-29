"use-strict";

import * as global from "../globals.mjs";
import {join} from "path";
import * as fs from "fs";

const formatRootPkgJsonForDist = pathToRootPkgJson =>
{
    // Ensure that a package.json exists in the root directory of the npm project
    if ( ! fs.existsSync(pathToRootPkgJson))
    {
        throw new Error(`"${pathToRootPkgJson}" doesn't exist`);
    }

    // Ensure that the package.json element is a file
    if ( ! fs.lstatSync(pathToRootPkgJson).isFile())
    {
        throw new Error(`"${pathToRootPkgJson}" is not a file`);
    }

    // Store the root package.json file as a string
    const rootPkgJsonString =
        fs.readFileSync(pathToRootPkgJson, {encoding: "utf-8"});

    // Return results from parsing package.json file
    const pkgJsonParseResult = function(jsonString)
    {
        try
        {
            return JSON.parse(jsonString);
        }
        catch (err)
        {
            throw new Error(`error parsing package.json at "${jsonString}"`);
        }
    }(rootPkgJsonString);

    // package.json properties to exclude from distributable package.json
    const rootPkgJsonPropsToExclude = ["devDependencies", "private", "scripts"];

    // Distributable package.json JavaScript object
    const distPkgJsonObject =
        Object.fromEntries(Object.entries(pkgJsonParseResult)
                                 .filter(pkgJsonEntry => ! rootPkgJsonPropsToExclude.includes(pkgJsonEntry[0])));

    return JSON.stringify(distPkgJsonObject, null, 2);
};

// Ensure that a package.json exists in the root directory of the npm project
if ( ! fs.existsSync(global.ROOT_PKG_JSON_FILE_PATH))
{
    throw new Error(`"${global.ROOT_PKG_JSON_FILE_PATH}" doesn't exist`);
}

// Ensure that the package.json element is a file
if ( ! fs.lstatSync(global.ROOT_PKG_JSON_FILE_PATH).isFile())
{
    throw new Error(`"${global.ROOT_PKG_JSON_FILE_PATH}" is not a file`);
}

// If no distribution npm directory package name is passed via cli argument
if (process.argv.length !== 3)
{
    throw new Error(`1 command line argument expected. ${process.argv.length - 2} arguments passed`);
}

const distPkgJsonPath =
    join(global.BUILD_DIST_DIR_PATH, process.argv[2], "package.json");

// Write distributable package.json object as string to resolved path
fs.writeFile(distPkgJsonPath,
             formatRootPkgJsonForDist(global.ROOT_PKG_JSON_FILE_PATH),
             {encoding: "utf-8"},
             err => {
                 if(err) {throw err;}
                 else {console.log(`formatted dist package.json written to\n"${distPkgJsonPath}"`);}
             });
