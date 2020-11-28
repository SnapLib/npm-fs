import { ElementStatus } from "../../main/ts/ElementStatus";
import { assert } from 'chai';
import 'mocha';

describe("new ElementStatus(...) valid constructors", () => {
    context("single argument constructor should not throw error", () => {
        it("should not throw when constructed via new ElementStatus(true)", () => {
            assert.doesNotThrow(() => new ElementStatus(true),
                "new ElementStatus(true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false)", () => {
            assert.doesNotThrow(() => new ElementStatus(false),
                "new ElementStatus(false) threw error")
        });
    });

    context("valid double argument constructor should not throw error", () => {
        it("should not throw when constructed via new ElementStatus(true, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true),
                "new ElementStatus(true, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, false)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false),
                "new ElementStatus(true, false) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, undefined)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined),
                "new ElementStatus(true, undefined) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, null)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null),
                "new ElementStatus(true, null) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true),
                "new ElementStatus(false, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, false)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false),
                "new ElementStatus(false, false) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, undefined)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined),
                "new ElementStatus(false, undefined) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, null)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null),
                "new ElementStatus(false, null) threw error")
        });
    });

    context("valid triple argument constructors should not throw error", () => {
        it("should not throw when constructed via new ElementStatus(true, true, false)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, true, false),
                "new ElementStatus(true, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, false, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, false, true),
                "new ElementStatus(true, false) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, undefined, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, true),
                "new ElementStatus(true, undefined, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, null, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, true),
                "new ElementStatus(true, null, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, undefined, undefined)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, undefined, undefined),
                "new ElementStatus(true, undefined, undefined) threw error")
        });

        it("should not throw when constructed via new ElementStatus(true, null, null)", () => {
            assert.doesNotThrow(() => new ElementStatus(true, null, null),
                "new ElementStatus(true, null, null) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, true, false)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, false),
                "new ElementStatus(false, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, false, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, false, true),
                "new ElementStatus(false, false) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, true, undefined)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, undefined),
                "new ElementStatus(false, true, undefined) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, true, null)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, true, null),
                "new ElementStatus(false, true, null) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, undefined, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, true),
                "new ElementStatus(false, undefined, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, null, true)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, true),
                "new ElementStatus(false, null, true) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, undefined, undefined)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, undefined, undefined),
                "new ElementStatus(false, undefined, undefined) threw error")
        });

        it("should not throw when constructed via new ElementStatus(false, null, null)", () => {
            assert.doesNotThrow(() => new ElementStatus(false, null, null),
                "new ElementStatus(false, null, null) threw error")
        });
    });
});

describe("new ElementStatus(...) invalid constructors", () => {
    context("single argument constructor not set to boolean value throws error", () => {
        it("should throw when constructed via new ElementStatus(undefined)", () => {
            assert.throws(() => new ElementStatus(undefined),
                "exists element property can't be undefined")
        });

        it("should throw when constructed via new ElementStatus(null)", () => {
            assert.throws(() => new ElementStatus(null),
                "exists element property can't be null")
        });
    });

    context("triple argument constructor with same directory and file properties throws error", () => {
        it("should throw when constructed via new ElementStatus(true, true, true)", () => {
            assert.throws(() => new ElementStatus(true, true, true),
                "directory and file property status of true")
        });

        it("should throw when constructed via new ElementStatus(true, false, false)", () => {
            assert.throws(() => new ElementStatus(true, false, false),
                "directory and file property status of false")
        });
    });
});
