# SnapLib npm File System (currently in ALPHA)

## WARNING! THIS PACKAGE IS CURRENTLY IN ALPHA & SHOULD NOT BE USED

This package is under active development and ***shouldn't be used*** for
anything at the moment. It is very likely to undergo numerous compatibility
breaking changes as well as lack up to date documentation and testing. Feel
free to use and/or contribute to it if you'd like, just be aware of the above
warning.

---

API to interact with a file system.

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
can be represented programatically via JavaScript objects.

### Element

An `Element` (short for file system element) contains all the properties that
are shared between the 2 file element types, files and directories. This
includes properties such as the element type, path, name, size, and parent
directory it's contained in.

### File Element

A `FileElement` (short for file system file element) is used to represent a
file (both existing and virtual) of a file system.

### Directory Element

A `DirElement` (short for file system directory element) is used to represent
a directory (both existing and virtual) of a file system.

### Existing Element

An `ExistingElement` (short for existing file system element) is a file system
element representing a directory or file that has been written to a disk. For
instance, when using the `readdir` function from the Node file system module,
the directory passed as an argument to this function can be represented as an
existing directory element with this API.

### Virtual Element

A `VirtualElement` (short for virtual file system element) is a representation
of a file or directory that exists purely as a JavaScript object. For instance,
a programmer may want to programmatically create a new directory. With this
API, you'd create an object to represent that directory before it's written to
disk. That object can be thought of as a "virtual" file system element since,
until it's written to disk, it exists purely as a JavaScript struct.

It's important to note that a virtual element can be based on an existing
element. And really, as long as none of the properties of the virtual element are changed, it's essentially indistinguishable from the existing element.

## Differences between existing and virtual elements

There are 2 main differences between existing and virtual elements:

1. Existing file system elements require a path to a pre-existing file or
    directory that's already been saved/written to disk. Attempting to create
    an existing element with a path that doesn't point to a pre-existing file
    or directory results in an Error to be thrown.

    A virtual element does not have this restriction and can be made with any
    path whether it points to a pre-existing file or directory or not.

1. Existing file system elements are immutable. The primary purpose of an
    existing element is to read pre-existing files and directories and to
    convert existing elements into virtual elements.

## Synopsis

This API essentially utilizes the Node [File System][1] module to create a more
object oriented approach to interacting with a file system. It does this by
providing classes that can be used to create objects to represent the different
elements of a file system.

## Examples

To use this API to create an existing file or directory element, all that is
needed is a path to a pre-existing directory or file:

```typescript
const existingFile = new ExistingFileElement("path/to/existing/file.txt");

console.log(existingFile.elementType);
// Prints "FILE"

console.log(existingFile.path);
// Prints "path/to/existing/file.txt"

console.log(existingFile.parent);
// Prints "path/to/existing"

console.log(existingFile.parent);
// Prints "path/to/existing"

const existingDirectory = new ExistingDirElement("path/to/existing/directory");

console.log(existingDirectory.elementType);
// Prints "DIRECTORY"

console.log(existingDirectory.path);
// Prints "path/to/existing/directory"

console.log(existingDirectory.name);
// Prints "directory"

console.log(existingDirectory.parent);
// Prints "path/to/existing"

// The following line would result in an Error to be thrown
const nonExistingDir = new ExistingDirElement("path/to/nonexisting/directory");
```

To create a a virtual file or directory element, any path can be provided. This
will be the path of the virtual element if it were to get written to disk:

```typescript
const virtualFile = new VirtualFileElement("path/of/this/file/element.md");

console.log(virtualFile.elementType);
// Prints "FILE"

console.log(virtualFile.path);
// Prints "path/of/this/file/element.md"

console.log(virtualFile.name);
// Prints "element.md"

console.log(virtualFile.parent);
// Prints "path/of/this/file"

const virtualDirectory = new VirtualDirElement("path/of/this/directory/element");

console.log(virtualDirectory.elementType);
// Prints "DIRECTORY"

console.log(virtualDirectory.path);
// Prints "path/of/this/directory/element"

console.log(virtualDirectory.name);
// Prints "element"

console.log(virtualDirectory.parent);
// Prints "path/of/this/file"

// Existing file and directory paths can be used to create virtual elements as
// well
const nonExistingDir = new VirtualFileElement("path/to/existing/file.json");
```

[1]: https://nodejs.org/api/fs.html "Node File System"
