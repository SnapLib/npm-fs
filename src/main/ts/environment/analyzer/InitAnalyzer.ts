import { ResourceScripts } from "../structure/ResourceScripts";
import { ProjectResource } from "../structure/ProjectResource";
import { Root } from "../structure/Root";
import { Analyzer } from "./Analyzer";

export class InitAnalyzer
{
    private static readonly RESOURCE_SCRIPTS: Analyzer = new Analyzer(__dirname);

    private static readonly PROJECT_RESOURCES: Analyzer = new Analyzer(InitAnalyzer.RESOURCE_SCRIPTS.parent.path);

    private static readonly NPM_ROOT: Analyzer = new Analyzer(InitAnalyzer.PROJECT_RESOURCES.parent.path);

    public static readonly SCRIPTS =
        {required: {files: new Map(ResourceScripts.REQUIRED.files.map(fileName => [fileName, InitAnalyzer.RESOURCE_SCRIPTS.parent.containsFileNameIgnoreCase(fileName)])), directories: new Map(ResourceScripts.REQUIRED.directories.map(dirName => [dirName, InitAnalyzer.RESOURCE_SCRIPTS.parent.containsDirNameIgnoreCase(dirName)]))},
         optional: {files: new Map(ResourceScripts.OPTIONAL.files.map(fileName => [fileName, InitAnalyzer.RESOURCE_SCRIPTS.parent.containsFileNameIgnoreCase(fileName)])), directories: new Map(ResourceScripts.OPTIONAL.directories.map(dirName => [dirName, InitAnalyzer.RESOURCE_SCRIPTS.parent.containsDirNameIgnoreCase(dirName)]))}};

    public static readonly RESOURCES =
        {required: {files: new Map(ProjectResource.REQUIRED.files.map(fileName => [fileName, InitAnalyzer.PROJECT_RESOURCES.parent.containsFileNameIgnoreCase(fileName)])), directories: new Map(ProjectResource.REQUIRED.directories.map(dirName => [dirName, InitAnalyzer.PROJECT_RESOURCES.parent.containsDirNameIgnoreCase(dirName)]))},
         optional: {files: new Map(ProjectResource.OPTIONAL.files.map(fileName => [fileName, InitAnalyzer.PROJECT_RESOURCES.parent.containsFileNameIgnoreCase(fileName)])), directories: new Map(ProjectResource.OPTIONAL.directories.map(dirName => [dirName, InitAnalyzer.PROJECT_RESOURCES.parent.containsDirNameIgnoreCase(dirName)]))}};

    public static readonly ROOT =
        {required: {files: new Map(Root.REQUIRED.files.map(fileName => [fileName, InitAnalyzer.NPM_ROOT.parent.containsFileNameIgnoreCase(fileName)])), directories: new Map(Root.REQUIRED.directories.map(dirName => [dirName, InitAnalyzer.NPM_ROOT.parent.containsDirNameIgnoreCase(dirName)]))},
         optional: {files: new Map(Root.OPTIONAL.files.map(fileName => [fileName, InitAnalyzer.NPM_ROOT.parent.containsFileNameIgnoreCase(fileName)])), directories: new Map(Root.OPTIONAL.directories.map(dirName => [dirName, InitAnalyzer.NPM_ROOT.parent.containsDirNameIgnoreCase(dirName)]))}};
}

console.log(InitAnalyzer.ROOT);
