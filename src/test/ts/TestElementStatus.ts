import { ElementStatus } from "../../main/ts/ElementStatus";
import { assert } from 'chai';
import 'mocha';

describe("new ElementStatus(...) valid constructors", () => {

    context("valid single boolean argument constructors", () => {

        it("new ElementStatus(true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true))
        });

        it("new ElementStatus(false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false))
        });
    });

    context("valid double argument constructors with set directory property", () => {

        it("new ElementStatus(true, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true))
        });

        it("new ElementStatus(true, false) should not throw when constructed", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false))
        });

        it("new ElementStatus(false, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true))
        });

        it("new ElementStatus(false, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false))
        });
    });

    context("valid double argument constructors with unset directory property", () => {

        it("new ElementStatus(true, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined))
        });

        it("new ElementStatus(true, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null))
        });

        it("new ElementStatus(false, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined))
        });

        it("new ElementStatus(false, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null))
        });
    });

    context("valid triple argument constructors with set directory and file property", () => {

        it("new ElementStatus(true, true, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true, false))
        });

        it("new ElementStatus(true, false, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false, true))
        });

        it("new ElementStatus(false, true, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, false))
        });

        it("new ElementStatus(false, false, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false, true))
        });
    });

    context("valid triple argument constructors with unset directory property", () => {

        it("new ElementStatus(true, undefined, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, true))
        });

        it("new ElementStatus(true, undefined, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, false))
        });

        it("new ElementStatus(true, null, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, true))
        });

        it("new ElementStatus(true, null, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, false))
        });

        it("new ElementStatus(false, undefined, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, true))
        });

        it("new ElementStatus(false, undefined, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, false))
        });

        it("new ElementStatus(false, null, true) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, true))
        });

        it("new ElementStatus(false, null, false) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, false))
        });
    });

    context("valid triple argument constructors with unset file property", () => {

        it("new ElementStatus(true, true, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true, undefined))
        });

        it("new ElementStatus(true, false, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false, undefined))
        });

        it("new ElementStatus(true, true, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true, null))
        });

        it("new ElementStatus(true, false, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false, null))
        });

        it("new ElementStatus(false, true, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, undefined))
        });

        it("new ElementStatus(false, false, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false, undefined))
        });

        it("new ElementStatus(false, true, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, null))
        });

        it("new ElementStatus(false, false, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false, null))
        });
    });

    context("valid triple argument constructors with unset directory and file property", () => {

        it("new ElementStatus(true, undefined, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, undefined))
        });

        it("new ElementStatus(true, null, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, null))
        });

        it("new ElementStatus(true, undefined, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, null))
        });

        it("new ElementStatus(true, null, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, undefined))
        });

        it("new ElementStatus(false, undefined, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, undefined))
        });

        it("new ElementStatus(false, null, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, null))
        });

        it("new ElementStatus(false, undefined, null) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, null))
        });

        it("new ElementStatus(false, null, undefined) should not throw", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, undefined))
        });
    });
});

describe("new ElementStatus(...) invalid constructors", () => {

    context("invalid single unset argument constructors", () => {

        it("new ElementStatus(undefined) should throw", () => {
            assert.throws(() => new ElementStatus(undefined),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(null) should throw", () => {
            assert.throws(() => new ElementStatus(null),
                "exists element property can't be null")
        });
    });

    context("invalid double argument constructors with unset exists property", () => {

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

    context("invalid triple argument constructors with unset exists property", () => {

        it("new ElementStatus(undefined, true, false) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, true, false),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(undefined, true, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, true, undefined),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(undefined, true, null) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, true, null),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(undefined, false, true) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, false, true),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(undefined, false, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, false, undefined),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(undefined, false, null) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, false, null),
                "exists element property can't be undefined")
        });

        it("new ElementStatus(null, true, false) should throw", () => {
            assert.throws(() => new ElementStatus(null, true, false),
                "exists element property can't be null")
        });

        it("new ElementStatus(null, true, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(null, true, undefined),
                "exists element property can't be null")
        });

        it("new ElementStatus(null, true, null) should throw", () => {
            assert.throws(() => new ElementStatus(null, true, null),
                "exists element property can't be null")
        });

        it("new ElementStatus(null, false, true) should throw", () => {
            assert.throws(() => new ElementStatus(null, false, true),
                "exists element property can't be null")
        });

        it("new ElementStatus(null, false, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(null, false, undefined),
                "exists element property can't be null")
        });

        it("new ElementStatus(null, false, null) should throw", () => {
            assert.throws(() => new ElementStatus(null, false, null),
                "exists element property can't be null")
        });
    });

    context("invalid triple argument constructors with all properties unset", () => {

       it("new ElementStatus(undefined, undefined, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, undefined, undefined),
                "exists element property can't be undefined")
        });

       it("new ElementStatus(undefined, undefined, null) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, undefined, null),
                "exists element property can't be undefined")
        });

       it("new ElementStatus(undefined, null, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, null, undefined),
                "exists element property can't be undefined")
        });

       it("new ElementStatus(undefined, null, null) should throw", () => {
            assert.throws(() => new ElementStatus(undefined, null, null),
                "exists element property can't be undefined")
        });

       it("new ElementStatus(null, null, null) should throw", () => {
            assert.throws(() => new ElementStatus(null, null, null),
                "exists element property can't be null")
        });

       it("new ElementStatus(null, null, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(null, null, undefined),
                "exists element property can't be null")
        });

       it("new ElementStatus(null, undefined, null) should throw", () => {
            assert.throws(() => new ElementStatus(null, undefined, null),
                "exists element property can't be null")
        });

       it("new ElementStatus(null, undefined, undefined) should throw", () => {
            assert.throws(() => new ElementStatus(null, undefined, undefined),
                "exists element property can't be null")
        });
    });

    context("invalid triple argument constructors with equal directory and file\nproperties", () => {

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

describe("Properties defaults correctly", () => {
    context("isDirectory is true when only exist property is set", () => {

        it("isDirectory is true when only exists property is set to true", () => {
            assert.isTrue(new ElementStatus(true).isDirectory, "isDirectory did not default to true when only exists property is set to true")
        });

        it("isDirectory is true when only exists property is set to false", () => {
            assert.isTrue(new ElementStatus(false).isDirectory, "isDirectory did not default to true when only exists property is set to false")
        });
    });

    context("isFile is false when only exist property is set", () => {

        it("isFile is false when only exists property is set to true", () => {
            assert.isFalse(new ElementStatus(true).isFile, "isFile did not default to false when only exists property is set to true")
        });

        it("isFile is false when only exists property is set to false", () => {
            assert.isFalse(new ElementStatus(false).isFile, "isFile did not default to false when only exists property is set to false")
        });
    });
});
