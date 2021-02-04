import { ExistingDirElement } from "../../../../../../build/dist/npm-fs/lib/element/directory/ExistingDirElement.js";
import chai from "chai";
import { describe, it } from "mocha";

const assert = chai.assert;

const mockExistingDirPath = "../../../../resources/MockExistingDirectory";

describe("MockExistingDirectory", function () {
    describe(`creating existing dir element with: ${mockExistingDirPath}`, function ()
    {
        it("should not throw when constructed", function ()
        {
            assert.doesNotThrow(() => new ExistingDirElement(mockExistingDirPath));
        });
    });
});
