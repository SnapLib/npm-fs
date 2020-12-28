"use-strict";

import {fileURLToPath} from "url";
import {dirname, join} from "path";
import * as fs from "fs";

// Get path to root npm directory that should be at ../../__filename assuming
// this script is located in root `scripts` directory of npm project
const NPM_ROOT_DIR_PATH = dirname(dirname(fileURLToPath(import.meta.url)));

// Get path to package.json that is in npm project root directory
const PKG_JSON_PATH = join(NPM_ROOT_DIR_PATH, "package.json");

// Ensure that a package.json exists in the root directory of the npm project
if ( ! fs.existsSync(PKG_JSON_PATH))
{
    throw new Error(`"${PKG_JSON_PATH}" doesn't exist`);
}

// Ensure that the package.json element is a file
if ( ! fs.lstatSync(PKG_JSON_PATH).isFile())
{
    throw new Error(`"${PKG_JSON_PATH}" is not a file`);
}

// If no distribution npm directory package name is passed via cli argument
if (process.argv.length !== 3)
{
    throw new Error(`1 command line argument expected. ${process.argv.length - 2} arguments passed`);
}

// Set the name of the root directory of the distributable npm package to the
// provided directory name that was passed via cli argument
const NPM_DIST_PKG_DIR_NAME = process.argv[2];

// Store the root package.json file as a string
const PKG_JSON_STRING = fs.readFileSync(PKG_JSON_PATH, {encoding: "utf-8"});

// Return results from parsing package.json file
const pkg_json_parse_result = () =>
{
    try
    {
        return JSON.parse(PKG_JSON_STRING);
    }
    catch (err)
    {
        throw new Error(`error parsing package.json at "${PKG_JSON_PATH}"`);
    }
};

// package.json properties to exclude from distributable package.json
const DIST_PKG_JSON_PROPS_TO_EXCLUDE = ["devDependencies", "private", "scripts"];

// Distributable package.json JavaScript object
const dist_pkg_json_obj =
    Object.fromEntries(Object.entries(pkg_json_parse_result()).filter(pkgJsonEntry => ! DIST_PKG_JSON_PROPS_TO_EXCLUDE.includes(pkgJsonEntry[0])));

// Path to write distributable package.json to
const DIST_PKG_JSON_PATH =
    join(NPM_ROOT_DIR_PATH, "build", "dist", NPM_DIST_PKG_DIR_NAME, "package.json");

// Write distributable package.json object as string to resolved path
fs.writeFile(DIST_PKG_JSON_PATH,
             JSON.stringify(dist_pkg_json_obj, null, 2),
             {encoding: "utf-8"},
             err => {
                 if(err) {throw err;}
                 else {console.log(`formatted dist package.json written to\n"${DIST_PKG_JSON_PATH}"`);}
             });
