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
import { join as join2 } from "path";
var getAnalyzerByName = (() => {
  const analyzerMap = {
    npm: npmAnalyzer,
    pnpm: pnpmAnalyzer,
    yarn: yarnAnalyzer
  };
  return (name) => {
    if (name in analyzerMap) {
      return NodeAnalyzer(analyzerMap[name]);
    }
    throw new Error(`Analyzer ${name} not found`);
  };
})();
function NodeAnalyzer(analyzer) {
  return (projectPath, visitor) => {
    return analyzer(join2(projectPath, "package.json"), join2(projectPath, "node_modules"));
  };
}

// src/app/resolveOptions.ts
import { importPackageJson as importPackageJson4, withDefault } from "@tracer/utils";
import { join as join3 } from "path";
import { cwd as cwd2 } from "process";
function resolvePathOptions(dirConfig, projectDir) {
  const PathJoin = (basePath) => (...relativePaths) => join3(basePath, ...relativePaths);
  return {
    root: PathJoin(join3(dirConfig?.root ?? projectDir ?? cwd2(), "./analysis/")),
    temp: PathJoin(join3(dirConfig?.temp ?? projectDir ?? cwd2(), "./analysis/.temp/")),
    out: PathJoin(join3(dirConfig?.out ?? projectDir ?? cwd2(), "./analysis/dist/")),
    cache: PathJoin(join3(dirConfig?.cache ?? projectDir ?? cwd2(), "./analysis/.cache/")),
    public: PathJoin(join3(dirConfig?.out ?? projectDir ?? cwd2(), "./analysis/public/"))
  };
}
async function resolveProjectOptions(projectsConfigs, projectDir) {
  let projectOptionsList = [];
  if (!projectsConfigs?.length) {
    projectsConfigs = [];
    const packageJsonObject = await importPackageJson4(join3(projectDir || cwd2(), "./package.json"));
    projectsConfigs.push({
      name: packageJsonObject.name,
      path: projectDir || cwd2(),
      type: "npm"
    });
  }
  const recursionTree = async (node, parentChildren) => {
    if (!node)
      return;
    parentChildren.push({
      ...node,
      name: node.name || (await importPackageJson4(join3(node.path, "./package.json"))).name,
      type: node.type || "npm",
      packageModule: await importPackageJson4(join3(node.path, "./package.json")),
      children: [],
      dependencyTree: null
    });
    for (let index = 0; index < node.children?.length; index++) {
      const child = node.children[index];
      await recursionTree(child, parentChildren[index].children);
    }
  };
  for (const projectsConfig of projectsConfigs) {
    await recursionTree(projectsConfig, projectOptionsList);
  }
  return projectOptionsList;
}
function resolveServerOptions(serverConfig) {
  return withDefault(serverConfig, {
    port: 3001,
    host: "127.0.0.1",
    open: true,
    template: "@tracer/client/templates/dev.html"
  });
}
function resolveBuildOptions(buildConfig) {
  return withDefault(buildConfig, {
    template: "@tracer/client/templates/build.html"
  });
}

// src/app/createOptions.ts
import { outputFileSync } from "fs-extra";
function CreateWriteTemp(path) {
  return (relativeFilePath, content) => {
    const absoluteFilePath = path.temp(relativeFilePath);
    outputFileSync(absoluteFilePath, content);
    return absoluteFilePath;
  };
}

// src/app/plugin.ts
import { chalk, debug } from "@tracer/utils";
var log = debug("@tracer/node:app");
var pluginsObject = /* @__PURE__ */ new WeakMap();
var activePluginFunction;
function CreateUsePluginFunction(app) {
  const usePluginFn = (plugin) => {
    activePluginFunction = plugin;
    plugin(app);
    const pluginObject = getPluginObject(plugin);
    if (!pluginObject?.name) {
      throw new Error("plugin must have a name");
    }
    log(`use plugin ${chalk.blue(pluginObject.name)}`);
    return app;
  };
  return usePluginFn;
}
function getPluginObject(pluginFunction) {
  return pluginsObject.get(pluginFunction);
}

// src/app/init.ts
import { debug as debug2 } from "@tracer/utils";

// src/app/hook.ts
var hooks = {
  analyzing: [],
  analyzed: [],
  initialized: [],
  temped: [],
  watching: [],
  built: []
};
function runHook(name, ...args) {
  for (const hook of hooks[name]) {
    hook(...args);
  }
}
function onTemped(fn) {
  hooks.temped.push(fn);
}
function onAnalyzing(fn) {
  hooks.analyzing.push(fn);
}
function onAnalyzed(fn) {
  hooks.analyzed.push(fn);
}
function onBuilt(fn) {
  hooks.built.push(fn);
}
function onWatching(fn) {
  hooks.watching.push(fn);
}
function onInitialized(fn) {
  hooks.initialized.push(fn);
}

// src/app/init.ts
var log2 = debug2("@tracer/node:app");
async function initApp(app) {
  log2("initializing app...");
  const { use, plugins, projects } = app;
  plugins.forEach((plugin) => use(plugin));
  const depthTraverse = async (project, depth) => {
    if (!project)
      return;
    const { children = [], type, path } = project;
    const analyzer = getAnalyzerByName(type);
    project.dependencyTree = await analyzer(path, (node) => runHook("analyzing", node, depth));
    runHook("analyzed", project);
    for (const child of children) {
      await depthTraverse(child, depth + 1);
    }
  };
  for (const project of projects) {
    await depthTraverse(project, 0);
  }
  runHook("initialized", projects);
  log2("initialize app done");
}
function CreateInitAppFunction(app) {
  return () => initApp(app);
}

// src/app/write.ts
import { debug as debug3 } from "@tracer/utils";
var log3 = debug3("@tracer/node:app");
function write(app) {
  log3("write temporary files");
  writeAnalysis(app);
  runHook("temped");
  log3("write temporary files done");
}
function CreateWriteFunction(app) {
  return () => write(app);
}
function writeAnalysis(app) {
  const { writeTemp, projects } = app;
  const content = `export const projects = JSON.parse('${JSON.stringify(projects)}')`;
  writeTemp("projectsData.js", content);
}

// src/app/createApp.ts
async function createApp(config) {
  const projects = await resolveProjectOptions(config.projects);
  const path = resolvePathOptions(config.dir);
  const plugins = config.plugins;
  const base = config.base ?? "/";
  const server = resolveServerOptions(config.server);
  const build = resolveBuildOptions(config.build);
  const writeTemp = CreateWriteTemp(path);
  let app = {
    base,
    projects,
    plugins,
    path,
    server,
    build,
    // utils
    writeTemp
  };
  app.use = CreateUsePluginFunction(app);
  app.init = CreateInitAppFunction(app);
  app.write = CreateWriteFunction(app);
  return app;
}
export {
  createApp,
  defineConfig,
  getAnalyzerByName,
  getConfigFilePath,
  importConfigFile,
  loadConfigModule,
  loadConfigObject,
  npmAnalyzer,
  onAnalyzed,
  onAnalyzing,
  onBuilt,
  onInitialized,
  onTemped,
  onWatching,
  pnpmAnalyzer,
  resolveBuildOptions,
  resolvePathOptions,
  resolveProjectOptions,
  resolveServerOptions,
  runHook,
  yarnAnalyzer
};
