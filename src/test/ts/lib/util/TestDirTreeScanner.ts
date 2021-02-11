import { scanDirTree, scanDirTreeUrl } from "../../../../main/ts/lib/util/dirTreeScanner";
import { assert } from "chai";
import { suite, test } from "mocha";
import { basename, dirname } from "path";

suite("TestDirTreeScanner", function TestDirTreeScanner()
{
    suite("scanDirTree(<directoryname>).for.file(<filename>)", function TestScanDirTreeForFile()
    {
        test(`scanDirTree("${__dirname}").for.file("${basename(__filename)}") === "${__dirname}"`, function ()
        {
            assert.strictEqual(scanDirTree(__dirname).for.file(basename(__filename)), __dirname);
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
