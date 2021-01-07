"use-strict";

import global from "../globals.mjs";
import {join, basename} from "path";
import fs from "fs";

/**
 * This script builds the distributable npm-fs package to be published to npm.
 *
 * @overview
 * This script requires an external source to set the name of the distributable
 * package root directory name. There are 2 ways this is obtained.
 *
 * By default, if no argument is provided, it attempts to use the npm config
 * property `dist_root_pkg_dirname` stored in the root npmrc of this package.
 *
 * Otherwise values passed via command line arguments can be used. If 1 cli
 * arguments is passed, then that value is used. If 2 cli args are passed, then
 * only the second cli arg is used.
 *
 * This is done to make overriding the naming of the distributable npm package
 * root directory more customizable and prioritize any argument that is passed
 * as a command line argument when the npm script command is called. For
 * example, say an npm package has the following contents in its root `.npmrc`
 * and `package.json` files:
 *
 * npmrc
 * @example <caption>npmrc config properties</caption>
 * ```
 * dist_root_pkg_dirname = "name-from-config-prop"
 *
 * package.json
 * @example <caption>build distributable script with no cli args</caption>
 * {
 *     "scripts": {
 *         "build-dist": "node scripts/build/build-dist.mjs"
 *     }
 * }
 * ```
 *
 * When the above script is run via the command `$npm run build-dist`, since no
 * arguments are passed to it, it attempts to use the npm config property value
 * set for `dist_root_pkg_dirname` which in this case is "name-from-config-prop".
 * So the name of the resulting built distributable package root directory will
 * be "name-from-config-prop".
 *
 * However, if the above script is called with a command line argument as
 * follows:
 *
 * `$npm run build-dist name-from-cli-arg`
 *
 * Then the name of the distributable package root directory that gets built
 * will be "name-from-cli-arg". Alternatively, a name argument can be written
 * into the script in `package.json` as follows:
 *
 * @example <caption>build distributable script with cli arg</caption>
 * ```
 * package.json
 * {
 *     "scripts": {
 *         "build-dist": "node scripts/build/build-dist.mjs name-from-hard-coded-arg"
 *     }
 * }
 * ```
 *
 * The above example will result in the name of the built distributable npm
 * package root directory to be "name-from-hard-coded-arg". However, this name
 * can still be easily overridden by simply passing the desired name as command
 * line argument when the script is called, so even if there
 *
 * @summary Builds the distributable npm-fs package to be published to npm.
 *
 * @author Snap <XxSnapperGeexX@gmail.com>
 */

// fixme Passed cli argument needs to match directory name generated by tsc
//   --outDir in package.json script call to work

// Ensure that a package.json exists in the root directory of the npm project
if ( ! fs.existsSync(global.ROOT_PKG_JSON_FILE_PATH))
{
    throw new Error(`"${global.ROOT_PKG_JSON_FILE_PATH}" doesn't exist`);
}
// Ensure that the package.json element is a file
else if ( ! fs.lstatSync(global.ROOT_PKG_JSON_FILE_PATH).isFile())
{
    throw new Error(`"${global.ROOT_PKG_JSON_FILE_PATH}" is not a file`);
}

/**
 * Converts a json file to a frozen JavaScript object. Optionally, values can
 * be provided to omit specific keys from or only include specific keys in the
 * generated JS object (if they're present in the provided json file). If
 * arguments are provided to both omit and include keys an error gets thrown.
 * Additionally, if an empty array is provided as an argument for either key
 * omission or inclusion, an error gets thrown.
 *
 * @summary Converts a json file to a frozen JavaScript object.
 *
 * @param pathToJsonFile A path to a json file
 *
 * @param keysToOmit Keys to not include in the generated JS object if they're
 *                   present in json file that gets getting objectified.
 *
 * @param keysToInclude Keys to include from the json file that's getting
 *                      objectified. All other keys are not included.
 *
 * @throws Error if provided json file path can't be parsed correctly or
 *         invalid omit or include key arguments are passed.
 *
 * @returns [p: string]: any
 */
const objectifyJsonFile = (pathToJsonFile, {omitKeys: keysToOmit, includeKeys: keysToInclude}) =>
{
    if (keysToOmit && keysToInclude)
    {
        throw new Error("Keys to omit and include simultaneously defined");
    }
    else if (keysToOmit?.length === 0)
    {
        throw new Error("Empty omit keys array");
    }
    else if (keysToInclude?.length === 0)
    {
        throw new Error("Empty include keys array");
    }

    // Ensure that a package.json exists in the root directory of the npm project
    if ( ! fs.existsSync(pathToJsonFile))
    {
        throw new Error(`"${pathToJsonFile}" doesn't exist`);
    }

    // Ensure that the package.json element is a file
    if ( ! fs.lstatSync(pathToJsonFile).isFile())
    {
        throw new Error(`"${pathToJsonFile}" is not a file`);
    }

    // Store the json file as a string
    const jsonFileString =
        fs.readFileSync(pathToJsonFile, {encoding: "utf-8"});

    // Parse json file to JavaScript object
    const originalJsObj = (jsonString =>
    {
        try
        {
            return Object.freeze(JSON.parse(jsonString));
        }
        catch (err)
        {
            throw new Error(`error parsing package.json at "${pathToJsonFile}"`);
        }
    })(jsonFileString);

    // Create new JS object with specified keys omitted or included
    const newJsObj = Object.freeze(
        Object.fromEntries(Object.entries(originalJsObj)
                                 .filter(pkgJsonEntry =>
                                             // If specified keys to include, only include those keys
                                             keysToInclude?.includes(pkgJsonEntry[0])
                                             // If specified keys to exclude, include only keys that don't match those keys
                                             ?? ! keysToOmit?.includes(pkgJsonEntry[0])
                                             // If no keys specified to include or exclude, include all keys
                                             ?? true)));

    // Create array from keys that are not present in new JS object
    const oldNewJsObjDiff =
        Object.keys(originalJsObj).filter(key => ! Object.keys(newJsObj).includes(key));

    // If there is a difference in keys between original and new JS object,
    // print which keys are omitted and which keys are retained to console
    if (oldNewJsObjDiff.length !== 0)
    {
        const oldNewJsObjIntersection =
            Object.keys(originalJsObj).filter(key => ! oldNewJsObjDiff.includes(key));

        console.log(`omitting keys from distributable package.json:\n["${oldNewJsObjDiff.join('", "')}"]\n`);

        console.log(`keys retained from npm root package.json:\n["${oldNewJsObjIntersection.join('", "')}"]\n`);
    }

    // New JS object with specified keys omitted or included
    return newJsObj;
};

/**
 * The name of the distributable generated npm package root directory.
 *
 * Attempts to use a provided command line argument that can be hard coded into
 * the package.json `script` value or passed on the command line when the script
 * is called. If no command line argument is passed, attempts to us the value
 * set to `dist_root_pkg_dirname` in the root `.npmrc` file.
 *
 * If too many command line arguments are passed or no arguments are passed and
 * there's no npm config property set, then an error gets thrown.
 *
 * @throws Error if more than 2 command line arguments are passed or no command
 *         line arguments are passed AND no default value is set for the
 *         `dist_root_pkg_dirname` npm config property.
 *
 * @type {string|undefined}
 */
const distPkgDirName = ((cliArgs) =>
{
    const passedCliArgs = cliArgs.slice(2);

    // If more than 2 cli args are passed
    if (cliArgs.length > 4)
    {
        throw new Error(
            `0 to 2 command line argument(s) expected. ${process.argv.length - 2} arguments passed: ["${passedCliArgs.join('", "')}"]\n`);
    }
    // If two distributable root package directory cli arg names are provided
    else if (passedCliArgs.length === 2)
    {
        console.log(
            `["${passedCliArgs.join('", "')}"] arguments provided. Setting`
          + ` distributable package root directory name to "${passedCliArgs[1]}"\n`);

        return passedCliArgs[1];
    }
    // If single distributable root package directory cli arg name is provided
    else if (passedCliArgs.length === 1)
    {
        console.log(
            `"${passedCliArgs[0]}" argument provided. Setting distributable`
            + ` package root directory name\nto "${passedCliArgs[0]}"\n`);

        return passedCliArgs[0];
    }
    // If no distributable root package directory name is provided via cli
    // argument and no default dist_root_pkg_dirname npm config property is set
    else if (process.env.npm_config_dist_root_pkg_dirname === undefined)
    {
        throw new Error(
            "no distributable npm root package name command line argument\n"
         +  "provided and no default npm config property set");
    }
    // If no no cli arg name is passed, use config property if it exists
    else
    { console.log(
        "no distributable npm root package directory name command line argument"
     +  "\nprovided. Setting distributable package root directory name to npm"
     +  '\n"dist_root_pkg_dirname" config property value: '
     +  `"${process.env.npm_config_dist_root_pkg_dirname}"\n`);

        return process.env.npm_config_dist_root_pkg_dirname;
    }
})(process.argv);

/**
 * The absolute path pointing to the root directory of the distributable npm
 * package
 *
 * @type {string}
 */
const distPkgDirPath = join(global.BUILD_DIST_DIR_PATH, distPkgDirName);

/**
 * The path to the root README file of this npm package if it exists as a
 * markdown, text, rtf, or un-suffixed file. If there is no root README file
 * then this value is set to `undefined`.
 *
 * @summary The path to the root README file of this npm package.
 *
 * @type {string|undefined}
 */
const rootReadMePath =
    join(global.NPM_ROOT_DIR_PATH,
         fs.readdirSync(global.NPM_ROOT_DIR_PATH, {withFileTypes: true})
           .find(dirent => dirent.isFile() && /^README(\.(md|txt|rtf))?$/gi.test(dirent.name)).name);

/**
 * The path to the root LICENSE file of this npm package if it exists as a
 * markdown, text, rtf, or un-suffixed file. If there is no root LICENSE file
 * then this value is set to `undefined`.
 *
 * @summary The path to the LICENSE file of this npm package.
 *
 * @type {string|undefined}
 */
const rootLicensePath =
    join(global.NPM_ROOT_DIR_PATH,
         fs.readdirSync(global.NPM_ROOT_DIR_PATH, {withFileTypes: true})
           .find(dirent => dirent.isFile() && /^LICENSE(\.(md|txt|rtf))?$/gi.test(dirent.name)).name);

/**
 * The absolute path pointing to the root `package.json` file of the
 * distributable npm package that's going to be generated.
 *
 * @type {string}
 */
const distPkgJsonPath = join(distPkgDirPath, "package.json");

/**
 * The JavaScript object to be converted to the `package.json` file of the
 * distributable npm package that's going to be generated.
 *
 * @type Readonly<{[p: string]: any}>
 */
const distPkgJsonObj = objectifyJsonFile(global.ROOT_PKG_JSON_FILE_PATH, {omitKeys: ["config", "devDependencies", "private", "scripts"]});

// If a root README file exists, copy it into root distributable package directory
if (fs.existsSync(rootReadMePath))
{
    const distReadMePath = join(distPkgDirPath, basename(rootReadMePath));

    fs.copyFile(rootReadMePath,
                distReadMePath,
                err => {
                    if (err) throw err;
                    else console.log(`README copied to:\n"${distReadMePath}"\n`);
                });
}

// If a root LICENSE file exists, copy it into root distributable package directory
if (fs.existsSync(rootLicensePath))
{
    const distLicensePath = join(distPkgDirPath, basename(rootLicensePath));

    fs.copyFile(rootLicensePath,
                distLicensePath,
                err => {
                    if (err) throw err;
                    else console.log(`LICENSE copied to:\n"${distLicensePath}"\n`);
                });
}

// Write distributable package.json object as string to resolved path
fs.writeFile(distPkgJsonPath,
             JSON.stringify(distPkgJsonObj, null, 2),
             {encoding: "utf-8"},
             err => {
                 if(err) throw err;
                 else console.log(`formatted dist package.json written to:\n"${distPkgJsonPath}"\n`);
             });
