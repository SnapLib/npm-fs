# npm-fs Project Scripts

This document outlines the different scripts this project uses.

This npm project contains scripts it uses for building, running, testing, and
generating documentation. These scripts utilize both dependencies installed
via npm (such as `tsc` for compiling typescript for example) and javascript
scripts located in the `scripts` directory at the root of this project.

Some of these scripts use or may attempt to use npm environment variables set in
the [`.npmrc`][1] file at the root of this npm package.

## build scripts

This project (as of updating this) contains 6 build scripts:

1. ***build-dev***
1. ***prebuild-dist***
1. ***build-dist***
1. ***build-dist-types***
1. ***build-tsdocs***
1. ***test-report***

Each of these scripts generate some output that appears in the [`build`][2]
directory in the root of this npm package project. ***All of the***
***configurations for the build scripts that compile typescript extend from***
***the default configuration located at*** [`src/main/ts/tsconfig.json`][3].

## build-dev

The `build-dev` script compiles typescript in a way that makes it more suitable
for development.

It calls `tsc` (the typescript compiler) with:

- the `project` option set to [`src/main/ts/tsconfig.dev.json`][4]
- the `outDir` option set to `build/js`

For instance it, allows unused variables and parameters and includes source
maps. This is set by the `tsconfig.dev.json` config file and the `tsconfig.json`
config file located in the `src/main/ts` directory.

The compiled typescript source code is outputted to `build/js` in the same file
structure it has in `src/build/main/ts`.

## prebuild-dist

The `prebuild-dist` script compiles this project's typescript in a way that is
more suitable for distribution and outputs it to the distributable npm package
root directory created in the `build/dist` directory.

It calls `tsc` (the typescript compiler) with:

- the `project` option set to [`src/main/ts/tsconfig.dist.json`][5]
- the `outDir` option set to `build/dist/$npm_config_dist_root_pkg_dirname`
- the `declarationDir` option set to
`build/dist/$npm_config_dist_root_pkg_dirname/types`

It uses the npm `dist_root_pkg_dirname` npm config environment variable stored
in the root [`.npmrc`][1] file as a name for the root directory of the
distributable package. It outputs the compiled typescript in the
distributable build directory, `build/dist`, in a directory with the name
retrieved from the `dist_root_pkg_dirname` npm config environment variable.

This script only uses `tsc`(the typescript compiler) calls so it's only located
in the `scripts` section in this npm package project's[`package.json`][6].

## build-dist

The `build-dist` script is responsible for creating the npm elements in the
distributable npm package root directory created in `build/dist` during the
prebuild step of this script.

This script calls the node script located at
[`scripts/build/build-dist.mjs`][7]. This script uses an external argument to
resolve the path to the npm package root directory created in `build/dist`
during the prebuild step.

If no arguments are passed to this script when it's called, it attempts to use
the `dist_root_pkg_dirname` npm config environment variable set in the root
[`.npmrc`][1] file.

If passed 1 argument, the passed argument takes precedence and is used to
resolve the path to the distributable npm package root directory over the
`dist_root_pkg_dirname` npm config environment variable.

If passed 2 arguments, second argument takes precedence over both the first
argument and the `dist_root_pkg_dirname` npm config environment variable.

[1]: ../../../.npmrc "root npm config file"
[2]: ../../project/build/README.md "root build directory readme"
[3]: ../../../src/main/ts/tsconfig.json "default tsconfig for all builds"
[4]: ../../../src/main/ts/tsconfig.dev.json "tsconfig for dev build"
[5]: ../../../src/main/ts/tsconfig.dist.json "tsconfig for distributable build"
[6]: ../../../package.json "root package.json"
[7]: ../../../scripts/build/build-dist.mjs "build distributable script"
