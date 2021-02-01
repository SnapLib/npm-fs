import {ExistingDirElement} from "../../../../../main/ts/lib/element/directory/ExistingDirElement";
import {assert} from "chai";
import {describe, it} from "mocha";

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
