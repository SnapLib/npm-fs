import { Directory } from "../Directory";

export class RootDirectory extends Directory
{
    public constructor(path: string)
    {
        super(path, {exists: true, isDirectory: true, isFile: false});
    }
}
