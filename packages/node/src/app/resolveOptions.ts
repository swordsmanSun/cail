import { importPackageJson } from "@tracer/utils";
import { join } from "path";
import { cwd } from "process";
import { DirConfig, ProjectConfig } from "../../types/config";
import { ProjectOptions } from "../../types";
// process user config
export function resolvePathOptions(dirConfig?: DirConfig, projectDir?: string) {
    // assign default value
    const PathJoin = (basePath: string) => (...relativePaths: string[]) => join(basePath, ...relativePaths)
    return {
        temp: PathJoin(join(dirConfig?.temp ?? projectDir ?? cwd(), "./analysis/temp"))
    }
}

export async function resolveProjectOptions(projectsConfigs?: ProjectConfig[], projectDir?: string) {
    let projectOptionsList: ProjectOptions[] = []
    // assign default value
    if (!projectsConfigs?.length) {
        projectsConfigs = []
        const packageJsonObject = await importPackageJson(join(projectDir || cwd(), "./package.json"))
        projectsConfigs.push({
            name: packageJsonObject.name,
            path: projectDir || cwd(),
            type: "npm"
        })
    }
    // resolve options
    const recursionTree = async (node: ProjectConfig, parentChildren: ProjectOptions[]) => {
        if (!node) return

        parentChildren.push({
            ...node,
            name: node.name || (await importPackageJson(join(node.path, "./package.json"))).name,
            type: node.type || "npm",
            packageModule: await importPackageJson(join(node.path, "./package.json")),
            children: [],
            dependencyTree: null
        })

        for (let index = 0; index < node.children?.length; index++) {
            const child = node.children[index];
            await recursionTree(child, parentChildren[index].children)
        }
    }

    for (const projectsConfig of projectsConfigs) {
        await recursionTree(projectsConfig, projectOptionsList)
    }

    return projectOptionsList
}