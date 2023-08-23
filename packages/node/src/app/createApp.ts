import { Config } from "../../types/config";
import { resolveProjectOptions, resolvePathOptions } from "./resolveOptions"
import { CreateWriteTemp } from "./createOptions"
import { App, APPBase, AppMethods, AppUtils } from "../../types";
import { CreateUsePluginFunction } from "./plugin";
import { CreateInitAppFunction } from "./init";
import { CreateWriteFunction } from "./write";

async function createApp(config: Config) {
    // app base data
    const projects = await resolveProjectOptions(config.projects)
    const plugins = config.plugins
    const path = resolvePathOptions(config.dir)
    // app utils
    const writeTemp = CreateWriteTemp(path)
    let app = {
        projects,
        plugins,
        path,
        // utils
        writeTemp,
    } as App
    // app methods
    app.use = CreateUsePluginFunction(app)
    app.init = CreateInitAppFunction(app)
    app.write = CreateWriteFunction(app)

    return app
}

export function createBuildApp(config: Config) {
}

export function createDevApp(config: Config) {

}