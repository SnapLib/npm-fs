"use-strict";

import {fileURLToPath} from "url";
import {dirname} from "path";

export const NPM_ROOT_DIR_PATH = dirname(dirname(fileURLToPath(import.meta.url)));
