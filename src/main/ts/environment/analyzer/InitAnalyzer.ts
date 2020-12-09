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
        {required: new Map(ResourceScripts.REQUIRED.all.map(direntName => [direntName, InitAnalyzer.PROJECT_RESOURCES.parent.containsNameIgnoreCase(direntName)])),
         optional: new Map(ResourceScripts.OPTIONAL.all.map(direntName => [direntName, InitAnalyzer.PROJECT_RESOURCES.parent.containsNameIgnoreCase(direntName)]))};

    public static readonly RESOURCES =
        {required: new Map(ProjectResource.REQUIRED.all.map(direntName => [direntName, InitAnalyzer.PROJECT_RESOURCES.parent.containsNameIgnoreCase(direntName)])),
         optional: new Map(ProjectResource.OPTIONAL.all.map(direntName => [direntName, InitAnalyzer.PROJECT_RESOURCES.parent.containsNameIgnoreCase(direntName)]))};

    public static readonly ROOT =
        {required: new Map(Root.REQUIRED.all.map(direntName => [direntName, InitAnalyzer.NPM_ROOT.parent.containsNameIgnoreCase(direntName)])),
         optional: new Map(Root.OPTIONAL.all.map(direntName => [direntName, InitAnalyzer.NPM_ROOT.parent.containsNameIgnoreCase(direntName)]))};
}
