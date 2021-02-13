import { join, resolve } from "path";

export const TEST_RESOURCES = resolve(join(__dirname, "..", "resources"));
export const PROJECT_PKG_ROOT = resolve(join(__dirname, "..", "..", ".."));

export const project =
{
    root:
    {
        dir: join(PROJECT_PKG_ROOT),
        packageJson: join(PROJECT_PKG_ROOT, "package.json"),
        tsconfig: join(PROJECT_PKG_ROOT, "tsconfig.json")
    },

    src:
    {
        dir: join(PROJECT_PKG_ROOT, "src", "main", "ts"),
        tsconfig: join(PROJECT_PKG_ROOT, "src", "main", "ts", "tsconfig.src.json")
    },

    test:
    {
        dir: __dirname,
        resources: TEST_RESOURCES
    }
};

export {project as default};
