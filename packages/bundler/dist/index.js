// src/build/index.ts
import { debug } from "@tracer/node";

// src/utils/resolveOptions.ts
import vuePlugin from "@vitejs/plugin-vue";
import { mergeConfig } from "vite";

// src/utils/viteTracerPlugin.ts
import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
function vitePluginTracer(props) {
  const { app, isBuild } = props;
  return {
    name: "vite-plugin-tracer",
    async config() {
      app.writeTemp("../index.html", readFileSync(app.server.template).toString());
      return {
        root: app.path.root(),
        base: app.base,
        mode: isBuild ? "development" : "production",
        publicDir: app.path.public(),
        cacheDir: app.path.cache(),
        resolve: {
          alias: resolveAlias(app.path)
        },
        server: {
          host: app.server.host,
          port: app.server.port,
          open: app.server.open
        },
        build: {
          outDir: app.path.out()
        }
      };
    }
  };
}
function resolveAlias(path) {
  const sysAlias = Object.keys(path).map((key) => ({
    find: `@${key}`,
    replacement: path[key]()
  }));
  return [
    ...sysAlias,
    // client alias
    {
      find: "@",
      replacement: join(cwd(), "node_modules/@tracer/client/src")
    }
  ];
}

// src/utils/resolveOptions.ts
function resolveViteOptions(props) {
  const { app, bundlerConfigs, isBuild } = props;
  return mergeConfig(
    {
      configFile: false,
      plugins: [
        vuePlugin(bundlerConfigs?.vuePlugin),
        vitePluginTracer({ app, isBuild })
      ]
    },
    bundlerConfigs?.vite
  );
}

// src/build/index.ts
var log = debug("@tracer/bundler:build");
async function build(bundlerConfigs, app) {
  log("compiling app...");
  const viteOptions = resolveViteOptions({ app, bundlerConfigs, isBuild: true });
  log("compile app done");
}

// src/dev/index.ts
import { createServer } from "vite";
import { chalk, importPackageJson } from "@tracer/node";
import { dirname, join as join2 } from "path";
import { fileURLToPath } from "url";
async function dev(bundlerConfigs, app) {
  const { server: { host, port } } = app;
  const viteOptions = resolveViteOptions({ app, bundlerConfigs, isBuild: false });
  const server = await createServer(viteOptions);
  await server.listen();
  const viteVersion = importPackageJson(join2(dirname(fileURLToPath(import.meta.url)), "../node_modules/vite/package.json")).version;
  server.config.logger.info(
    chalk.cyan(`
vite v${viteVersion}
`) + chalk.green(`dev server running at:	http://${host}:${port}`),
    {
      clear: !server.config.logger.hasWarned
    }
  );
  return server.close.bind(server);
}

// src/index.ts
function bundler(options) {
  return {
    dev: (app) => dev(options, app),
    build: (app) => build(options, app)
  };
}
export {
  bundler
};
