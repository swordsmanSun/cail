// src/helper/index.ts
function defineConfig(config) {
  return config;
}

// src/utils/configFile.ts
import { existsSync } from "fs";
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
  const module = await import(pathToFileURL(tempFilePath).href);
  return module;
}
async function loadConfigModule(dirname2) {
  const filePath = getConfigFilePath(dirname2);
  const module = await importConfigFile(filePath);
  return module;
}
export {
  defineConfig,
  getConfigFilePath,
  importConfigFile,
  loadConfigModule
};
