import { Directory } from "../../main/ts/Directory";
import { assert } from "chai";
import * as path from "path";
import "mocha";

const CWD: string = process.cwd();
const NON_EXISTING_DIR: string = path.join(CWD, "nonExistingDirectory");

describe("valid Directory element instantiation", () => {

    context("valid constructor instantiation", () => {

        it(`new Directory("${CWD}", true) should not throw`, () => {
            assert.doesNotThrow(() => new Directory(CWD, true));
        });

        it(`new Directory("${NON_EXISTING_DIR}", false) should not throw`, () => {
            assert.doesNotThrow(() => new Directory(NON_EXISTING_DIR, false));
        });
    });

    context("valid static instantiation", () => {

        it(`Directory.ofExisting("${CWD}") should not throw`, () => {
            assert.doesNotThrow(() => Directory.ofExisting(CWD));
        });

        it(`Directory.createNew("${NON_EXISTING_DIR}") should not throw`, () => {
            assert.doesNotThrow(() => Directory.createNew(NON_EXISTING_DIR));
        });
    });
});

describe("invalid Directory element instantiation", () => {

    context("invalid constructor instantiation", () => {

        it(`new Directory("${CWD}", false) should throw`, () => {
            assert.throws(() => new Directory(CWD, false));
        });

        it(`new Directory("${NON_EXISTING_DIR}", true) should throw`, () => {
            assert.throws(() => new Directory(NON_EXISTING_DIR, true));
        });
    });

    context("invalid static instantiation", () => {

        it(`Directory.ofExisting("${NON_EXISTING_DIR}") should throw`, () => {
            assert.throws(() => Directory.ofExisting(NON_EXISTING_DIR));
        });

        it(`Directory.createNew("${CWD}") should throw`, () => {
            assert.throws(() => Directory.createNew(CWD));
        });
    });
});

