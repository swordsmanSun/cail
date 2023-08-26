import { Config } from "../../types/config";
import { resolveProjectOptions, resolvePathOptions, resolveServerOptions, resolveBuildOptions, resolveBundlerOptions } from "./resolveOptions"
import { CreateAnalyze, CreateWriteTemp } from "./createOptions"
import { App } from "../../types";
import { CreateUsePluginFunction } from "./plugin";
import { CreateInitAppFunction } from "./init";
import { CreateWriteFunction } from "./write";

export async function createApp(config: Config, projectDir?: string) {
    // app base data
    const projects = await resolveProjectOptions(config.projects, projectDir)
    const path = resolvePathOptions(config.dir, projectDir)
    const plugins = config.plugins
    const base = config.base ?? "/"
    const server = resolveServerOptions(config.server)
    const build = resolveBuildOptions(config.build)
    const bundler = resolveBundlerOptions(config.bundler)
    // const bundler = resolve
    // app utils
    const writeTemp = CreateWriteTemp(path)
    let app = {
        base,
        projects,
        plugins,
        path,
        server,
        build,
        bundler,
        // utils
        writeTemp,
    } as App
    // app methods
    app.use = CreateUsePluginFunction(app)
    app.analyze = CreateAnalyze(app.projects)
    // the call init must after the call to use
    app.init = CreateInitAppFunction(app)
    app.write = CreateWriteFunction(app)

    return app
}

// export function createBuildApp(config: Config) {

// }

// export function createDevApp(config: Config) {

// }