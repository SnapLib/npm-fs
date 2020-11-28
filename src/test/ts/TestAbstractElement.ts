import { AbstractElement } from "../../main/ts/AbstractElement";
import { assert } from 'chai';
import 'mocha';

const CWD: string = process.cwd();

const MOCK_ABSTRACT_ELEMENT: AbstractElement = new AbstractElement(CWD);

describe('new AbstractElement("path/to/existing/directory") valid constructors', () => {

    context('no element status properties properly set', () => {
        it(`should not throw exception with new AbstractElement("${CWD}")`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD),
                `new AbstractElement("${CWD}") threw exception`)
        });
    });

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

    context('double element status properties properly set', () => {
        it(`should not throw exception with new AbstractElement("${CWD}", {exists: true, isDirectory: true})`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD, {exists: true, isDirectory: true}),
                `new AbstractElement("${CWD}", {exists: true, isDirectory: true}) threw exception`)
        });

        it(`should not throw exception with new AbstractElement("${CWD}", {exists: true, isFile: false})`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD, {exists: true, isFile: false}),
                `new AbstractElement("${CWD}", {exists: true, isDirectory: true}) threw exception`)
        });

        it(`should not throw exception with new AbstractElement("${CWD}", {isDirectory: true, isFile: false})`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD, {isDirectory: true, isFile: false}),
                `new AbstractElement("${CWD}", {isDirectory: true, isFile: false}) threw exception`)
        });
    });

    context('triple element status properties properly set', () => {
        it(`should not throw exception with new AbstractElement("${CWD}", {exists: true, isDirectory: true, isFile: false})`, () => {
            assert.doesNotThrow(() => new AbstractElement(CWD, {exists: true, isDirectory: true, isFile: false}),
                `new AbstractElement("${CWD}", {exists: true, isDirectory: true, isFile: false}) threw exception`)
        });
    });
});

describe("unimplemented getContents() and size()", () => {
    it('should throw MissingMethodImplementationError', () => {
        assert.throws(() => MOCK_ABSTRACT_ELEMENT.getContents(),
            "missing getContents() method implementation")
    });

    it('should throw MissingMethodImplementationError', () => {
        assert.throws(() => MOCK_ABSTRACT_ELEMENT.size(),
            "missing size() method implementation")
    });
})
