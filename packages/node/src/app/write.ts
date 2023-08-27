import { debug } from "@tracer/utils"
import { App } from "../../types/options";
import { runHook } from "./hook";
const log = debug("@tracer/node:app")

function write(app: App) {
    log("write temporary files")

    writeAnalysis(app)

    runHook("temped")

    log("write temporary files done")
}

export function CreateWriteFunction(app: App) {
    return () => write(app)
}

function writeAnalysis(app: App) {
    const { writeTemp, projects } = app
    const content = `export const projects = JSON.parse('${JSON.stringify(projects)}')`

    writeTemp("projectsData.js", content)
}