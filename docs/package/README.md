# SnapLib npm File System

API that provides a mostly objective oriented approach to interacting with a
file system.

A file system's most fundamental elements are the files and directories it's
comprised of. This package contains classes to represent these elements (and
specific "sub-types" of these elements) as objects. It also provides some
utility expressions for parsing file system elements.

The [README][5] for this package's repository contains examples and further
information and would be a better starting point than this document.

## Element

---

### Element interface

The [`Element`][1] interface is an interface that every file and directory
element implements. It's the root interface of the SnapLib npm file system
hierarchy.

### Element abstract class

The [`AbstractElement`][2] class is an abstract class that every file and
directory element extends from. This class provides an implementations for the
constructor so this element object can be created with the path and
element properties provided via constructor arguments.

## FileElement interface

---
The [`FileElement`][3] interface is an extension of the [`Element`][1] interface
used to represent a file. A file is any file system element that isn't a
directory. By default it's interpreted as text. However there are classes that
extend the [`FileElement`][3] class to represent specific types of files (such
as json files and typescript source code files for instance).

## DirElement interface

---
The [`DirElement`][4] interface is an extension of the [`Element`][1] interface
used to represent a directory. A directory is a file system element that can
contain other file system elements. The properties of these file system elements
can be filtered into files or directories and returned as paths, simple names,
and directory entries (if applicable).

[1]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/Element.ts "Element interface"
[2]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/AbstractElement.ts "AbstractElement abstract class"
[3]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/file/FileElement.ts "FileElement interface"
[4]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/directory/DirElement.ts "DirElement interface"
[5]: https://github.com/SnapLib/npm-fs/blob/stable/README.md "Package repo README"
