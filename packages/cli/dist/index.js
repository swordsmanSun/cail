#!/usr/bin/env node

// src/main.ts
import { createRequire } from "module";
import { cwd as cwd2 } from "process";

// src/settings/build.ts
import { createApp, chalk, loadConfigObject, runHook } from "@tracer/node";
function setupBuild(ctx) {
  const { program, dirname } = ctx;
  program.command("build").description("Build to static site").action(async () => {
    const config = await loadConfigObject(dirname);
    const app = createApp(config);
    app.init();
    app.write();
    runHook("built");
    console.log(chalk.green("tracer build success"));
  });
}

// src/settings/dev.ts
import { createApp as createApp2, loadConfigObject as loadConfigObject2 } from "@tracer/node";

// src/utils/createWatchers.ts
import { DFSReduce } from "@tracer/utils";
import { join } from "path";
import { watch } from "chokidar";
import { cwd } from "process";
function createPackageJsonWatcher(app) {
  const { projects, analyze, write } = app;
  const filesToWatch = projects.reduce((pre, project) => [...pre, DFSReduce(project, (pre2, cur) => [...pre2, join(cur.path, cur.package)], [])], []);
  const watcher = watch(filesToWatch, {
    ignoreInitial: true
  });
  watcher.on("change", async () => {
    await analyze();
    write();
  });
  return watcher;
}
function createUserConfigWatcher(app, restartServer) {
  const configPath = join(cwd(), "tracer.config.ts");
  const watcher = watch(configPath, {
    ignoreInitial: true
  });
  watcher.on("change", async () => {
    await restartServer();
  });
  return watcher;
}

// src/settings/dev.ts
function setupDev(ctx) {
  const { program, dirname } = ctx;
  program.command("dev").description("dev to static site").action(async function dev() {
    const config = await loadConfigObject2(dirname);
    const app = createApp2(config);
    app.init();
    app.write();
    const closeServer = await app.bundler.dev(app);
    const restartServer = async () => {
      await Promise.all([
        ...watchers.map((watcher) => watcher.close()),
        closeServer
      ]);
      await dev();
    };
    const watchers = [
      createPackageJsonWatcher(app),
      createUserConfigWatcher(app, restartServer)
    ];
  });
}

// src/settings/version.ts
function setupVersion({ program, require: require2 }) {
  const version = require2("@tracer/node/package.json").version;
  const cliVersion = require2("@tracer/cli/package.json").version;
  program.name("tracer").description("analyzing the dependence of your project").version(
    `@tracer/node: ${version} 
@tracer/cli: ${cliVersion}`,
    "-v, --version",
    "output the current version"
  );
}

// src/main.ts
function cli(dirname) {
  const require2 = createRequire(import.meta.url);
  const { program } = require2("commander");
  const ctx = {
    program,
    require: require2,
    dirname
  };
  setupVersion(ctx);
  setupBuild(ctx);
  setupDev(ctx);
  program.parse();
}
cli(cwd2());
export {
  cli
};
