import { scanDirTree, scanDirTreeUrl } from "../../../../main/ts/lib/util/dirTreeScanner";
import { assert } from "chai";
import { suite, test } from "mocha";
import { basename } from "path";

suite("TestDirTreeScanner", function TestDirTreeScanner()
{
    suite("scanDirTree(__dirname).for.file(basename(__filename) === __dirname)", function TestElementType()
    {
        test(`scanDirTree("${__dirname}").for.file("${basename(__filename)}") === "${__dirname}"`, function ()
        {
            assert.strictEqual(scanDirTree(__dirname).for.file(basename(__filename)), __dirname);
        });
    });
});
