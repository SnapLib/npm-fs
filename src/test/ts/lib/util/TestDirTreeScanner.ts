import { scanDirTree, scanDirTreeUrl } from "../../../../main/ts/lib/util/dirTreeScanner";
import { assert } from "chai";
import { suite, test } from "mocha";
import { basename, dirname, join, resolve } from "path";

const pkgRootPath = resolve(join(__dirname, "../../../../../"));

suite("TestDirTreeScanner", function TestDirTreeScanner()
{
    suite("Test scan dir for illegal argument errors", function TestScanDirTreeError()
    {
        test(`scanDirTree("").for.file("package.json") throws`, function ()
        {
            assert.throws(() => scanDirTree("").for.file("package.json"));
        });

        test(`scanDirTree(__filename).for.directory("package.json") throws`, function ()
        {
            assert.throws(() => scanDirTree(__filename).for.directory("package.json"));
        });

    });

    suite("scanDirTree(<directoryname>).for.file(<filename>)", function TestScanDirTreeForFile()
    {
        test(`scanDirTree("${__dirname}").for.file("${basename(__filename)}") === "${__dirname}"`, function ()
        {
            assert.strictEqual(scanDirTree(__dirname).for.file(basename(__filename)), __dirname);
        });

        test(`scanDirTree("${__dirname}").for.file("package.json") === "${pkgRootPath}"`, function ()
        {
            assert.strictEqual(scanDirTree(__dirname).for.file("package.json"), pkgRootPath);
        });
    });

    suite("scanDirTree(<directoryname>).for.directory(<directoryname>)", function TestScanDirTreeForDirectory()
    {
        test(`scanDirTree("${__dirname}").for.directory("${basename(__dirname)}") === "${dirname(__dirname)}"`, function ()
        {
            assert.strictEqual(scanDirTree(__dirname).for.directory(basename(__dirname)), dirname(__dirname));
        });
    });
});
