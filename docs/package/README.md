# SnapLib npm File System

API that provides a mostly objective oriented approach to interacting with a
file system.

A file system's most fundamental elements are the files and directories it's
comprised of. These files and directories ***are*** the file system. This
package contains classes to represent these elements (and specific "sub-types"
of these elements) as objects.

## Element

---

### Element interface

The [`Element`][1] interface is an interface that every file and directory
element implements.

### Element abstract class

The [`AbstractElement`][2] is an abstract class that every file and directory
element inherits from. This class provides implementations of properties and
behaviors that are shared by both files and directories.

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
contain other file system elements.

[1]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/Element.ts "Element interface"
[2]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/AbstractElement.ts "AbstractElement abstract class"
[3]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/file/FileElement.ts "FileElement interface"
[4]: https://github.com/SnapLib/npm-fs/blob/dev/src/main/ts/lib/element/directory/DirElement.ts "DirElement interface"
