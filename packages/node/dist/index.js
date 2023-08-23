// src/helper/index.ts
function defineConfig(config) {
  return config;
}

// src/utils/configFile.ts
import { existsSync, unlinkSync } from "fs";
import { dirname, join } from "path";
import { cwd } from "process";
import { pathToFileURL } from "url";
function getConfigFilePath(dirname2 = cwd()) {
  const extensions = ["ts", "js", "mjs"];
  const configFileName = "tracer.config";
  const extension = extensions.find((extension2) => existsSync(join(dirname2, `${configFileName}.${extension2}`)));
  return join(dirname2, configFileName + "." + extension);
}
async function importConfigFile(filePath) {
  const _cwd = dirname(filePath);
  const { build } = await import("esbuild");
  await build({
    absWorkingDir: _cwd,
    entryPoints: [filePath],
    outfile: "tracer.config.temp.js",
    platform: "node",
    bundle: true,
    format: "esm",
    external: ["esbuild"]
  });
  const tempFilePath = join(_cwd, "tracer.config.temp.js");
  let module;
  try {
    module = await import(pathToFileURL(tempFilePath).href);
  } catch (error) {
    module = await import(tempFilePath);
  }
  unlinkSync(tempFilePath);
  return module;
}
async function loadConfigModule(dirname2) {
  const filePath = getConfigFilePath(dirname2);
  const module = await importConfigFile(filePath);
  return module;
}
async function loadConfigObject(dirname2) {
  const module = await loadConfigModule(dirname2);
  if (!module.default) {
    throw new Error("config file has no default export object");
  }
  return module.default;
}

// src/analyzers/npmAnalyzer.ts
import { importPackageJson } from "@tracer/utils";
async function npmAnalyzer(pkgJSONAbsPath, modulesDir) {
  const module = await importPackageJson(pkgJSONAbsPath);
  return 1;
}

// src/analyzers/pnpmAnalyzer.ts
import { importPackageJson as importPackageJson2 } from "@tracer/utils";
async function pnpmAnalyzer(pkgJSONAbsPath, modulesDir) {
  const module = await importPackageJson2(pkgJSONAbsPath);
  return 1;
}

// src/analyzers/yarnAnalyzer.ts
import { importPackageJson as importPackageJson3 } from "@tracer/utils";
async function yarnAnalyzer(pkgJSONAbsPath, modulesDir) {
  const module = await importPackageJson3(pkgJSONAbsPath);
  return 1;
}

// src/analyzers/base.ts
var getAnalyzerByName = (() => {
  const analyzerMap = {
    npm: npmAnalyzer,
    pnpm: pnpmAnalyzer,
    yarn: yarnAnalyzer
  };
  return (name) => {
    if (name in analyzerMap) {
      return analyzerMap[name];
    }
    throw new Error(`Analyzer ${name} not found`);
  };
})();

// src/app/resolveOptions.ts
import { importPackageJson as importPackageJson4 } from "@tracer/utils";

// src/app/createOptions.ts
import { outputFileSync } from "fs-extra";

// src/app/plugin.ts
import { chalk, debug } from "@tracer/utils";
var log = debug("@tracer/node:app");

// src/app/createApp.ts
function createBuildApp(config) {
}
function createDevApp(config) {
}
export {
  createBuildApp,
  createDevApp,
  defineConfig,
  getAnalyzerByName,
  getConfigFilePath,
  importConfigFile,
  loadConfigModule,
  loadConfigObject,
  npmAnalyzer,
  pnpmAnalyzer,
  yarnAnalyzer
};
