// src/helper/index.ts
function defineConfig(config) {
  return config;
}

// src/utils/configFile.ts
import { existsSync, unlinkSync } from "fs";
import { dirname, join } from "path";
import { cwd } from "process";
import { importModule } from "@tracer/utils";
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
    // bundle: true,
    format: "esm"
    // external: ["esbuild", "@tracer/node"],
  });
  const tempFilePath = join(_cwd, "tracer.config.temp.js");
  let module = await importModule(tempFilePath);
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
function npmAnalyzer(pkgJSONAbsPath, modulesDir) {
  const module = importPackageJson(pkgJSONAbsPath);
  return 1;
}

// src/analyzers/pnpmAnalyzer.ts
import { importPackageJson as importPackageJson2 } from "@tracer/utils";
function pnpmAnalyzer(pkgJSONAbsPath, modulesDir) {
  const module = importPackageJson2(pkgJSONAbsPath);
  return 1;
}

// src/analyzers/yarnAnalyzer.ts
import { importPackageJson as importPackageJson3 } from "@tracer/utils";
function yarnAnalyzer(pkgJSONAbsPath, modulesDir) {
  const module = importPackageJson3(pkgJSONAbsPath);
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
import { join as join3, normalize, sep } from "path";
import { cwd as cwd2 } from "process";
import { bundler } from "@tracer/bundler";
function resolvePathOptions(dirConfig, projectDir) {
  const PathJoin = (basePath) => (...relativePaths) => join3(basePath, ...relativePaths);
  return {
    root: PathJoin(join3(dirConfig?.root ?? projectDir ?? cwd2(), "./analysis")),
    temp: PathJoin(join3(dirConfig?.temp ?? projectDir ?? cwd2(), "./analysis/.temp")),
    out: PathJoin(join3(dirConfig?.out ?? projectDir ?? cwd2(), "./analysis/dist")),
    cache: PathJoin(join3(dirConfig?.cache ?? projectDir ?? cwd2(), "./analysis/.cache")),
    public: PathJoin(join3(dirConfig?.out ?? projectDir ?? cwd2(), "./analysis/public"))
  };
}
function resolveProjectOptions(projectsConfigs, projectDir) {
  let projectOptionsList = [];
  if (!projectsConfigs?.length) {
    projectsConfigs = [];
    const packageJsonObject = importPackageJson4(join3(projectDir || cwd2(), "./package.json"));
    projectsConfigs.push({
      name: packageJsonObject.name,
      path: projectDir || cwd2() && normalize(projectDir || cwd2()).split(sep).join("/"),
      type: "npm",
      package: "package.json"
    });
  }
  const recursionTree = (node, parentChildren) => {
    if (!node)
      return;
    parentChildren.push({
      ...node,
      path: node.path && normalize(node.path).split(sep).join("/"),
      name: node.name || importPackageJson4(join3(node.path, "./package.json")).name,
      type: node.type || "npm",
      packageModule: importPackageJson4(join3(node.path, "./package.json")),
      children: [],
      dependencyTree: null,
      package: node.package || "package.json"
    });
    for (let index = 0; index < node.children?.length; index++) {
      const child = node.children[index];
      recursionTree(child, parentChildren[index].children);
    }
  };
  for (const projectsConfig of projectsConfigs) {
    recursionTree(projectsConfig, projectOptionsList);
  }
  return projectOptionsList;
}
function resolveServerOptions(serverConfigs) {
  return withDefault(serverConfigs, {
    port: 3001,
    host: "127.0.0.1",
    open: true,
    template: join3(cwd2(), "node_modules", "@tracer/client/templates/dev.html")
  });
}
function resolveBuildOptions(buildConfigs) {
  return withDefault(buildConfigs, {
    template: join3(cwd2(), "node_modules", "@tracer/client/templates/build.html")
  });
}
function resolveBundlerOptions(bundlerConfigs) {
  return withDefault(bundlerConfigs, bundler());
}

// src/app/createOptions.ts
import { outputFileSync } from "fs-extra/esm";

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

// src/app/createOptions.ts
function CreateWriteTemp(path) {
  return (relativeFilePath, content) => {
    const absoluteFilePath = path.temp(relativeFilePath);
    outputFileSync(absoluteFilePath, content);
    return absoluteFilePath;
  };
}
function CreateAnalyze(projects) {
  return async () => {
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
  };
}

// src/app/plugin.ts
import { chalk, debug } from "@tracer/utils";
var log = debug("@tracer/node:app");
var pluginsObject = /* @__PURE__ */ new WeakMap();
var activePluginFunction;
function getActivePlugin() {
  return activePluginFunction;
}
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
function defineOptions(pluginObject) {
  if (!activePluginFunction) {
    throw new Error("defineOptions must be called inside the plugin function");
  }
  let _pluginObject = pluginsObject.get(activePluginFunction);
  if (!_pluginObject) {
    const temp = { ...pluginObject };
    pluginsObject.set(getActivePlugin(), temp);
    _pluginObject = temp;
  }
  Object.keys(pluginObject).forEach((key) => {
    _pluginObject[key] = pluginObject[key];
  });
}
function getPluginObject(pluginFunction) {
  return pluginsObject.get(pluginFunction);
}

// src/app/init.ts
import { debug as debug2 } from "@tracer/utils";
var log2 = debug2("@tracer/node:app");
async function initApp(app) {
  log2("initializing app...");
  const { use, plugins, projects, analyze } = app;
  plugins.forEach((plugin) => use(plugin));
  await analyze();
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
function createApp(config, projectDir) {
  const projects = resolveProjectOptions(config.projects, projectDir);
  const path = resolvePathOptions(config.dir, projectDir);
  const plugins = config.plugins;
  const base = config.base ?? "/";
  const server = resolveServerOptions(config.server);
  const build = resolveBuildOptions(config.build);
  const bundler2 = resolveBundlerOptions(config.bundler);
  const writeTemp = CreateWriteTemp(path);
  let app = {
    base,
    projects,
    plugins,
    path,
    server,
    build,
    bundler: bundler2,
    // utils
    writeTemp
  };
  app.use = CreateUsePluginFunction(app);
  app.analyze = CreateAnalyze(app.projects);
  app.init = CreateInitAppFunction(app);
  app.write = CreateWriteFunction(app);
  return app;
}
export {
  CreateUsePluginFunction,
  createApp,
  defineConfig,
  defineOptions,
  getActivePlugin,
  getAnalyzerByName,
  getConfigFilePath,
  getPluginObject,
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
  resolveBundlerOptions,
  resolvePathOptions,
  resolveProjectOptions,
  resolveServerOptions,
  runHook,
  yarnAnalyzer
};
