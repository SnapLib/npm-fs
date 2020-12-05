import { Directory } from "../../main/ts/Directory";
import { assert } from "chai";
import "mocha";

const CWD: string = process.cwd();

describe("Directory element of current working directory", () => {

    context("TEST", () => {

        it("should not throw when instantiated with path that points to existing directory and exists is true", () => {
            assert.doesNotThrow(() => new Directory(CWD, true),
                       `new Directory("${CWD}") threw error`);
        });

        it("should not throw when statically instantiated with path that points to existing directory and exists is true", () => {
            assert.doesNotThrow(() => Directory.ofExisting(CWD),
                       `Directory.ofExisting("${CWD}") threw error`);
        });
    });
});

