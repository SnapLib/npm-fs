"use strict";

const join = require("path").join

module.exports =
{
    extension: ["ts"],
    ignore: [join("src", "test", "ts", "globals.ts")],
    recursive: true,
    require: [join("ts-node", "register")],
    ui: "tdd"
}
