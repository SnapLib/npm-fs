import { Root } from "../../../main/ts/structure/Root";
import { assert } from "chai";
import { describe, it } from "mocha";

const REQUIRED_DIR_NAMES: ReadonlyArray<string> =
        ["docs", ".project.resources", "src"];

const REQUIRED_FILE_NAMES: ReadonlyArray<string> =
    ["package.json", "typedoc.json"];

const OPTIONAL_DIR_NAMES: ReadonlyArray<string> = [".git", "node_modules"];

const OPTIONAL_FILE_NAMES: ReadonlyArray<string> = [".eslintrc.json",
                                                    ".gitignore",
                                                    "LICENSE.txt",
                                                    "package-lock.json",
                                                    "README.md"];

describe("Root.REQUIRED", () =>
{

    context("Root.REQUIRED.directories", () =>
    {

        it(`should equal [ "${REQUIRED_DIR_NAMES.join('", "')}" ]`, () =>
        {
            assert.deepStrictEqual(Root.REQUIRED.directories, REQUIRED_DIR_NAMES);
        });
    });

    context("Root.REQUIRED.files", () =>
    {

        it(`should equal [ "${REQUIRED_FILE_NAMES.join('", "')}" ]`, () =>
        {
            assert.deepStrictEqual(Root.REQUIRED.files, REQUIRED_FILE_NAMES);
        });
    });
});

describe("Root.OPTIONAL", () =>
{

    context("Root.OPTIONAL.directories", () =>
    {

        it(`should equal [ "${OPTIONAL_DIR_NAMES.join('", "')}" ]`, () =>
        {
            assert.deepStrictEqual(Root.OPTIONAL.directories, OPTIONAL_DIR_NAMES);
        });
    });

    context("Root.OPTIONAL.files", () =>
    {

        it(`should equal [ "${OPTIONAL_FILE_NAMES.join('", "')}" ]`, () =>
        {
            assert.deepStrictEqual(Root.OPTIONAL.files, OPTIONAL_FILE_NAMES);
        });
    });
});
