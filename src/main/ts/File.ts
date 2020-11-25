import { AbstractElement, ElementStatus  } from "./AbstractElement";
import * as fs from 'fs';
import * as pathModule from 'path';

export class File extends AbstractElement
{
    constructor(filePath: string, fileStatus?: ElementStatus)
    {
        if (fileStatus)
        {
            if (fileStatus.isFile === false)
            {
                throw new IllegalFileStatusError("false file status for file");
            }
            else if (fileStatus.isDirectory)
            {
                throw new IllegalFileStatusError("true directory status for file");
            }
            else
            {
                super(filePath, fileStatus);
            }
        }
        else
        {
            super(filePath, {isDirectory: false, isFile: true});
        }
    }

    public getContents(): ReadonlyArray<string>
    {
        return super.getContents();
    }

    public size(): number
    {
        return super.size();
    }
}

class IllegalFileStatusError extends Error
{
    public constructor(msg: string)
    {
        super(msg);
    }
}
