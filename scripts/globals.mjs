"use-strict";

import {fileURLToPath} from "url";
import {dirname, join} from "path";

export const NPM_ROOT_DIR_PATH = dirname(dirname(fileURLToPath(import.meta.url)));

export const ROOT_PKG_JSON_PATH = join(NPM_ROOT_DIR_PATH, "package.json");

export const ROOT_DOCS_DIR_PATH = join(NPM_ROOT_DIR_PATH, "docs");

export const BUILD_DIR_PATH = join(NPM_ROOT_DIR_PATH, "build");
export const BUILD_DOCS_DIR_PATH = join(BUILD_DIR_PATH, "docs");
export const BUILD_TEST_DIR_PATH = join(BUILD_DIR_PATH, "test");
export const DIST_DIR_PATH = join(BUILD_DIR_PATH, "dist");
export const SRC_DIR_PATH = join(NPM_ROOT_DIR_PATH, "src");
export const SRC_MAIN_DIR_PATH = join(SRC_DIR_PATH, "main");

export default {NPM_ROOT_DIR_PATH,
                ROOT_PKG_JSON_PATH,
                BUILD_DIR_PATH,
                BUILD_DOCS_DIR_PATH,
                BUILD_TEST_DIR_PATH,
                DIST_DIR_PATH,
                ROOT_DOCS_DIR_PATH,
                SRC_DIR_PATH,
                SRC_MAIN_DIR_PATH};
