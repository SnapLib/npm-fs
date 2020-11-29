import { ElementStatus } from "../../main/ts/ElementStatus";
import { assert } from 'chai';
import 'mocha';

describe("new ElementStatus(...) valid constructors", () => {

    context("single boolean argument constructor", () => {

        it("new ElementStatus(true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true),
                "new ElementStatus(true) threw error")
        });

        it("new ElementStatus(false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false),
                "new ElementStatus(false) threw error")
        });
    });

    context("double argument constructor with set directory property", () => {

        it("new ElementStatus(true, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true),
                "new ElementStatus(true, true) threw error")
        });

        it("new ElementStatus(true, false) should not throw when constructed", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false),
                "new ElementStatus(true, false) threw error")
        });

        it("new ElementStatus(false, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true),
                "new ElementStatus(false, true) threw error")
        });

        it("new ElementStatus(false, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false),
                "new ElementStatus(false, false) threw error")
        });
    });

    context("double argument constructor with unset directory property", () => {

        it("new ElementStatus(true, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined),
                "new ElementStatus(true, undefined) threw error")
        });

        it("new ElementStatus(true, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null),
                "new ElementStatus(true, null) threw error")
        });

        it("new ElementStatus(false, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined),
                "new ElementStatus(false, undefined) threw error")
        });

        it("new ElementStatus(false, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null),
                "new ElementStatus(false, null) threw error")
        });
    });

    context("triple argument constructor with set directory and file property", () => {

        it("new ElementStatus(true, true, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true, false),
                "new ElementStatus(true, true, false) threw error")
        });

        it("new ElementStatus(true, false, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false, true),
                "new ElementStatus(true, false, true) threw error")
        });

        it("new ElementStatus(false, true, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, false),
                "new ElementStatus(false, true, false) threw error")
        });

        it("new ElementStatus(false, false, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false, true),
                "new ElementStatus(false, false, true) threw error")
        });
    });

    context("triple argument constructor with unset directory property", () => {

        it("new ElementStatus(true, undefined, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, true),
                "new ElementStatus(true, undefined, true) threw error")
        });

        it("new ElementStatus(true, undefined, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, false),
                "new ElementStatus(true, undefined, false) threw error")
        });

        it("new ElementStatus(true, null, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, true),
                "new ElementStatus(true, null, true) threw error")
        });

        it("new ElementStatus(true, null, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, false),
                "new ElementStatus(true, null, false) threw error")
        });

        it("new ElementStatus(false, undefined, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, true),
                "new ElementStatus(false, undefined, true) threw error")
        });

        it("new ElementStatus(false, undefined, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, false),
                "new ElementStatus(false, undefined, false) threw error")
        });

        it("new ElementStatus(false, null, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, true),
                "new ElementStatus(false, null, true) threw error")
        });

        it("new ElementStatus(false, null, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, false),
                "new ElementStatus(false, null, false) threw error")
        });
    });

    context("triple argument constructor with unset file property", () => {

        it("new ElementStatus(true, true, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true, undefined),
                "new ElementStatus(true, true, undefined) threw error")
        });

        it("new ElementStatus(true, false, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false, undefined),
                "new ElementStatus(true, false, undefined) threw error")
        });

        it("new ElementStatus(true, true, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true, null),
                "new ElementStatus(true, true, null) threw error")
        });

        it("new ElementStatus(true, false, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false, null),
                "new ElementStatus(true, false, null) threw error")
        });

        it("new ElementStatus(false, true, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, undefined),
                "new ElementStatus(false, true, undefined) threw error")
        });

        it("new ElementStatus(false, false, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false, undefined),
                "new ElementStatus(false, false, undefined) threw error")
        });

        it("new ElementStatus(false, true, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, null),
                "new ElementStatus(false, true, null) threw error")
        });

        it("new ElementStatus(false, false, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false, null),
                "new ElementStatus(false, false, null) threw error")
        });
    });

    context("triple argument constructor with unset directory and file property", () => {

        it("new ElementStatus(true, undefined, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, undefined),
                "new ElementStatus(true, undefined, undefined) threw error")
        });

        it("new ElementStatus(true, null, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, null),
                "new ElementStatus(true, null, null) threw error")
        });

        it("new ElementStatus(true, undefined, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, null),
                "new ElementStatus(true, undefined, null) threw error")
        });

        it("new ElementStatus(true, null, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, undefined),
                "new ElementStatus(true, null, undefined) threw error")
        });

        it("new ElementStatus(false, undefined, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, undefined),
                "new ElementStatus(false, undefined, undefined) threw error")
        });

        it("new ElementStatus(false, null, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, null),
                "new ElementStatus(false, null, null) threw error")
        });

        it("new ElementStatus(false, undefined, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, null),
                "new ElementStatus(false, undefined, null) threw error")
        });

        it("new ElementStatus(false, null, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, undefined),
                "new ElementStatus(false, null, undefined) threw error")
        });
    });
});

describe("new ElementStatus(...) invalid constructors", () => {

    context("single unset argument constructor", () => {

        it("new ElementStatus(undefined) should throw", () => {
            assert.throws(() => new ElementStatus(undefined),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(null) should throw", () => {
            assert.throws(() => new ElementStatus(null),
                "exists element property can't be null")
        });
    });

    context("double argument constructor with unset exists property", () => {

        it("new ElementStatus(undefined, true) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, true),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(undefined, false) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, false),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(null, true) should throw", () => {
            assert.throws(() => new ElementStatus(null, true),
                "exists element property can't be null")
        });

        it("new ElementStatus(null, false) should throw", () => {
            assert.throws(() => new ElementStatus(null, false),
                "exists element property can't be null")
        });

        it("new ElementStatus(undefined, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, undefined),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(undefined, null) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, null),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(null, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(null, undefined),
                "exists element property can't be null")
        });

        it("new ElementStatus(null, null) should throw", () => {
            assert.throws(() => new ElementStatus(null, null),
                "exists element property can't be null")
        });
    });

    context("triple argument constructor with equal directory and file properties", () => {

        it("new ElementStatus(true, true, true) should throw", () => {
            assert.throws(() => new ElementStatus(true, true, true),
                "directory and file property status of true")
        });

        it("new ElementStatus(true, false, false) should throw", () => {
            assert.throws(() => new ElementStatus(true, false, false),
                "directory and file property status of false")
        });

        it("new ElementStatus(false, true, true) should throw", () => {
            assert.throws(() => new ElementStatus(false, true, true),
                "directory and file property status of true")
        });

        it("new ElementStatus(false, false, false) should throw", () => {
            assert.throws(() => new ElementStatus(false, false, false),
                "directory and file property status of false")
        });
    });
});
