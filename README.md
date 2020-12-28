# SnapLib npm File System (currently in ALPHA)

## WARNING! THIS PACKAGE IS CURRENTLY IN ALPHA SHOULD NOT BE USED

This package is under active development and ***shouldn't be used*** for
anything at the moment.

---

API that defines and enforces the file system and file system structure native
to a SnapLib npm project.

## SnapLib npm Project Structure

A SnapLib npm project's structure can be thought of as a subset of an npm
project. Therefore, every SnapLib npm project follows the basic minimum npm
project structure. Such as having a `node_modules` directory and `package.json`
file located in the project's root directory. These are common to all npm based
projects

However, ***SnapLib*** npm projects have additional project structure properties
that are enforced and shared by all SnapLib npm projects. Some examples of such
properties are having a `src` directory and `.eslintrc.json` and `typedoc.json`
file in the project root directory.

In addition to the above project structure/config properties, there are also
specific dependencies SnapLib npm projects are required to have such as
[TypeScript][1] and [tslib][2] that this package also enforces.

And finally, there are SnapLib npm project properties that are optional and not
*required* (but often encouraged) for each SnapLib project to have. For
instance, it's not required that a SnapLib npm project to have version control,
so the root directory of a SnapLib npm project can optionally contain a `.git`
file. Although as previously stated, most optional SnapLib npm project
properties are *highly* encouraged.

Below is an example of how a SnapLib npm project is structured with optional
project properties included:

<details>
  <summary>SnapLib npm project structure tree</summary>
  (any elements with a trailing '/' character indicates it's a directory)

```none
.
├──build -> generated from various build tasks. May not always be present.
│  ├──css
│  │  └──index.css
│  ├──docs
│  │  └──class_diagrams/
│  ├──html
│  │  └──index.html
│  ├──js
│  │  └──index.js
│  └──test
│     ├──assets\
│     ├──index.html
│     └──index.json
├──docs\
├──node_modules -> not showing full node_modules structure to reduce verbosity
│  ├──.bin\
│  ├──npm-fs
│  │  └──npm-fs.js
│  ├──typedoc\
│  ├──typescript\
│  ├──...
│  ├──...
├──src
│  ├──main
│  │  ├──html
│  │  │  └──index.html
│  │  ├──resources
│  │  │  └──img
│  │  │     └──mona_lisa.png
│  │  ├──scss
│  │  │  └──index.scss
│  │  └──ts
│  │     ├──index.ts
│  │     └──tsconfig.json
│  └──test
│     ├──resources\
│     └──ts
│        └──TestIndex.ts
├──.editorconfig
├──.eslintrc.json
├──.git
├──.gitignore
├──LICENSE.txt
├──package.json
├──package-lock.json
├──README.md
└──typedoc.json
```

</details>

## SnapLib npm Project Root Directories

- ### build

The [`build`][3] directory contains the output of all build and generator tasks.
For instance, the output of compiling/transpiling source code and generating
source code doc comment documentation and test reports is outputted to this
directory.

- ### docs

The [`docs`][4] directory contains all documentation that isn't included in the
source code doc comments.

- ### src

The [`src`][5] directory contains all source code files, source code test files,
as well as all resources (non-source code files) that may be referenced by the
source code and source code test files.

[1]: https://www.npmjs.com/package/typescript "TypeScript"
[2]: https://www.npmjs.com/package/tslib "tslib"
[3]: docs/project/directories/build.md "root build directory"
[4]: docs/project/directories/docs.md "root docs directory"
[5]: docs/project/directories/src.md "root src directory"
