import { ElementStatus } from "../../main/ts/ElementStatus";
import { Element } from "../../main/ts/Element";
import { assert } from 'chai';
import 'mocha';

const CWD: string = process.cwd();
const PKG_JSON_FILE_PATH: string = CWD.concat("/package.json");

describe('new Element("path/to/existing/directory") invalid constructors', () => {

    context("constructor with existing directory path and no true exists status", () => {

        it(`new AbstractElement("${CWD}") throws`, () => {
            assert.throws(() => new Element(CWD),
                `path "${CWD}" already exists`)
        });

        it(`new AbstractElement("${CWD}", {exists: false}) throws`, () => {
            assert.throws(() => new Element(CWD, {exists: false}),
                `path "${CWD}" already exists`)
        });

        it(`new AbstractElement("${CWD}", new ElementStatus(false)) throws`, () => {
            assert.throws(() => new Element(CWD, new ElementStatus(false)),
                `path "${CWD}" already exists`)
        });
    });

    context("constructor with existing directory path and invalid isDirectory property", () => {

        it(`new AbstractElement("${CWD}", {exists: true, isDirectory: false}) throws`, () => {
            assert.throws(() => new Element(CWD, {exists: true, isDirectory: false}),
                `file path of "${CWD}" points to a directory`)
        });

        it(`new AbstractElement("${CWD}", new ElementStatus(true, false)) throws`, () => {
            assert.throws(() => new Element(CWD, new ElementStatus(true, false)),
                `file path of "${CWD}" points to a directory`)
        });
    });

    context("constructor with existing directory path and invalid isFile property", () => {

        it(`new AbstractElement("${CWD}", {exists: true, isDirectory: false}) throws`, () => {
            assert.throws(() => new Element(CWD, {exists: true, isFile: true}),
                `file path of "${CWD}" points to a directory`)
        });

        it(`new AbstractElement("${CWD}", new ElementStatus(true, false, true)) throws`, () => {
            assert.throws(() => new Element(CWD, new ElementStatus(true, false, true)),
                `file path of "${CWD}" points to a directory`)
        });

        it(`new AbstractElement("${CWD}", new ElementStatus(true, undefined, true)) throws`, () => {
            assert.throws(() => new Element(CWD, new ElementStatus(true, undefined, true)),
                `file path of "${CWD}" points to a directory`)
        });

        it(`new AbstractElement("${CWD}", new ElementStatus(true, null, true)) throws`, () => {
            assert.throws(() => new Element(CWD, new ElementStatus(true, null, true)),
                `file path of "${CWD}" points to a directory`)
        });
    });
});
