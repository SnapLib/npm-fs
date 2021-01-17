import ExistingDirElement from "./ExistingDirElement.js";
import DirContents from "./DirContents.js";

export class DirectoryRoot extends ExistingDirElement
{
    #required: Readonly<DirContents> = new DirContents([], []);

    #optional: Readonly<DirContents> = new DirContents([], []);

    public constructor(rootPath: string)
    {
        super(rootPath);
    }

    public getRequired(): Readonly<DirContents> {return this.#required;}

    public getOptional(): Readonly<DirContents> {return this.#optional;}

    public addRequiredDirs(dirNamesArray: ReadonlyArray<string> = [], ...dirNames: ReadonlyArray<string>): DirectoryRoot
    {
        this.#required = new DirContents(dirNamesArray.concat(this.#required.directories.concat(dirNames)), this.#required.files);
        return this;
    }

    public addRequiredFiles(fileNamesArray: ReadonlyArray<string> = [], ...fileNames: ReadonlyArray<string>): DirectoryRoot
    {
        this.#required = new DirContents(this.#required.directories, fileNamesArray.concat(this.#required.files.concat(fileNames)));
        return this;
    }

    public addOptionalDirs(dirNamesArray: ReadonlyArray<string> = [], ...dirNames: ReadonlyArray<string>): DirectoryRoot
    {
        this.#optional = new DirContents(dirNamesArray.concat(this.#optional.directories.concat(dirNames)), this.#optional.files);
        return this;
    }

    public addOptionalFiles(fileNamesArray: ReadonlyArray<string> = [], ...fileNames: ReadonlyArray<string>): DirectoryRoot
    {
        this.#optional = new DirContents(this.#optional.directories, fileNamesArray.concat(this.#optional.files.concat(fileNames)));
        return this;
    }

    public missingRequiredDirs(): ReadonlyArray<string>
    {
        return this.#required.directories.filter(requiredDir => ! this.contains().directory(requiredDir));
    }

    public missingRequiredFiles(): ReadonlyArray<string>
    {
        return this.#required.files.filter(requiredFile => ! this.contains().file(requiredFile));
    }

    public missingOptionalDirs(): ReadonlyArray<string>
    {
        return this.#optional.directories.filter(optionalDir => ! this.contains().directory(optionalDir));
    }

    public missingOptionalFiles(): ReadonlyArray<string>
    {
        return this.#optional.files.filter(optionalFile => ! this.contains().file(optionalFile));
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
            [formatStringArray("files", this.fileSync().names),
            formatStringArray("directories", this.dirSync().names),
            formatStringArray("required files", this.getRequired().files),
            formatStringArray("required directories", this.getRequired().directories),
            formatStringArray("optional files", this.getOptional().files),
            formatStringArray("optional directories", this.getOptional().directories)];

        return `{\n  ${formattedObjStrArray.join(",\n\n  ")}\n}`;
    }
}

export {DirectoryRoot as default};
