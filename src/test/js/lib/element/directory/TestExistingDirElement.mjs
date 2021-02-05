import { ExistingDirElement } from "../../../../../../build/dist/npm-fs/lib/element/directory/ExistingDirElement.js";
import chai from "chai";
import { describe, it } from "mocha";
import path from "path";

const assert = chai.assert;

const mockExistingDirRelPath = path.resolve("../../../../resources/MockExistingDirectory");
const mockExistingDirAbsPath = "/Users/Main/Projects/snaplib-npm-fs/src/test/resources/MockExistingDirectory";

describe("MockExistingDirectory", function () {
    describe(`creating existing dir element with:\n"${mockExistingDirAbsPath}"`, function ()
    {
        console.log(`\n\n${process.cwd()}\n\n`);
        it("should not throw when constructed", function ()
        {
            assert.doesNotThrow(() => new ExistingDirElement(mockExistingDirAbsPath));
        });
    });
});
