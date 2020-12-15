# SnapLib npm File System

API that defines and enforces the file system and file system structure native
to a SnapLib npm project.

## SnapLib npm Project Structure

A SnapLib npm project's structure can be thought of as a subset of an npm
project. Therefore, every SnapLib npm project follows the basic minimum npm
project structure. Such as having a `node_modules` directory and `package.json`
and `package-lock.json` file located in the project's root directory that is
common to every npm based project.

However, ***SnapLib*** npm projects have additional project structure properties
that are enforced and shared by all SnapLib npm projects. Some examples of such
properties are having a `src` directory in the project's root directory to
contain all source code files and a `.eslintrc.json` and `typedoc.json` file in
the project root directory to define a consistent source code convention and
generated documentation style.

In addition to the above project structure/config properties, there are also
specific dependencies SnapLib npm projects are required to have such as
[TypeScript][1] and [TypeDoc][2].

And finally, there are SnapLib npm project properties that are optional and not
*required* (but often encouraged) for each SnapLib project to have. For
instance, it's not required that a SnapLib npm project to have version control,
so the root directory of a SnapLib npm project can optionally contain a `.git`
file. Although as previously stated, most optional SnapLib npm project
properties are *highly* encouraged.

Below is an example of how a SnapLib npm project is structured with optional
project properties included (any elements with a trailing '\\' character
indicates it's a directory):

<details>
  <summary>View SnapLib npm project structure tree</summary>

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

## File System Element

There are two types of fundamental elements that comprise a file system.

### File

A `file element` is an element that represents anything in a file system that's
not a directory.

### Directory

A `directory element` is an element that represents a directory in a file
system.

[1]: https://www.npmjs.com/package/typescript "TypeScript"
[2]: https://www.npmjs.com/package/typedoc "TypeDoc"
