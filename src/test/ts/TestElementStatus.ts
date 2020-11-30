import { ElementStatus } from "../../main/ts/ElementStatus";
import { assert } from 'chai';
import 'mocha';

describe("new ElementStatus(...) valid constructors", () => {

    context("valid single argument constructors", () => {

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

        it("new ElementStatus(true, false) should not throw", () => {
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

    context("invalid triple argument constructors with equally set directory and file\nproperties", () => {

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

describe("exists property gets set correctly", () => {
    it("new ElementStatus(true).exists returns true", () => {
        assert.isTrue(new ElementStatus(true).exists,
            "new ElementStatus(true).exists did not return true")
    });

    it("new ElementStatus(false).exists returns false", () => {
        assert.isFalse(new ElementStatus(false).exists,
            "new ElementStatus(false).exists did not return false")
    });
});

describe("isDirectory defaults correctly", () => {

    context("isDirectory is true when only exist property is set", () => {

        it("new ElementStatus(true).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true).isDirectory,
                "new ElementStatus(true).isDirectory did not return true")
        });

        it("new ElementStatus(false).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false).isDirectory,
                "new ElementStatus(false).isDirectory did not return true")
        });
    });

    context("isDirectory is true when its value is explicitly unset", () => {

        it("new ElementStatus(true, undefined).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, undefined).isDirectory,
                "new ElementStatus(true, undefined).isDirectory did not return true")
        });

        it("new ElementStatus(true, null).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, null).isDirectory,
                "new ElementStatus(true, null).isDirectory did not return true")
        });

        it("new ElementStatus(false, undefined).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, undefined).isDirectory,
                "new ElementStatus(false, undefined).isDirectory did not return true")
        });

        it("new ElementStatus(false, null).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, null).isDirectory,
                "new ElementStatus(false, null).isDirectory did not return true")
        });
    });

    context("isDirectory is true when isFile is false", () => {

        it("new ElementStatus(true, true, false).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, true, false).isDirectory,
                "new ElementStatus(true, true, false).isDirectory did not return true")
        });

        it("new ElementStatus(true, undefined, false).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, undefined, false).isDirectory,
                "new ElementStatus(true, undefined, false).isDirectory did not return true")
        });

        it("new ElementStatus(true, null, false).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, null, false).isDirectory,
                "new ElementStatus(true, null, false).isDirectory did not return true")
        });

        it("new ElementStatus(false, true, false).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, true, false).isDirectory,
                "new ElementStatus(false, true, false).isDirectory did not return true")
        });

        it("new ElementStatus(false, undefined, false).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, undefined, false).isDirectory,
                "new ElementStatus(false, undefined, false).isDirectory did not return true")
        });

        it("new ElementStatus(false, null, false).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, null, false).isDirectory,
                "new ElementStatus(false, null, false).isDirectory did not return true")
        });
    });

    context("isDirectory is true when isDirectory and isFile is explicitly unset", () => {

        it("new ElementStatus(true, undefined, undefined).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, undefined, undefined).isDirectory,
                "new ElementStatus(true, undefined, undefined).isDirectory did not return true")
        });

        it("new ElementStatus(true, null, null).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, null, null).isDirectory,
                "new ElementStatus(true, null, null).isDirectory did not return true")
        });

        it("new ElementStatus(true, undefined, null).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, undefined, null).isDirectory,
                "new ElementStatus(true, undefined, null).isDirectory did not return true")
        });

        it("new ElementStatus(true, null, undefined).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(true, null, undefined).isDirectory,
                "new ElementStatus(true, null, undefined).isDirectory did not return true")
        });

        it("new ElementStatus(false, undefined, undefined).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, undefined, undefined).isDirectory,
                "new ElementStatus(false, undefined, undefined).isDirectory did not return true")
        });

        it("new ElementStatus(false, null, null).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, null, null).isDirectory,
                "new ElementStatus(false, null, null).isDirectory did not return true")
        });

        it("new ElementStatus(false, undefined, null).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, undefined, null).isDirectory,
                "new ElementStatus(false, undefined, null).isDirectory did not return true")
        });

        it("new ElementStatus(false, null, undefined).isDirectory returns true", () => {
            assert.isTrue(new ElementStatus(false, null, undefined).isDirectory,
                "new ElementStatus(false, null, undefined).isDirectory did not return true")
        });
    });

    context("isDirectory is false when isFile is true", () => {

        it("new ElementStatus(true, false, true).isDirectory returns false", () => {
            assert.isFalse(new ElementStatus(true, false, true).isDirectory,
                "new ElementStatus(true, false, true).isDirectory did not return false")
        });

        it("new ElementStatus(true, undefined, true).isDirectory returns false", () => {
            assert.isFalse(new ElementStatus(true, undefined, true).isDirectory,
                "new ElementStatus(true, undefined, true).isDirectory did not return false")
        });

        it("new ElementStatus(true, null, true).isDirectory returns false", () => {
            assert.isFalse(new ElementStatus(true, null, true).isDirectory,
                "new ElementStatus(true, null, true).isDirectory did not return false")
        });

        it("new ElementStatus(false, false, true).isDirectory returns false", () => {
            assert.isFalse(new ElementStatus(false, false, true).isDirectory,
                "new ElementStatus(false, false, true).isDirectory did not return false")
        });

        it("new ElementStatus(false, undefined, true).isDirectory returns false", () => {
            assert.isFalse(new ElementStatus(false, undefined, true).isDirectory,
                "new ElementStatus(false, undefined, true).isDirectory did not return false")
        });

        it("new ElementStatus(false, null, true).isDirectory returns false", () => {
            assert.isFalse(new ElementStatus(false, null, true).isDirectory,
                "new ElementStatus(false, null, true).isDirectory did not return false")
        });
    });
});

describe("isFile defaults correctly", () => {

    context("isFile is false when only exist property is set", () => {

        it("new ElementStatus(true).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true).isFile,
                "new ElementStatus(true).isFile did not return false")
        });

        it("new ElementStatus(false).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false).isFile,
                "new ElementStatus(false).isFile did not return false")
        });
    });

    context("isFile is false when isDirectory property is set to true", () => {

        it("new ElementStatus(true, true).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true, true).isFile,
                "new ElementStatus(true, true).isFile did not return false")
        });

        it("new ElementStatus(false, true).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false, true).isFile,
                "new ElementStatus(false, true).isFile did not return false")
        });
    });

    context("isFile is false when isDirectory property is explicitly unset", () => {

        it("new ElementStatus(true, undefined).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true, undefined).isFile,
                "new ElementStatus(true, undefined).isFile did not return false")
        });

        it("new ElementStatus(true, null).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true, null).isFile,
                "new ElementStatus(true, null).isFile did not return false")
        });

        it("new ElementStatus(false, undefined).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false, undefined).isFile,
                "new ElementStatus(false, undefined).isFile did not return false")
        });

        it("new ElementStatus(false, null).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false, null).isFile,
                "new ElementStatus(false, null).isFile did not return false")
        });
    });

    context("isFile is false when isDirectory and isFile property is explicitly unset", () => {

        it("new ElementStatus(true, undefined, undefined).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true, undefined, undefined).isFile,
                "new ElementStatus(true, undefined, undefined).isFile did not return false")
        });

        it("new ElementStatus(true, null, null).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true, null, null).isFile,
                "new ElementStatus(true, null, null).isFile did not return false")
        });

        it("new ElementStatus(true, undefined, null).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true, undefined, null).isFile,
                "new ElementStatus(true, undefined, null).isFile did not return false")
        });

        it("new ElementStatus(true, null, undefined).isFile returns false", () => {
            assert.isFalse(new ElementStatus(true, null, undefined).isFile,
                "new ElementStatus(true, null, undefined).isFile did not return false")
        });

        it("new ElementStatus(false, undefined, undefined).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false, undefined, undefined).isFile,
                "new ElementStatus(false, undefined, undefined).isFile did not return false")
        });

        it("new ElementStatus(false, null, null).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false, null, null).isFile,
                "new ElementStatus(false, null, null).isFile did not return false")
        });

        it("new ElementStatus(false, undefined, null).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false, undefined, null).isFile,
                "new ElementStatus(false, undefined, null).isFile did not return false")
        });

        it("new ElementStatus(false, null, undefined).isFile returns false", () => {
            assert.isFalse(new ElementStatus(false, null, undefined).isFile,
                "new ElementStatus(false, null, undefined).isFile did not return false")
        });
    });

    context("isFile is true when isDirectory property is set to false", () => {

        it("new ElementStatus(true, false).isFile returns true", () => {
            assert.isTrue(new ElementStatus(true, false).isFile,
                "new ElementStatus(true, false).isFile did not return true")
        });

        it("new ElementStatus(true, false, true).isFile returns true", () => {
            assert.isTrue(new ElementStatus(true, false, true).isFile,
                "new ElementStatus(true, false, true).isFile did not return true")
        });

        it("new ElementStatus(true, false, undefined).isFile returns true", () => {
            assert.isTrue(new ElementStatus(true, false, undefined).isFile,
                "new ElementStatus(true, false, undefined).isFile did not return true")
        });

        it("new ElementStatus(true, false, null).isFile returns true", () => {
            assert.isTrue(new ElementStatus(true, false, null).isFile,
                "new ElementStatus(true, false, null).isFile did not return true")
        });

        it("new ElementStatus(false, false).isFile returns true", () => {
            assert.isTrue(new ElementStatus(false, false).isFile,
                "new ElementStatus(false, false).isFile did not return true")
        });

        it("new ElementStatus(false, false, true).isFile returns true", () => {
            assert.isTrue(new ElementStatus(false, false, true).isFile,
                "new ElementStatus(false, false, true).isFile did not return true")
        });

        it("new ElementStatus(false, false, undefined).isFile returns true", () => {
            assert.isTrue(new ElementStatus(false, false, undefined).isFile,
                "new ElementStatus(false, false, undefined).isFile did not return true")
        });

        it("new ElementStatus(false, false, null).isFile returns true", () => {
            assert.isTrue(new ElementStatus(false, false, null).isFile,
                "new ElementStatus(false, false, null).isFile did not return true")
        });
    });
});

describe("valid static of(Partial<ElementStatus>) instantiation", () => {

    context("valid single exists property argument static instantiation", () => {

        it("ElementStatus.of({exists: true}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true}))
        });

        it("ElementStatus.of({exists: false}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false}))
        });
    });

    context("valid double argument static instantiation with set directory property", () => {

        it("ElementStatus.of({exists: true, isDirectory: true}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: true}))
        });

        it("ElementStatus.of({exists: true, isDirectory: false}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: false}))
        });

        it("ElementStatus.of({exists: false, isDirectory: true}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: true}))
        });

        it("ElementStatus.of({exists: false, isDirectory: false}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: false}))
        });
    });

    context("valid double argument static instantiation with explicit unset directory\nproperty", () => {

        it("ElementStatus.of({exists: true, isDirectory: undefined}) should not\nthrow", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: undefined}))
        });

        it("ElementStatus.of({exists: true, isDirectory: null}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: null}))
        });

        it("ElementStatus.of({exists: false, isDirectory: undefined}) should not\nthrow", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: undefined}))
        });

        it("ElementStatus.of({exists: false, isDirectory: null}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: null}))
        });
    });

    context("valid double argument static instantiation with implicit unset directory\nproperty", () => {

        it("ElementStatus.of({exists: true, isFile: true}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isFile: true}))
        });

        it("ElementStatus.of({exists: true, isFile: false}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isFile: false}))
        });

        it("ElementStatus.of({exists: true, isFile: true}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isFile: true}))
        });

        it("ElementStatus.of({exists: true, isFile: false}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isFile: false}))
        });

        it("ElementStatus.of({exists: false, isFile: true}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isFile: true}))
        });

        it("ElementStatus.of({exists: false, isFile: false}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isFile: false}))
        });

        it("ElementStatus.of({exists: false, isFile: true}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isFile: true}))
        });

        it("ElementStatus.of({exists: false, isFile: false}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isFile: false}))
        });
    });

    context("valid triple argument static instantiation with set directory and file\nproperty", () => {

        it("ElementStatus.of({exists: true, isDirectory: true, isFile: false})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: true, isFile: false}))
        });

        it("ElementStatus.of({exists: true, isDirectory: false, isFile: true})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: false, isFile: true}))
        });

        it("ElementStatus.of({exists: false, isDirectory: true, isFile: false})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: true, isFile: false}))
        });

        it("ElementStatus.of({exists: false, isDirectory: false, isFile: true})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: false, isFile: true}))
        });
    });

    context("valid triple argument static instantiation with explicit unset directory\nproperty", () => {

        it("ElementStatus.of({exists: true, isDirectory: undefined, isFile: true})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: undefined, isFile: true}))
        });

        it("ElementStatus.of({exists: true, isDirectory: undefined, isFile: false})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: undefined, isFile: false}))
        });

        it("ElementStatus.of({exists: true, isDirectory: null, isFile: true})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: null, isFile: true}))
        });

        it("ElementStatus.of({exists: true, isDirectory: null, isFile: false})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: null, isFile: false}))
        });

        it("ElementStatus.of({exists: false, isDirectory: undefined, isFile: true})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: undefined, isFile: true}))
        });

        it("ElementStatus.of({exists: false, isDirectory: undefined, isFile: false})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: undefined, isFile: false}))
        });

        it("ElementStatus.of({exists: false, isDirectory: null, isFile: true})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: null, isFile: true}))
        });

        it("ElementStatus.of({exists: false, isDirectory: null, isFile: false})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: null, isFile: false}))
        });
    });

    context("valid triple argument static instantiation with explicit unset file property", () => {

        it("ElementStatus.of({exists: true, isDirectory: true, isFile: undefined})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: true, isFile: undefined}))
        });

        it("ElementStatus.of({exists: true, isDirectory: false, isFile: undefined})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: false, isFile: undefined}))
        });

        it("ElementStatus.of({exists: true, isDirectory: true, isFile: null})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: true, isFile: null}))
        });

        it("ElementStatus.of({exists: true, isDirectory: false, isFile: null})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: false, isFile: null}))
        });

        it("ElementStatus.of({exists: false, isDirectory: true, isFile: undefined})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: true, isFile: undefined}))
        });

        it("ElementStatus.of({exists: false, isDirectory: false, isFile: undefined})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: false, isFile: undefined}))
        });

        it("ElementStatus.of({exists: false, isDirectory: true, isFile: null})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: true, isFile: null}))
        });

        it("ElementStatus.of({exists: false, isDirectory: false, isFile: null})\nshould not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: false, isFile: null}))
        });
    });

    context("valid triple argument static instantiation with explicit unset directory and file property", () => {

        it("ElementStatus.of({exists: true, isDirectory: undefined, isFile: undefined}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: undefined, isFile: undefined}))
        });

        it("ElementStatus.of({exists: true, isDirectory: null, isFile: null}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: null, isFile: null}))
        });

        it("ElementStatus.of({exists: true, isDirectory: undefined, isFile: null}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: undefined, isFile: null}))
        });

        it("ElementStatus.of({exists: true, isDirectory: null, isFile: undefined}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: true, isDirectory: null, isFile: undefined}))
        });

        it("ElementStatus.of({exists: false, isDirectory: undefined, isFile: undefined}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: undefined, isFile: undefined}))
        });

        it("ElementStatus.of({exists: false, isDirectory: null, isFile: null}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: null, isFile: null}))
        });

        it("ElementStatus.of({exists: false, isDirectory: undefined, isFile: null}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: undefined, isFile: null}))
        });

        it("ElementStatus.of({exists: false, isDirectory: null, isFile: undefined}) should not throw", () => {
            assert.doesNotThrow(() => ElementStatus.of({exists: false, isDirectory: null, isFile: undefined}))
        });
    });
});

describe("invalid static of(Partial<ElementStatus>) instantiation", () => {

    context("invalid single exists property explicit unset argument static instantiation", () => {

        it("ElementStatus.of({exists: undefined}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: null}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null}),
                "exists element property can't be null")
        });
    });

    context("invalid single argument missing exists property argument static instantiation", () => {

        it("ElementStatus.of({isDirectory: true}) should throw", () => {
            assert.throws(() => ElementStatus.of({isDirectory: true}))
        });

        it("ElementStatus.of({isDirectory: false}) should throw", () => {
            assert.throws(() => ElementStatus.of({isDirectory: false}))
        });

        it("ElementStatus.of({isDirectory: undefined}) should throw", () => {
            assert.throws(() => ElementStatus.of({isDirectory: undefined}))
        });

        it("ElementStatus.of({isDirectory: null}) should throw", () => {
            assert.throws(() => ElementStatus.of({isDirectory: null}))
        });

        it("ElementStatus.of({isFile: true}) should throw", () => {
            assert.throws(() => ElementStatus.of({isFile: true}))
        });

        it("ElementStatus.of({isFile: false}) should throw", () => {
            assert.throws(() => ElementStatus.of({isFile: false}))
        });

        it("ElementStatus.of({isFile: undefined}) should throw", () => {
            assert.throws(() => ElementStatus.of({isFile: undefined}))
        });

        it("ElementStatus.of({isFile: null}) should throw", () => {
            assert.throws(() => ElementStatus.of({isFile: null}))
        });
    });

    context("invalid double argument static instantiation with explicit unset exists\nproperty", () => {

        it("ElementStatus.of({exists: undefined, isDirectory: true}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: true}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: false}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: false}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: null, isDirectory: true}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: true}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: false}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: false}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: undefined}) should\nthrow", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: undefined}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: null}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: null}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: null, isDirectory: undefined}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: undefined}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: null}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: null}),
                "exists element property can't be null")
        });
    });

    context("invalid double argument static instantiation missing exists property", () => {

        it("ElementStatus.of({isDirectory: true, isFile: false}) should throw", () => {
            assert.throws(() => ElementStatus.of({isDirectory: true, isFile: false}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({isDirectory: false, isFile: true}) should throw", () => {
            assert.throws(() => ElementStatus.of({isDirectory: false, isFile: true}),
                "exists element property can't be undefined")
        });
    });

    context("invalid triple argument static instantiation with explicit unset exists\nproperty", () => {

        it("ElementStatus.of({exists: undefined, isDirectory: true, isFile: false})\nshould throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: true, isFile: false}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: true, isFile: undefined}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: true, isFile: undefined}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: true, isFile: null}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: true, isFile: null}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: false, isFile: true})\nshould throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: false, isFile: true}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: false, isFile: undefined}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: false, isFile: undefined}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: false, isFile: null})\nshould throw", () => {
            assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: false, isFile: null}),
                "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: null, isDirectory: true, isFile: false}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: true, isFile: false}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: true, isFile: undefined}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: true, isFile: undefined}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: true, isFile: null}) should throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: true, isFile: null}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: false, isFile: true})\nshould throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: false, isFile: true}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: false, isFile: undefined})\nshould throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: false, isFile: undefined}),
                "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: false, isFile: null})\nshould throw", () => {
            assert.throws(() => ElementStatus.of({exists: null, isDirectory: false, isFile: null}),
                "exists element property can't be null")
        });
    });

    context("invalid triple argument static instantiation with all properties explicit unset", () => {

        it("ElementStatus.of({exists: undefined, isDirectory: undefined, isFile: undefined}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: undefined, isFile: undefined}),
                 "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: undefined, isFile: null}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: undefined, isFile: null}),
                 "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: null, isFile: undefined}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: null, isFile: undefined}),
                 "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: undefined, isDirectory: null, isFile: null}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: undefined, isDirectory: null, isFile: null}),
                 "exists element property can't be undefined")
        });

        it("ElementStatus.of({exists: null, isDirectory: null, isFile: null}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: null, isDirectory: null, isFile: null}),
                 "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: null, isFile: undefined}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: null, isDirectory: null, isFile: undefined}),
                 "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: undefined, isFile: null}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: null, isDirectory: undefined, isFile: null}),
                 "exists element property can't be null")
        });

        it("ElementStatus.of({exists: null, isDirectory: undefined, isFile: undefined}) should throw", () => {
             assert.throws(() => ElementStatus.of({exists: null, isDirectory: undefined, isFile: undefined}),
                 "exists element property can't be null")
        });
    });

   context("invalid triple argument static instantiation with equally set directory and\nfile properties", () => {

       it("ElementStatus.of({exists: true, isDirectory: true, isFile: true}) should\nthrow", () => {
           assert.throws(() => ElementStatus.of({exists: true, isDirectory: true, isFile: true}),
               "directory and file property status of true")
       });

       it("ElementStatus.of({exists: true, isDirectory: false, isFile: false})\nshould throw", () => {
           assert.throws(() => ElementStatus.of({exists: true, isDirectory: false, isFile: false}),
               "directory and file property status of false")
       });

       it("ElementStatus.of({exists: false, isDirectory: true, isFile: true})\nshould throw", () => {
           assert.throws(() => ElementStatus.of({exists: false, isDirectory: true, isFile: true}),
               "directory and file property status of true")
       });

       it("ElementStatus.of({exists: false, isDirectory: false, isFile: false})\nshould throw", () => {
           assert.throws(() => ElementStatus.of({exists: false, isDirectory: false, isFile: false}),
               "directory and file property status of false")
       });
   });
});
