import { Config } from "../../../../types/node/config";
import { resolveProjectOptions, resolvePathOptions } from "./resolveOptions"
import { CreateWriteTemp } from "./createOptions"

function createApp(config: Config) {
    const projects = resolveProjectOptions(config.projects)
    const path = resolvePathOptions(config.dir)

    const writeTemp = CreateWriteTemp(path)
    const app = {
        projects,
        path,
        // utils
        writeTemp
    }

    return app
}

export function createBuildApp(config: Config) {
}

export function createDevApp(config: Config) {

}