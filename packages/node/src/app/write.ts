import debug from "debug"
import { App } from "../../types/options";
import { runHook } from "./hook";

const log = debug("@tracer/node:app")

function write(app: App) {
    log("write temporary files")

    writeAnalysis(app)
    writeConfigs(app)

    runHook("temped")

    log("write temporary files done")
}

export function CreateWriteFunction(app: App) {
    return () => write(app)
}

function writeAnalysis(app: App) {
    const { writeTemp, projects } = app
    const content = `export const projects = JSON.parse('${JSON.stringify(projects)}')`

    writeTemp("projects.js", content)
}

function writeConfigs(app: App) {
    const { writeTemp, userConfig } = app

    const content = `export const userConfig = JSON.parse('${JSON.stringify(userConfig)}')`

    writeTemp("userConfig.js", content)
}