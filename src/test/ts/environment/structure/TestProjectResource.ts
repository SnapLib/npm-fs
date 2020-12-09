import { ProjectResource } from "../../../../main/ts/environment/structure/ProjectResource";
import { assert } from "chai";
import { describe, it } from "mocha";

const REQUIRED_DIR_NAMES: ReadonlyArray<string> = ["scripts", "configs"];

const REQUIRED_FILE_NAMES: ReadonlyArray<string> = ["diagnostic.json"];

describe("ProjectResource.REQUIRED", () =>
{
    context("ProjectResource.REQUIRED.directories", () =>
    {
        it(`should equal [ "${REQUIRED_DIR_NAMES.join('", "')}" ]`, () =>
        {
            assert.deepStrictEqual(ProjectResource.REQUIRED.directories, REQUIRED_DIR_NAMES);
        });
    });

    context("ProjectResource.REQUIRED.files", () =>
    {
        it(`should equal [ "${REQUIRED_FILE_NAMES.join('", "')}" ]`, () =>
        {
            assert.deepStrictEqual(ProjectResource.REQUIRED.files, REQUIRED_FILE_NAMES);
        });
    });
});

describe("ProjectResource.OPTIONAL", () =>
{
    context("ProjectResource.OPTIONAL.directories", () =>
    {
        it("should be empty", () =>
        {
            assert.isEmpty(ProjectResource.OPTIONAL.directories);
        });
    });

    context("ProjectResource.OPTIONAL.files", () =>
    {
        it("should be empty", () =>
        {
            assert.isEmpty(ProjectResource.OPTIONAL.files);
        });
    });
});
