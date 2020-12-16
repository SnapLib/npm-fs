# SnapLib npm File System

Node package that defines and enforces the file system and file system structure
native to a SnapLib npm project.

A file system's most fundamental elements are the files and directories it's
comprised of. These files and directories ***are*** the file system. This
package contains classes to represent these elements (and specific "sub-types"
of these elements).

## Element

---
The `Element` class is an abstract class that every file and directory element
inherits from. This class implements properties and behaviors that are shared
by both files and directories.

## File

---
The `File` class is an implementation of the `Element` class used to represent a
file. A file is any file system element that isn't a directory. By default it's
interpreted as text. However there are subclasses that extend from the `File`
class to represent specific types of files (such as json files and typescript
source code files for instance).

## Directory

---
The `Directory` class is an implementation of the `Element` class used to
represent a directory. A directory is a file system element that can contain
other file system elements.
