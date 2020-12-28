import {join} from "path";
import * as fs from "fs";

if (process.argv.length === 2)
{
    throw new Error("No package.json path provided");
}
else if (process.argv.length !== 4)
{
    throw new Error(`3 command line arguments expected. ${process.argv.length - 2} arguments passed`);
}

const PKG_JSON_PATH = process.argv[2];

const NPM_PKG_DIR_NAME = process.argv[3];

if ( ! fs.existsSync(PKG_JSON_PATH))
{
    throw new Error(`"${PKG_JSON_PATH}" doesn't exist`);
}

if ( ! fs.lstatSync(PKG_JSON_PATH).isFile())
{
    throw new Error(`"${PKG_JSON_PATH}" is not a file`);
}

const PKG_JSON_STRING = fs.readFileSync(PKG_JSON_PATH, {encoding: "utf-8"});

let pkg_json_parse_result = undefined;

try
{
    pkg_json_parse_result = JSON.parse(PKG_JSON_STRING);
}
catch (err)
{
    throw new Error(`Error parsing package.json at "${PKG_JSON_STRING}"`);
}

const EXCLUDE_FROM_DIST_PKG_JSON = ["devDependencies", "private", "scripts"];

const PKG_JSON_ENTRIES = Object.entries(pkg_json_parse_result);

let pkg_json_obj = {};

for (let i = 0; i < PKG_JSON_ENTRIES.length; ++i)
{
    if ( ! EXCLUDE_FROM_DIST_PKG_JSON.includes(PKG_JSON_ENTRIES[i][0]))
    {
        pkg_json_obj[PKG_JSON_ENTRIES[i][0]] = PKG_JSON_ENTRIES[i][1];
    }
}

fs.writeFile(join("build", "dist", NPM_PKG_DIR_NAME, "package.json"),
             JSON.stringify(pkg_json_obj, null, 2),
             {encoding: "utf-8"},
             err => {if(err) throw err;});
