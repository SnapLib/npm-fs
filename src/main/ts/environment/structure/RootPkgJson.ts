export class RootPkgJson
{
    private static readonly REQUIRED_PROPERTIES: ReadonlyArray<string> =
        ["dependencies", "devDependencies", "name", "description",
         "license", "private", "scripts", "type", "version"];

    private static readonly REQUIRED_DEPENDENCIES: ReadonlyArray<string> =
        ["commander"];

    private static readonly REQUIRED_DEV_DEPENDENCIES: ReadonlyArray<string> =
        ["@types/chai", "@types/mocha", "@types/node",
         "@typescript-eslint/eslint-plugin", "@typescript-eslint/parser",
         "chai", "eslint", "mocha", "mochawesome", "ts-node", "tslib",
         "typedoc", "typescript"];

    private static readonly REQUIRED_SCRIPTS: ReadonlyArray<string> =
        ["clean", "lint", "test", "test-report"];

    public static readonly required = class
    {
        public static readonly properties: ReadonlyArray<string> =
            RootPkgJson.REQUIRED_PROPERTIES;

        public static readonly dependencies: ReadonlyArray<string> =
            RootPkgJson.REQUIRED_DEPENDENCIES;

        public static readonly devDependencies: ReadonlyArray<string> =
            RootPkgJson.REQUIRED_DEV_DEPENDENCIES;

        public static readonly scripts: ReadonlyArray<string> =
            RootPkgJson.REQUIRED_SCRIPTS;
    }
}
