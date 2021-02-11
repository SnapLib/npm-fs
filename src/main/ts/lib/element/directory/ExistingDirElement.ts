import type ExistingElement from "../ExistingElement";
import AbstractDirElement from "./AbstractDirElement";
import { dirSize } from "../../util/dirSize";
import { dirReaderSync } from "../../util/dirReader";
import type { ExistingDirents } from "./DirElement";
import Path from "path";
import fs from "fs";
import {fileURLToPath} from "url";

/**
 * Class to create existing file system directory element objects.
 *
 * @classdesc
 * This class creates a Directory Element based on an existing directory that
 * has been read from disk. It contains various methods to query the files and
 * directories this existing directory element contains.
 *
 * @author Snap <snap@snaplib.org>
 */
export class ExistingDirElement extends AbstractDirElement implements ExistingElement
{
    /**
     * Constructs an existing directory element out of the directory the
     * provided absolute path string argument points to.
     *
     * One or more string arguments can optionally be provided. The following
     * examples showing the 2 instantiation statements would be interpreted
     * equally.
     *
     * @example Constructor arguments
     * ```typescript
     * const existingDirOne = new ExistingDirElement("/path/to/directory");
     *
     * const existingDirTwo = new ExistingDirElement("path", "to", "directory");
     * ```
     *
     * @param existingDirPath The absolute path or the prefix of the absolute
     *                        path of this file system element
     *
     * @constructor
     */
    public constructor(existingDirPath: string)
    {
        super(existingDirPath, {exists: true});
    }

    public fileSync(options?: {recursive: boolean}): Readonly<ExistingDirents>
    {
        return dirReaderSync(this.path, options).file;
    }

    public dirSync(options?: {recursive: boolean}): Readonly<ExistingDirents>
    {
        return dirReaderSync(this.path, options).directory;
    }

    public direntSync(options?: {recursive: boolean}): Readonly<ExistingDirents>
    {
        const thisExistingDirElement: Readonly<ExistingDirents> =
            dirReaderSync(this.path, options);

        return {
            dirents: thisExistingDirElement.dirents,
            names: thisExistingDirElement.names,
            paths: thisExistingDirElement.paths,
            count: thisExistingDirElement.count,
            contains:
                {
                    dirent: (aDirent: fs.Dirent): boolean =>
                    {
                        return thisExistingDirElement.contains.dirent(aDirent);
                    },

                    name: (existingDirElementName: string, options?: {matchCase: boolean}): boolean =>
                    {
                        return thisExistingDirElement.contains.name(existingDirElementName, options);
                    },

                    path: (existingDirAbsOrRelPath: string, options?: {matchCase: boolean}): boolean =>
                    {
                        return thisExistingDirElement.contains.path(existingDirAbsOrRelPath, options);
                    }
                }
        };
    }

    /** @inheritDoc */
    public inodeSync(): number
    {
        return fs.lstatSync(this.path).ino;
    }

    /** @inheritDoc */
    public deleteSync(): boolean
    {
        fs.rmdirSync(this.path, {recursive: true});
        return ! fs.existsSync(this.path);
    }

    /** @inheritDoc */
    public renameSync(newName: string, options?: { overwrite: boolean; }): boolean
    {
        // If overwrite option isn't true and element exists return false
        if ( ! options?.overwrite && fs.existsSync(newName))
        {
            return false;
        }
        // If element doesn't exist or overwrite option is true
        else
        {
            fs.renameSync(this.path, newName);
            return fs.existsSync(newName);
        }
    }

    public length(): number
    {
        return this.direntSync().dirents.length;
    }

    public isEmpty(): boolean
    {
        return this.length() === 0;
    }

    public sizeSync(): number
    {
        return dirSize(this.path);
    }

    public copyToSync(dest: string, options?: { overwrite: boolean }): boolean
    {
        throw new Error("Method not implemented. No-op args" + dest + options);
    }

    public toString(): string
    {
        return "ExistingDirElement:\n".concat(super.toString());
    }

    /**
     *
     * @param existingDirPath The absolute path or root of the absolute path of
     *                        an existing directory
     *
     * @param morePaths Additional paths that will be appended as nested paths
     *                  to `existingDirPath`
     *
     * @returns An ExistingDirElement object created from the provided path
     *          argument(s)
     */
    public static of(existingDirPath: string, ...morePaths: ReadonlyArray<string>): Readonly<ExistingDirElement>
    {
        return new ExistingDirElement(Path.normalize([existingDirPath].concat(morePaths).join(Path.sep)));
    }

    /**
     *
     * @param directoryUrl The url to an existing directory
     *
     * @returns An ExistingDirElement object created from the provided url
     */
    public static ofUrl(directoryUrl: string): Readonly<ExistingDirElement>
    {
        return new ExistingDirElement(fileURLToPath(directoryUrl));
    }
}

export {ExistingDirElement as default, dirReaderSync as existingDirReader};
