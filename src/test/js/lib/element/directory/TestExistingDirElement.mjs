import { ExistingDirElement } from "../../../../../../build/dist/npm-fs/lib/element/directory/ExistingDirElement.js";
import chai from "chai";
import { describe, it } from "mocha";
import path from "path";
import url from "url";

const assert = chai.assert;

const fileUrlToPath = url.fileURLToPath;

const cwd = path.dirname(fileUrlToPath(import.meta.url));

const mockExistingDirRelPath = path.resolve("../../../../resources/MockExistingDirectory");
const mockExistingDirAbsPath = "/Users/Main/Projects/snaplib-npm-fs/src/test/resources/MockExistingDirectory";

describe("MockExistingDirectory", function () {
    describe("valid initialization", function ()
    {
        it(`new ExistingDirElement("${mockExistingDirAbsPath}") should not throw`, function ()
        {
            assert.doesNotThrow(() => new ExistingDirElement(mockExistingDirAbsPath));
        });

        it(`new ExistingDirElement("${cwd}") should not throw`, function ()
        {
            assert.doesNotThrow(() => new ExistingDirElement(cwd));
        });
    });

    describe("invalid initialization", function ()
    {
        it(`new ExistingDirElement("") should not throw`, function ()
        {
            assert.doesNotThrow(() => new ExistingDirElement());
        });
    });
});
