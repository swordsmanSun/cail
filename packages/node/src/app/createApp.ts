import { Config } from "../../types/config";
import { resolveProjectOptions, resolvePathOptions, resolveServerOptions, resolveBuildOptions } from "./resolveOptions"
import { CreateWriteTemp } from "./createOptions"
import { App, APPBase, AppMethods, AppUtils } from "../../types";
import { CreateUsePluginFunction } from "./plugin";
import { CreateInitAppFunction } from "./init";
import { CreateWriteFunction } from "./write";

export async function createApp(config: Config) {
    // app base data
    const projects = await resolveProjectOptions(config.projects)
    const path = resolvePathOptions(config.dir)
    const plugins = config.plugins
    const base = config.base ?? "/"
    const server = resolveServerOptions(config.server)
    const build = resolveBuildOptions(config.build)
    // app utils
    const writeTemp = CreateWriteTemp(path)
    let app = {
        base,
        projects,
        plugins,
        path,
        server,
        build,
        // utils
        writeTemp,
    } as App
    // app methods
    app.use = CreateUsePluginFunction(app)
    // the call init must after the call to use
    app.init = CreateInitAppFunction(app)
    app.write = CreateWriteFunction(app)

    return app
}

// export function createBuildApp(config: Config) {

// }

// export function createDevApp(config: Config) {

// }