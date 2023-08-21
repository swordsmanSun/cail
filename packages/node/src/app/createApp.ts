import { Config } from "../../../../types/node/config";
import { resolveProjectOptions, resolvePathOptions } from "./resolveOptions"
function createApp(config: Config) {
    const projects = resolveProjectOptions(config.projects)
    const path = resolvePathOptions(config.dir)

    const app = {
        projects,
        path
    }

    return app
}

export function createBuildApp(config: Config) {
}

export function createDevApp(config: Config) {

}