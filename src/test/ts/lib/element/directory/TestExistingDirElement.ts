import { ExistingDirElement } from "../../../../../main/ts/lib/element/directory/ExistingDirElement";
import { assert } from "chai";
import { before, suite, test } from "mocha";
import fs from "fs";
import path from "path";

const dirNameDirents = Object.freeze(fs.readdirSync(__dirname, {withFileTypes: true}));

const __dirInode = fs.lstatSync(__dirname).ino;

const __dirNameShort = __dirname.substring(__dirname.indexOf("src/"), __dirname.length);

const mockExistingDirResourcePath =
    path.resolve(path.join(__dirname, "../../../../resources/MockExistingDirectory"));

const mockDirResourceDirents =
    Object.freeze(fs.readdirSync(mockExistingDirResourcePath, {withFileTypes: true}));

const mockExistingDirResourcePathShort =
    mockExistingDirResourcePath.substring(mockExistingDirResourcePath.indexOf("src/"), mockExistingDirResourcePath.length);

const mockExistingDirResourceInode = fs.lstatSync(mockExistingDirResourcePath).ino;

let mockExistingDirDirname;

let mockExistingDirMockResource;

suite("TestExistingDirElement", function TestExistingDirElement()
{
    before("Test object instantiation first", function TestInitializersFirst()
    {
        suite("ExistingDirElement initialization", function TestExistingDirElementInitializers()
        {
            suite("valid initialization", function ValidInitializers()
            {
                test(`new ExistingDirElement("${__dirname}") should not throw`, function DirNameArgConstructor()
                {
                    assert.doesNotThrow(() => new ExistingDirElement(__dirname));
                });

                test(`new ExistingDirElement("${mockExistingDirResourcePath}") should not throw`, function ResourceDirPathConstructor()
                {
                    assert.doesNotThrow(() => new ExistingDirElement(mockExistingDirResourcePath));
                });
            });

            suite("invalid initialization", function InvalidInitializers()
            {
                test('new ExistingDirElement("") should throw', function EmptyArgConstructor()
                {
                    assert.throws(() => new ExistingDirElement(""));
                });

                test(`new ExistingDirElement("${__filename}") should throw`, function ExistingFilePathArgConstructor()
                {
                    assert.throws(() => new ExistingDirElement(__filename));
                });
            });

            try
            {
                mockExistingDirDirname = Object.freeze(new ExistingDirElement(__dirname));
            }
            catch (err)
            {
                // throw new Error("error instantiating new existing directory element");
                throw {
                    name: "ExistingDirElementInstantiationError",
                    message: "error instantiating mock existing dir __dirname element",
                    stack: err.stack
                };
            }

            try
            {
                mockExistingDirMockResource = Object.freeze(new ExistingDirElement(mockExistingDirResourcePath));
            }
            catch (err)
            {
                throw {
                    name: "ExistingDirElementInstantiationError",
                    message: "error instantiating mock existing existing dir resource element",
                    stack: err.stack
                };
            }
        });
    });

    suite("#elementType", function TestElementType()
    {
        test(`<${__dirNameShort}> element type should equal "DIRECTORY"`, function ()
        {
            assert.strictEqual(mockExistingDirDirname.elementType, "DIRECTORY");
        });

        test(`<${mockExistingDirResourcePathShort}> element type should equal "DIRECTORY"`, function ()
        {
            assert.strictEqual(mockExistingDirDirname.elementType, "DIRECTORY");
        });
    });

    suite("#path", function TestPath()
    {
        test(`path should equal "${__dirname}"`, function ()
        {
            assert.strictEqual(mockExistingDirDirname.path, __dirname);
        });

        test(`path should equal "${mockExistingDirResourcePath}"`, function ()
        {
            assert.strictEqual(mockExistingDirMockResource.path, mockExistingDirResourcePath);
        });
    });

    suite("#name", function TestName()
    {
        test(`should equal "${path.basename(__dirname)}"`, function ()
        {
            assert.strictEqual(mockExistingDirDirname.name, path.basename(__dirname));
        });

        test(`should equal "${path.basename(mockExistingDirResourcePath)}"`, function ()
        {
            assert.strictEqual(mockExistingDirMockResource.name, path.basename(mockExistingDirResourcePath));
        });
    });

    suite(`#parent`, function TestParent()
    {
        test(`should equal "${path.dirname(__dirname)}"`, function ()
        {
            assert.strictEqual(mockExistingDirDirname.parent, path.dirname(__dirname));
        });

        test(`should equal "${path.dirname(mockExistingDirResourcePath)}"`, function ()
        {
            assert.strictEqual(mockExistingDirMockResource.parent, path.dirname(mockExistingDirResourcePath));
        });
    });

    suite("#inodeSync()", function TestInodeSync()
    {
        test(`should equal ${__dirInode}`, function ()
        {
            assert.strictEqual(mockExistingDirDirname.inodeSync(), __dirInode);
        });

        test(`should equal ${mockExistingDirResourceInode}`, function ()
        {
            assert.strictEqual(mockExistingDirMockResource.inodeSync(), mockExistingDirResourceInode);
        });
    });

    suite("#direntSync()", function TestDirentSync()
    {
        suite("#dirents", function TestDirentDirents()
        {
            test(`should equal ${dirNameDirents}`, function ()
            {
                assert.deepStrictEqual(mockExistingDirDirname.direntSync().dirents, dirNameDirents);
            });

            test(`should equal ${mockDirResourceDirents}`, function ()
            {
                assert.deepStrictEqual(mockExistingDirMockResource.direntSync().dirents, mockDirResourceDirents);
            });
        });

        suite("#names", function TestDirentNames()
        {
            const dirNameDirentNames =
                Object.freeze(dirNameDirents.map(dirent => dirent.name));

            const mockDirResourceDirentNames =
                Object.freeze(mockDirResourceDirents.map(dirent => dirent.name));

            test(`should equal ["${dirNameDirentNames.join('", "')}"]`, function ()
            {
                assert.deepStrictEqual(mockExistingDirDirname.direntSync().names, dirNameDirentNames);
            });

            test(`should equal ["${mockDirResourceDirentNames.join('", "')}"]`, function ()
            {
                assert.deepStrictEqual(mockExistingDirMockResource.direntSync().names, mockDirResourceDirentNames);
            });
        });

        suite("#paths", function TestDirentPaths()
        {
            const dirNameDirentPaths =
                Object.freeze(dirNameDirents.map(dirent => path.join(__dirname, dirent.name)));

            const mockDirResourceDirentPaths =
                Object.freeze(mockDirResourceDirents.map(dirent => path.join(mockExistingDirResourcePath, dirent.name)));

            test(`should equal ["${dirNameDirentPaths.join('", "')}"]`, function ()
            {
                assert.deepStrictEqual(mockExistingDirDirname.direntSync().paths, dirNameDirentPaths);
            });

            test(`should equal ["${mockDirResourceDirentPaths.join('", "')}"]`, function ()
            {
                assert.deepStrictEqual(mockExistingDirMockResource.direntSync().paths, mockDirResourceDirentPaths);
            });
        });

        suite("#count", function TestDirentCount()
        {
            test(`should equal ${dirNameDirents.length}`, function ()
            {
                assert.strictEqual(mockExistingDirDirname.direntSync().count, dirNameDirents.length);
            });

            test(`should equal ${mockDirResourceDirents.length}`, function ()
            {
                assert.strictEqual(mockExistingDirMockResource.direntSync().count, mockDirResourceDirents.length);
            });
        });
    });

    suite("#length()", function TestLength()
    {
        test(`non recursive should equal ${dirNameDirents.length}`, function ()
        {
            assert.strictEqual(mockExistingDirDirname.length(), dirNameDirents.length);
        });

        test(`non recursive should equal ${mockDirResourceDirents.length}`, function ()
        {
            assert.strictEqual(mockExistingDirMockResource.length(), mockDirResourceDirents.length);
        });
    });

    suite("#isEmpty()", function TestIsEmpty()
    {
        test("should be false", function ()
        {
            assert.isFalse(mockExistingDirDirname.isEmpty());
        });

        test("should be false", function ()
        {
            assert.isFalse(mockExistingDirMockResource.isEmpty());
        });
    });
});
