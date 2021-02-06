import { ExistingDirElement } from "../../../../../../build/dist/npm-fs/lib/element/directory/ExistingDirElement.js";
import ElementType from "../../../../../../build/dist/npm-fs/lib/element/ElementType.js";
import chai from "chai";
import { before, suite, test } from "mocha";
import fs from "fs";
import path from "path";
import url from "url";

const assert = chai.assert;

const fileUrlToPath = url.fileURLToPath;

const __filename = fileUrlToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const __dirinode = fs.lstatSync(__dirname).ino;

const __dirNameShort = __dirname.substring(__dirname.indexOf("src/"), __dirname.length);

const mockExistingDirResourcePath =
    path.resolve(path.join(__dirname, "../../../../resources/MockExistingDirectory"));

const mockExistingDirResourcePathShort =
    mockExistingDirResourcePath.substring(mockExistingDirResourcePath.indexOf("src/"), mockExistingDirResourcePath.length);

let mockExistingDirResourceInode;

let mockExistingDirDirname;
let mockExistingDirMockResource;

before("Test object instantiation first", function TestInitializers()
    {
       suite("ExistingDirElement initialization", function ()
       {
           suite("valid initialization", function ()
           {
               test(`new ExistingDirElement("${__dirname}") should not throw`, function ()
               {
                   assert.doesNotThrow(() => new ExistingDirElement(__dirname));
               });

               test(`new ExistingDirElement("${mockExistingDirResourcePath}") should not throw`, function ()
               {
                   assert.doesNotThrow(() => new ExistingDirElement(mockExistingDirResourcePath));
               });
           });

           suite("invalid initialization", function ()
           {
               test("new ExistingDirElement() should throw", function ()
               {
                   assert.throws(() => new ExistingDirElement());
               });

               test('new ExistingDirElement("") should throw', function ()
               {
                   assert.throws(() => new ExistingDirElement(""));
               });

               test(`new ExistingDirElement("${__filename}") should throw`, function ()
               {
                   assert.throws(() => new ExistingDirElement(""));
               });
           });

           try
           {
               mockExistingDirDirname = new ExistingDirElement(__dirname);
           }
           catch (err)
           {
               // throw new Error("error instantiating new existing directory element");
               throw {name: "ExistingDirElementInstantiationError",
                      message: "error instantiating mock existing dir __dirname element",
                      stack: err.stack};
           }

           try
           {
               mockExistingDirMockResource = new ExistingDirElement(mockExistingDirResourcePath);
           }
           catch (err)
           {
               throw {name: "ExistingDirElementInstantiationError",
                      message: "error instantiating mock existing existing dir resource element",
                      stack: err.stack};
           }

           if (fs.lstatSync(mockExistingDirResourcePath) === undefined)
           {
               throw {name: "MockExistingDirInodeError",
                      message: "error getting inode of existing mock directory resource",
                      stack: this.stack};
           }
           else
           {
               mockExistingDirResourceInode = fs.lstatSync(mockExistingDirResourcePath).ino;
           }
       });
    });

suite("#.elementType", function () {
    test(`<${__dirNameShort}> element type should equal ${ElementType.DIRECTORY}`, function ()
    {
        assert.strictEqual(mockExistingDirDirname.elementType, ElementType.DIRECTORY);
    });

    test(`<${mockExistingDirResourcePathShort}> element type should equal ${ElementType.DIRECTORY}`, function ()
    {
        assert.strictEqual(mockExistingDirDirname.elementType, ElementType.DIRECTORY);
    });
});

suite("#.path", function () {
    test(`path should equal "${__dirname}"`, function ()
    {
        assert.strictEqual(mockExistingDirDirname.path, __dirname);
    });

    test(`path should equal "${mockExistingDirResourcePath}"`, function ()
    {
        assert.strictEqual(mockExistingDirMockResource.path, mockExistingDirResourcePath);
    });
});

suite("#.name", function () {
    test(`should equal "${path.basename(__dirname)}"`, function ()
    {
        assert.strictEqual(mockExistingDirDirname.name, path.basename(__dirname));
    });

    test(`should equal "${path.basename(mockExistingDirResourcePath)}"`, function ()
    {
        assert.strictEqual(mockExistingDirMockResource.name, path.basename(mockExistingDirResourcePath));
    });
});

suite(`#.parent`, function () {
    test(`should equal "${path.dirname(__dirname)}"`, function ()
    {
        assert.strictEqual(mockExistingDirDirname.parent, path.dirname(__dirname));
    });

    test(`should equal "${path.dirname(mockExistingDirResourcePath)}"`, function ()
    {
        assert.strictEqual(mockExistingDirMockResource.parent, path.dirname(mockExistingDirResourcePath));
    });
});

suite("#.inodeSync()", function () {
    test(`should equal ${__dirinode}`, function ()
    {
        assert.strictEqual(mockExistingDirDirname.inodeSync(), __dirinode);
    });

    test(`should equal ${mockExistingDirResourceInode}`, function ()
    {
        assert.strictEqual(mockExistingDirMockResource.inodeSync(), mockExistingDirResourceInode);
    });
});

suite("#.isEmpty()", function () {
    test("should be false", function ()
    {
        assert.isFalse(mockExistingDirDirname.isEmpty());
    });

    test("should be false", function ()
    {
        assert.isFalse(mockExistingDirMockResource.isEmpty());
    });
});
