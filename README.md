# SnapLib npm File System (currently in ALPHA)

## WARNING! THIS PACKAGE IS CURRENTLY IN ALPHA & SHOULD NOT BE USED

This package is under active development and ***shouldn't be used*** for
anything at the moment. It is very likely to contain bugs, undergo numerous
compatibility breaking changes as well as lack up to date documentation and
testing. Feel free to use and/or contribute to it if you'd like, just be aware
of the above warning.

---

API to interact with a file system.

![npm (scoped)](https://img.shields.io/npm/v/@snaplib/npm-fs?color=%2366ff66&logo=npm&style=flat-square) ![NPM](https://img.shields.io/npm/l/@snaplib/npm-fs?color=%2366ff66&style=flat-square)

## Synopsis

This API essentially utilizes parts of the Node [File System][1] module to
create a more object oriented approach to interacting with a file system. It
does this by providing classes that can be used to create objects to represent
the different elements of a file system.

While no knowledge of the Node [File System][1] module is necessary to use this
API, it's strongly encouraged or to at least checkout the [Dirent][2] class
from the module.

## Examples

To create an existing file element, pass a string composed of a path to a
pre-existing file as an argument to the [`ExistingFileElement`][3]
constructor or one of it's functions to create an existing file element object:

```typescript
const existingFile =
    new ExistingFileElement("/Users/Main/Projects/snaplib-npm-fs/README.md");

// The following statement would result in an Error to be thrown since the
// provided path doesn't point to an existing file
const nonExistingFile =
    new ExistingFileElement("/Users/Main/Projects/snaplib-npm-fs/RRREADMEE.mdz");

console.log(existingFile.elementType);
// Prints "FILE"

console.log(existingFile.path);
// Prints "/Users/Main/Projects/snaplib-npm-fs/README.md"

console.log(existingFile.parent);
// Prints "/Users/Main/Projects/snaplib-npm-fs"

console.log(existingFile.name);
// Prints "README.md"
```

To create an existing directory element, pass a string composed of a path to a
pre-existing directory as an argument to the [`ExistingDirElement`][4]
constructor or one of it's functions to create an existing directory element
object:

```typescript
const existingDirectory =
    new ExistingDirElement("/Users/Main/Projects/snaplib-npm-fs");

// The following statement would result in an Error to be thrown since the
// provided path doesn't point to an existing directory
const nonExistingDir =
    new ExistingDirElement("/path/to/nonexistent/directory");

console.log(existingDirectory.elementType);
// Prints "DIRECTORY"

console.log(existingDirectory.path);
// Prints "/Users/Main/Projects/snaplib-npm-fs"

console.log(existingDirectory.parent);
// Prints "/Users/Main/Projects"

console.log(existingDirectory.name);
// Prints "snaplib-npm-fs"

console.log(existingDirectory.fileSync().names);
/*
 * Prints string array of names of files retrieved in a synchronous manner:
 * [ '.DS_Store', '.editorconfig', '.eslintrc.json', '.gitignore', '.npmrc',
 *   'LICENSE.txt', 'README.md', 'package-lock.json', 'package.json',
 *   'typedoc.json' ]
 */

console.log(existingDirectory.fileSync().paths);
/*
 * Prints string array of absolute paths of files retrieved in a synchronous
 * manner:
 * [ '/Users/Main/Projects/snaplib-npm-fs/.DS_Store',
 *   '/Users/Main/Projects/snaplib-npm-fs/.editorconfig',
 *   '/Users/Main/Projects/snaplib-npm-fs/.eslintrc.json',
 *   '/Users/Main/Projects/snaplib-npm-fs/.gitignore',
 *   '/Users/Main/Projects/snaplib-npm-fs/.npmrc',
 *   '/Users/Main/Projects/snaplib-npm-fs/LICENSE.txt',
 *   '/Users/Main/Projects/snaplib-npm-fs/README.md',
 *   '/Users/Main/Projects/snaplib-npm-fs/package-lock.json',
 *   '/Users/Main/Projects/snaplib-npm-fs/package.json',
 *   '/Users/Main/Projects/snaplib-npm-fs/typedoc.json' ]
 */

console.log(existingDirectory.fileSync().dirents);
/*
 * Prints Dirent array of files retrieved in a synchronous manner:
 * [ Dirent { name: '.DS_Store', [Symbol(type)]: 1 },
 *   Dirent { name: '.editorconfig', [Symbol(type)]: 1 },
 *   Dirent { name: '.eslintrc.json', [Symbol(type)]: 1 },
 *   Dirent { name: '.gitignore', [Symbol(type)]: 1 },
 *   Dirent { name: '.npmrc', [Symbol(type)]: 1 },
 *   Dirent { name: 'LICENSE.txt', [Symbol(type)]: 1 },
 *   Dirent { name: 'README.md', [Symbol(type)]: 1 },
 *   Dirent { name: 'package-lock.json', [Symbol(type)]: 1 },
 *   Dirent { name: 'package.json', [Symbol(type)]: 1 },
 *   Dirent { name: 'typedoc.json', [Symbol(type)]: 1 } ]
 */

console.log(existingDirectory.dirSync().names);
/*
 * Prints string array of names of directories retrieved in a synchronous
 * manner:
 * [ '.git', '.idea', 'build', 'docs', 'node_modules', 'scripts', 'src' ]
*/

console.log(existingDirectory.dirSync().paths);
/*
 * Prints string array of absolute paths of directories retrieved in a
 * synchronous manner:
 * [ '/Users/Main/Projects/snaplib-npm-fs/.git',
 *   '/Users/Main/Projects/snaplib-npm-fs/.idea',
 *   '/Users/Main/Projects/snaplib-npm-fs/build',
 *   '/Users/Main/Projects/snaplib-npm-fs/docs',
 *   '/Users/Main/Projects/snaplib-npm-fs/node_modules',
 *   '/Users/Main/Projects/snaplib-npm-fs/scripts',
 *   '/Users/Main/Projects/snaplib-npm-fs/src' ]
 */

console.log(existingDirectory.dirSync().paths);
/*
 * Prints Dirent array of directories retrieved in a synchronous manner:
 * [ Dirent { name: '.git', [Symbol(type)]: 2 },
 *   Dirent { name: '.idea', [Symbol(type)]: 2 },
 *   Dirent { name: 'build', [Symbol(type)]: 2 },
 *   Dirent { name: 'docs', [Symbol(type)]: 2 },
 *   Dirent { name: 'node_modules', [Symbol(type)]: 2 },
 *   Dirent { name: 'scripts', [Symbol(type)]: 2 },
 *   Dirent { name: 'src', [Symbol(type)]: 2 } ]
 */

console.log(existingDirectory.direntSync().names);
/*
 * Prints string array of names of both files and directories retrieved in a
 * synchronous manner:
 * [ '.DS_Store',         '.editorconfig',
 *   '.eslintrc.json',    '.git',
 *   '.gitignore',        '.idea',
 *   '.npmrc',            'LICENSE.txt',
 *   'README.md',         'build',
 *   'docs',              'node_modules',
 *   'package-lock.json', 'package.json',
 *   'scripts',           'src',
 *   'typedoc.json' ]
 */


console.log(existingDirectory.direntSync().paths);
/*
 * Prints string array of absolute paths of files and directories retrieved in a
 * synchronous manner:
 * [ '/Users/Main/Projects/snaplib-npm-fs/.DS_Store',
 *   '/Users/Main/Projects/snaplib-npm-fs/.editorconfig',
 *   '/Users/Main/Projects/snaplib-npm-fs/.eslintrc.json',
 *   '/Users/Main/Projects/snaplib-npm-fs/.git',
 *   '/Users/Main/Projects/snaplib-npm-fs/.gitignore',
 *   '/Users/Main/Projects/snaplib-npm-fs/.idea',
 *   '/Users/Main/Projects/snaplib-npm-fs/.npmrc',
 *   '/Users/Main/Projects/snaplib-npm-fs/LICENSE.txt',
 *   '/Users/Main/Projects/snaplib-npm-fs/README.md',
 *   '/Users/Main/Projects/snaplib-npm-fs/build',
 *   '/Users/Main/Projects/snaplib-npm-fs/docs',
 *   '/Users/Main/Projects/snaplib-npm-fs/node_modules',
 *   '/Users/Main/Projects/snaplib-npm-fs/package-lock.json',
 *   '/Users/Main/Projects/snaplib-npm-fs/package.json',
 *   '/Users/Main/Projects/snaplib-npm-fs/scripts',
 *   '/Users/Main/Projects/snaplib-npm-fs/src',
 *   '/Users/Main/Projects/snaplib-npm-fs/typedoc.json' ]
 */

console.log(existingDirectory.direntSync().dirents);
/*
 * Prints Dirent array of files and directories retrieved in a synchronous
 * manner:
 * [ Dirent { name: '.DS_Store', [Symbol(type)]: 1 },
 *   Dirent { name: '.editorconfig', [Symbol(type)]: 1 },
 *   Dirent { name: '.eslintrc.json', [Symbol(type)]: 1 },
 *   Dirent { name: '.git', [Symbol(type)]: 2 },
 *   Dirent { name: '.gitignore', [Symbol(type)]: 1 },
 *   Dirent { name: '.idea', [Symbol(type)]: 2 },
 *   Dirent { name: '.npmrc', [Symbol(type)]: 1 },
 *   Dirent { name: 'LICENSE.txt', [Symbol(type)]: 1 },
 *   Dirent { name: 'README.md', [Symbol(type)]: 1 },
 *   Dirent { name: 'build', [Symbol(type)]: 2 },
 *   Dirent { name: 'docs', [Symbol(type)]: 2 },
 *   Dirent { name: 'node_modules', [Symbol(type)]: 2 },
 *   Dirent { name: 'package-lock.json', [Symbol(type)]: 1 },
 *   Dirent { name: 'package.json', [Symbol(type)]: 1 },
 *   Dirent { name: 'scripts', [Symbol(type)]: 2 },
 *   Dirent { name: 'src', [Symbol(type)]: 2 },
 *   Dirent { name: 'typedoc.json', [Symbol(type)]: 1 } ]
 */
```

To create a virtual file or directory element, any path can be provided. This
will be the path of the virtual element if it were to get written to disk:

```typescript
const virtualFile = new VirtualFileElement("/path/of/this/file/element.md");

console.log(virtualFile.elementType);
// Prints "FILE"

console.log(virtualFile.path);
// Prints "path/of/this/file/element.md"

console.log(virtualFile.parent);
// Prints "path/of/this/file"

console.log(virtualFile.name);
// Prints "element.md"

const virtualDirectory = new VirtualDirElement("/path/of/this/directory/element");

console.log(virtualDirectory.elementType);
// Prints "DIRECTORY"

console.log(virtualDirectory.path);
// Prints "path/of/this/directory/element"

console.log(virtualDirectory.parent);
// Prints "path/of/this/file"

console.log(virtualDirectory.name);
// Prints "element"

// Existing file and directory paths can be used to create virtual elements as
// well
const nonExistingDir = new VirtualDirElement("/Users/Main/Projects/snaplib-npm-fs");
```

The source code for these classes/scripts can be found [here][5].

## File System Elements

A file system's elements can be categorized into 2 different fundamental
types:

1. ***file***
1. ***directory***

And a file system element can be represented in 2 different "states",

1. ***existing***
1. ***virtual***

An **existing** file system element is a file system element (a directory or
file) that "exists" on disk. It can be accessed and read via a file browser.

A **virtual** file system element is a file system element representing a file
or directory that exists purely as a JavaScript object.

This API provides classes so *existing* and *virtual* *files* and *directories*
can be represented programmatically via JavaScript objects.

### Element

An [`Element`][6] (short for file system element) contains all the properties that
are shared between the 2 file element types, files and directories. This
includes properties such as the element type, path, name, size, and parent
directory it's contained in.

### File Element

A [`FileElement`][7] (short for file system file element) is used to represent a
file (both existing and virtual) of a file system.

### Directory Element

A [`DirElement`][8] (short for file system directory element) is used to represent
a directory (both existing and virtual) of a file system.

### Existing Element

An [`ExistingElement`][9] (short for existing file system element) is a file system
element representing a directory or file that has been written to a disk. For
instance, when using the `readdir` function from the Node file system module,
the directory passed as an argument to this function can be represented as an
existing directory element with this API.

### Virtual Element

A "Virtual Element" (short for virtual file system element) is a representation
of a file or directory that exists purely as a JavaScript object. For instance,
a programmer may want to programmatically create a new directory. With this
API, you'd create an object to represent that directory before it's written to
disk. That object can be thought of as a "virtual" file system element since,
until it's written to disk, it exists purely as a JavaScript struct.

It's important to note that a virtual element can be based on an existing
element. And really, as long as none of the properties of the virtual element
are changed, it's essentially indistinguishable from the existing element it's
based on. However there are a couple of key differences in the functionality
between existing and virtual elements.

### Differences between existing and virtual elements

There are 2 key differences between existing and virtual elements:

1. Existing file system elements require a path to a pre-existing file or
    directory that's already been saved/written to disk. Attempting to create
    an existing element with a path that doesn't point to a pre-existing file
    or directory results in an Error to be thrown.

    A virtual element does not have this restriction and can be made with any
    path whether it points to a pre-existing file or directory or not.

1. Existing file system elements are immutable. The primary purpose of an
    existing element is to read pre-existing files and directories and to
    create virtual elements based on existing elements.

---

## npm Package Project

### npm package project rules, linting, and styles

This project enforces certain linting rules enforced via `tsc` (the
typescript compiler) linting [`options`][10], [ESlint][11], and
[EditorConfig][12] settings. The rules themselves may vary slightly depending on
the context of the source code. For example, the typescript compiler is set to
enforce stricter linting (enforces more rules) when compiling for the
distributable build versus the dev build.

The rules defined for eslint can be found in the root [`.eslintrc.json`][13]
file.

 The rules defined for editorconfig can be found in the root
[`.editorconfig`][14] file.

The rules for the typescript compiler depend on the type of build the typescript
is being compiled for. Theres one tsconfig file for distributable builds and
another one for dev builds. Then there's one default tsconfig file that both the
distributable and dev tsconfig files extend.

- [default tsconfig][15]
- [distributable build tsconfig][16]
- [dev build tsconfig][17]

### npm package project scripts

This npm project contains scripts it uses for building, running, testing, and
generating documentation. These scripts can be found in 2 locations:

1. Defined inside the `scripts` section in the root [`package.json`][18] file of
   this npm package project.
1. Contained as a javascript mjs module inside this npm package project's
   root [`scripts`][19] directory.

Additional info can be found [here][20]

[1]: https://nodejs.org/api/fs.html "Node File System"
[2]: https://nodejs.org/api/fs.html#fs_class_fs_dirent "Dirent class"
[3]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/lib/element/file/ExistingFileElement.ts "ExistingFileElement interface"
[4]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/lib/element/directory/ExistingDirElement.ts "ExistingDirElement interface"
[5]: https://github.com/SnapLib/npm-fs/tree/stable/src/main/ts/lib/element "Element directory"
[6]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/lib/element/Element.ts "Element interface"
[7]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/lib/element/file/FileElement.ts "FileElement interface"
[8]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/lib/element/directory/DirElement.ts "DirElement interface"
[9]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/lib/element/ExistingElement.ts "ExistingElement interface"
[10]: https://www.typescriptlang.org/tsconfig "typescript tsc config options"
[11]: https://eslint.org/docs/rules/ "eslint rules"
[12]: https://editorconfig.org/ "EditorConfig"
[13]: https://github.com/SnapLib/npm-fs/blob/release/.eslintrc.json "root eslintrc file"
[14]: https://github.com/SnapLib/npm-fs/blob/release/.editorconfig "root editorconfig file"
[15]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/tsconfig.json "default tsconfig"
[16]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/tsconfig.dist.json "distributable build tsconfig"
[17]: https://github.com/SnapLib/npm-fs/blob/release/src/main/ts/tsconfig.dev.json "dev build tsconfig"
[18]: https://github.com/SnapLib/npm-fs/blob/release/package.json "root package.json"
[19]: https://github.com/SnapLib/npm-fs/tree/stable/scripts "npm package project scripts"
[20]: https://github.com/SnapLib/npm-fs/blob/release/docs/project/scripts/README.md
