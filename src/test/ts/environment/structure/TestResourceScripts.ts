import { ResourceScripts } from "../../../../main/ts/environment/structure/ResourceScripts";
import { assert } from "chai";
import { describe, it } from "mocha";

const REQUIRED_FILE_NAMES: ReadonlyArray<string> = ["InitAnalyzer.ts"];

describe("ResourceScripts.REQUIRED", () =>
{
    context("ResourceScripts.REQUIRED.directories", () =>
    {
        it("should be empty", () =>
        {
            assert.isEmpty(ResourceScripts.REQUIRED.directories);
        });
    });

    context("ResourceScripts.REQUIRED.files", () =>
    {
        it(`should equal [ "${REQUIRED_FILE_NAMES.join('", "')}" ]`, () =>
        {
            assert.deepStrictEqual(ResourceScripts.REQUIRED.files, REQUIRED_FILE_NAMES);
        });
    });
});

describe("ResourceScripts.OPTIONAL", () =>
{
    context("ResourceScripts.OPTIONAL.directories", () =>
    {
        it("should be empty", () =>
        {
            assert.isEmpty(ResourceScripts.OPTIONAL.directories);
        });
    });

    context("ResourceScripts.OPTIONAL.files", () =>
    {
        it("should be empty", () =>
        {
            assert.isEmpty(ResourceScripts.OPTIONAL.files);
        });
    });
});
