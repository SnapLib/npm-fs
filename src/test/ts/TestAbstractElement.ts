import { AbstractElement } from "../../main/ts/AbstractElement";
import { assert } from 'chai';
import 'mocha';

const CWD: string = process.cwd();

describe('new AbstractElement("path/to/existing/directory") valid constructors', () => {

    context('single element status properties properly set', () => {
        it(`should not throw exception with new AbstractElement("${CWD}", {exists: true})`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD, {exists: true}),
                `new AbstractElement("${CWD}", {exists: true}) threw exception`)
        });

        it(`should not throw exception with new AbstractElement("${CWD}", {isDirectory: true})`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD, {isDirectory: true}),
                `new AbstractElement("${CWD}", {isDirectory: true}) threw exception`)
        });

        it(`should not throw exception with new AbstractElement("${CWD}", {isFile: false})`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD, {isFile: false}),
                `new AbstractElement("${CWD}", {isFile: false}) threw exception`)
        });
    });
});
