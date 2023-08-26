import { outputFileSync } from "fs-extra/esm"
import { App, PathOptions, ProjectOptions, WriteTemp } from "../../types"
import { getAnalyzerByName } from "../analyzers"
import { runHook } from "./hook"
/**
 * create write temp file util for tracer app
 * @param path path options
 * @returns write temp file util
 */
export function CreateWriteTemp(path: PathOptions): WriteTemp {
    return (relativeFilePath: string, content: string) => {
        const absoluteFilePath = path.temp(relativeFilePath)
        outputFileSync(absoluteFilePath, content)
        return absoluteFilePath
    }
}

export function CreateAnalyze(projects: App["projects"]) {
    return async () => {
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
    }
}