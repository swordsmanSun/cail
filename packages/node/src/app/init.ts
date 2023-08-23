import { App, ProjectOptions } from "../../types";
import { debug } from "@tracer/utils"
import { getAnalyzerByName } from "../analyzers";
import { runHook } from "./hook";

const log = debug("@tracer/node:app")
/**
 * init app
 * @param app app base data and utils
 */
export async function initApp(app: App) {
    log("init app")
    const { use, plugins, projects } = app

    // call the plugin function
    plugins.forEach(plugin => use(plugin))

    // analyze the dependencies of each project
    const depthTraverse = async (project: ProjectOptions, depth: number) => {
        if (!project) return
        const { children = [], type, path } = project

        const analyzer = getAnalyzerByName(type)
        // set dependency tree data
        // TODO  visitors are needed to visit each node
        project.dependencyTree = await analyzer(path, (node) => runHook("analyzing", node, depth))

        runHook("analyzed", project)

        for (const child of children) {
            await depthTraverse(child, depth + 1)
        }
    }
    for (const project of projects) {
        await depthTraverse(project, 0)
    }
    
    runHook("initialized", projects)

    log("init app done")
}
export function CreateInitAppFunction(app: App) {
    return () => initApp(app)
}