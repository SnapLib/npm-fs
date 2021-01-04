import { ExistingDirElement } from "../element/ExistingDirElement";
import { DirContents } from "./DirContents.js";

export class DirectoryRoot extends ExistingDirElement
{
    private _required: Readonly<DirContents> = new DirContents([], []);

    private _optional: Readonly<DirContents> = new DirContents([], []);

    public constructor(rootPath: string)
    {
        super(rootPath);
    }

    public getRequired(): Readonly<DirContents> {return this._required;}

    public getOptional(): Readonly<DirContents> {return this._optional;}

    public addRequiredDirs(dirNamesArray: ReadonlyArray<string> = [], ...dirNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._required = new DirContents(dirNamesArray.concat(this._required.directories.concat(dirNames)), this._required.files);
        return this;
    }

    public addRequiredFiles(fileNamesArray: ReadonlyArray<string> = [], ...fileNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._required = new DirContents(this._required.directories, fileNamesArray.concat(this._required.files.concat(fileNames)));
        return this;
    }

    public addOptionalDirs(dirNamesArray: ReadonlyArray<string> = [], ...dirNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._optional = new DirContents(dirNamesArray.concat(this._optional.directories.concat(dirNames)), this._optional.files);
        return this;
    }

    public addOptionalFiles(fileNamesArray: ReadonlyArray<string> = [], ...fileNames: ReadonlyArray<string>): DirectoryRoot
    {
        this._optional = new DirContents(this._optional.directories, fileNamesArray.concat(this._optional.files.concat(fileNames)));
        return this;
    }

    public missingRequiredDirs(): ReadonlyArray<string>
    {
        return this._required.directories.filter(requiredDir => ! this.containsDirSync(requiredDir));
    }

    public missingRequiredFiles(): ReadonlyArray<string>
    {
        return this._required.files.filter(requiredFile => ! this.containsFileSync(requiredFile));
    }

    public missingOptionalDirs(): ReadonlyArray<string>
    {
        return this._optional.directories.filter(optionalDir => ! this.containsDirSync(optionalDir));
    }

    public missingOptionalFiles(): ReadonlyArray<string>
    {
        return this._optional.files.filter(optionalFile => ! this.containsFileSync(optionalFile));
    }

    public isMissingRequired(): boolean
    {
        return this.isMissingRequiredDir() || this.isMissingRequiredFile();
    }

    public isMissingRequiredDir(): boolean
    {
        return this.missingRequiredDirs().length !== 0;
    }

    public isMissingRequiredFile(): boolean
    {
        return this.missingRequiredFiles().length !== 0;
    }

    public isMissingOptional(): boolean
    {
        return this.isMissingOptionalDir() || this.isMissingOptionalFile();
    }

    public isMissingOptionalDir(): boolean
    {
        return this.missingOptionalDirs().length !== 0;
    }

    public isMissingOptionalFile(): boolean
    {
        return this.missingOptionalFiles().length !== 0;
    }

    public toString(): string
    {
        const formatStringArray = (prefixKey: string, strArray: ReadonlyArray<string>): string =>
        {
            const headTailQuotes = strArray.length !== 0 ? '"' : "";
            return `${prefixKey}: [${headTailQuotes}${strArray.join(`",\n${" ".repeat(prefixKey.length + 5)}"`)}${headTailQuotes}]`;
        };

        const formattedObjStrArray: readonly string[] =
            [formatStringArray("files", this.fileNamesSync()),
            formatStringArray("directories", this.dirNamesSync()),
            formatStringArray("required files", this.getRequired().files),
            formatStringArray("required directories", this.getRequired().directories),
            formatStringArray("optional files", this.getOptional().files),
            formatStringArray("optional directories", this.getOptional().directories)];

        return `{\n  ${formattedObjStrArray.join(",\n\n  ")}\n}`;
    }
}
