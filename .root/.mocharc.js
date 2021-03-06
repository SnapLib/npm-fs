"use strict";

const join = require("path").join

module.exports =
{
    extension: ["spec.ts"],
    ignore: [join("src", "test", "ts", "globals.ts")],
    recursive: true,
    require: [join("ts-node", "register")],
    spec: join("src", "test", "ts", "**", "*.spec.ts"),
    ui: "tdd"
}
