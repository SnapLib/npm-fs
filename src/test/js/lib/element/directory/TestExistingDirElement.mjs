import { ExistingDirElement } from "../../../../../../build/dist/npm-fs/lib/element/directory/ExistingDirElement.js";
import ElementType from "../../../../../../build/dist/npm-fs/lib/element/ElementType.js";
import chai from "chai";
import { describe, it } from "mocha";
import fs from "fs";
import path from "path";
import url from "url";

const assert = chai.assert;

const fileUrlToPath = url.fileURLToPath;

const __filename = fileUrlToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const __dirinode = fs.lstatSync(__dirname).ino;

// const mockExistingDirRelPath = path.resolve("../../../../resources/MockExistingDirectory");
const mockExistingDirAbsPath = "/Users/Main/Projects/snaplib-npm-fs/src/test/resources/MockExistingDirectory";

describe("ExistingDirElement initialization", function () {
    describe("valid initialization", function ()
    {
        it(`new ExistingDirElement("${mockExistingDirAbsPath}") should not throw`, function ()
        {
            assert.doesNotThrow(() => new ExistingDirElement(mockExistingDirAbsPath));
        });

        it(`new ExistingDirElement("${__dirname}") should not throw`, function ()
        {
            assert.doesNotThrow(() => new ExistingDirElement(__dirname));
        });
    });

    describe("invalid initialization", function ()
    {
        it("new ExistingDirElement() should throw", function ()
        {
            assert.throws(() => new ExistingDirElement());
        });

        it('new ExistingDirElement("") should throw', function ()
        {
            assert.throws(() => new ExistingDirElement(""));
        });

        it(`new ExistingDirElement("${__filename}") should throw`, function ()
        {
            assert.throws(() => new ExistingDirElement(""));
        });
    });
});

describe(`<${__dirname}>.elementType`, function () {
    it(`should equal ${ElementType.DIRECTORY}`, function ()
    {
        assert.strictEqual(new ExistingDirElement(__dirname).elementType, ElementType.DIRECTORY);
    });
});

describe(`<${__dirname}>.path`, function () {
    it(`should equal ${__dirname}`, function ()
    {
        assert.strictEqual(new ExistingDirElement(__dirname).path, __dirname);
    });
});

describe(`<${__dirname}>.name`, function () {
    it(`should equal ${path.basename(__dirname)}`, function ()
    {
        assert.strictEqual(new ExistingDirElement(__dirname).name, path.basename(__dirname));
    });
});

describe(`<${__dirname}>.parent`, function () {
    it(`should equal ${path.dirname(__dirname)}`, function ()
    {
        assert.strictEqual(new ExistingDirElement(__dirname).parent, path.dirname(__dirname));
    });
});

describe(`<${__dirname}>.inodeSync()`, function () {
    it(`should equal ${__dirinode}`, function ()
    {
        assert.strictEqual(new ExistingDirElement(__dirname).inodeSync(), __dirinode);
    });
});

describe(`<${__dirname}>.isEmpty()`, function () {
    it("should be false", function ()
    {
        assert.isFalse(new ExistingDirElement(__dirname).isEmpty());
    });
});
