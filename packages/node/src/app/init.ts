import { App, ProjectOptions } from "../../types/options";
import debug from "debug"
import { getAnalyzerByName } from "../analyzers";
import { runHook } from "./hook";

const log = debug("@tracer/node:app")
/**
 * init app
 * @param app app base data and utils
 */
export async function initApp(app: App) {
    log("initializing app...")
    const { use, plugins, projects, analyze } = app

    // call the plugin function
    plugins.forEach(plugin => use(plugin))

    // analyze the dependencies of each project
    await analyze()

    runHook("initialized", projects)

    log("initialize app done")
}
export function CreateInitAppFunction(app: App) {
    return () => initApp(app)
}