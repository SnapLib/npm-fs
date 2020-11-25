import { AbstractElement, Type } from "./AbstractElement";
import * as fs from 'fs';
import * as pathModule from 'path';

export class File extends AbstractElement
{
    constructor(filePath: string)
    {
        super(filePath, Type.FILE);
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
