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

1. [***build-dev***](#build-dev)
1. [***prebuild-dist***](#prebuild-dist)
1. [***build-dist***](#build-dist)
1. [***build-tsdocs***](#build-tsdocs)
1. [***build-types***](#build-types)
1. [***test-report***](#test-report)

Each of these scripts generate some output that appears in the [`build`][2]
directory in the root of this npm package project. ***All of the***
***configurations for the build scripts that compile typescript extend from***
***the default configuration located at*** [`src/main/ts/tsconfig.json`][3].

## build-dev

The `build-dev` script compiles typescript in a way that makes it more suitable
for development outputs it to the build directory.

It can be called via:

```shell
$npm run build-dev
```

After running the script, a directory named `build` will be generated in the
root of this project. This directory will contain another directory called `js`
that contains the javascript code compiled from the typescript source code, as
well as the source maps for each javascript file. This build is intended to
compile the code so it can be further tested/developed within this project
environment only.

It calls `tsc` (the typescript compiler) with:

- the `project` option set to [`src/main/ts/tsconfig.dev.json`][4]
- the `outDir` option set to `build/js`

This results in the src code located in the [`src/main/ts`][5] directory to be
compiled and outputted to the root `build/js` directory in the same structure
it's in in [`src/main/ts`][5].

The tsconfig compiler rules set in [`src/main/ts/tsconfig.dev.json`][4] are
relatively lax compared to compiling for distribution. For instance, unused
parameters and variables are allowed since during development, there may be
an implementation of a feature being developed that contains unused variables.

## prebuild-dist

The `prebuild-dist` script compiles this project's typescript in a way that is
more suitable for distribution and outputs it to the distributable npm package
root directory created in the `build/dist` directory.

This script can be called explicitly or gets called during the pre-build step of
the `build-dist` script:

```shell
$npm run preduild-dist

# alternatively, it gets called whenever the build-dist script is called
$npm run build-dist
```

After running the script, a `build` directory gets created in the root of this
project containing a directory named `dist`. A directory inside this `dist`
directory gets created with its name provided externally to the script. This
project uses the [`dist_root_pkg_dirname`][1] npm config environment variable
from this project's [`.npmrc`][1]. Inside this directory, the src code from
[`src/main/ts`][5] gets compiled while maintaining its file structure.

It calls `tsc` (the typescript compiler) with:

- the `project` option set to [`src/main/ts/tsconfig.dist.json`][6]
- the `outDir` option set to `build/dist/`[`$npm_config_dist_root_pkg_dirname`][1]
- the `declarationDir` option set to
`build/dist/$npm_config_dist_root_pkg_dirname/types`

The compiler rules defined in [`src/main/ts/tsconfig.dist.json`][6] are
relatively stricter compared to most other builds. For instance, it doesn't
allow unused variables or parameters.

This script only uses `tsc`(the typescript compiler) calls so it's only located
in the `scripts` section in this npm package project's[`package.json`][7].

## build-dist

The `build-dist` script is responsible for generating the distributable npm
package to publish to npm.

It can be called via:

```shell
$npm run build-dist
```

After running the script, files from this npm package project required for its
distributable release get copied and/or formatted to the distributable npm
package root directory that got created inside of the `build/dist` directory
during the `prebuild-dist` step. This includes any readme and license file
contained in the root of this npm package project as well as this project's
[`package.json`][7] file **reformatted** for distribution.

This script calls the node script located at
[`scripts/build/build-dist.mjs`][8]. This script uses an external argument to
resolve the path to the npm package root directory created in `build/dist`
during the prebuild step.

If no arguments are passed to this script when it's called, it attempts to use
the `dist_root_pkg_dirname` npm config environment variable set in the root
[`.npmrc`][1] file.

If passed 1 argument, the passed argument takes precedence and is used to
resolve the path to the distributable npm package root directory over the
`dist_root_pkg_dirname` npm config environment variable.

If passed 2 arguments, the second argument takes precedence over both the first
argument and the `dist_root_pkg_dirname` npm config environment variable.

By default it's called with no arguments passed so the default dist package
root directory name retrieved from the npm config environment variable is used.

### **NOTE:**

If the distributable package root directory from the prebuild step can't be
found in the `build/dist` directory an error gets thrown. This script looks for
a directory with the same name as the provided argument in the `build/dist`
directory. Since by default this script is called with no arguments and uses the
same npm config environment variable value that's used in the prebuild step,
this works. However, if this script were passed an argument that didn't match
that value, an error of not being able to find the directory will be thrown.

## build-tsdocs

The `build-tsdocs` script is repsonsible for generating the typescript source
code doc comments.

It can be called via:

```shell
$npm run build-tsdocs
```

Calling this script is an alias for executing `$typedoc --options ./typedoc.`
`json`. The typedoc config file can be found [here][9]. This generates the html,
css, javascript, and other elements resulting from parsing the doc comments
in this package's typescript source code with [`typedoc`][10]. It outputs the
generated documentation to `build/tsdocs` and sets `index.html` as the primary
entry point of the documentation. It also uses the markdown file located at
`docs/typedoc/README.md` as the default root readme

[1]: ../../../.npmrc "root npm config file"
[2]: ../../project/build/README.md "root build directory readme"
[3]: ../../../src/main/ts/tsconfig.src.json "default tsconfig for all source code"
[4]: ../../../src/main/ts/tsconfig.dev.json "tsconfig for dev build"
[5]: ../../../src/main/ts "typescript source code"
[6]: ../../../src/main/ts/tsconfig.dist.json "tsconfig for distributable build"
[7]: ../../../package.json "root package.json"
[8]: ../../../scripts/build/build-dist.mjs "build distributable script"
[9]: ../../../typedoc.json "typedoc config file"
[10]: https://www.npmjs.com/package/typedoc "typedoc npm package"
