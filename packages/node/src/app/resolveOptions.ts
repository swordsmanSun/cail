import { importPackageJson, withDefault } from "@tracer/utils";
import { join, normalize, sep } from "path";
import { cwd } from "process";
import { DirConfig, ProjectConfig, ServerConfig, buildConfig } from "../../types/config";
import { ProjectOptions } from "../../types/options";
import { Bundler, bundler } from "@tracer/bundler";
// process user config
export function resolvePathOptions(dirConfig?: DirConfig, projectDir?: string) {
    // assign default value
    const PathJoin = (basePath: string) => (...relativePaths: string[]) => join(basePath, ...relativePaths)
    return {
        root: PathJoin(join(dirConfig?.root ?? projectDir ?? cwd(), "./analysis")),
        temp: PathJoin(join(dirConfig?.temp ?? projectDir ?? cwd(), "./analysis/.temp")),
        out: PathJoin(join(dirConfig?.out ?? projectDir ?? cwd(), "./analysis/dist")),
        cache: PathJoin(join(dirConfig?.cache ?? projectDir ?? cwd(), "./analysis/.cache")),
        public: PathJoin(join(dirConfig?.out ?? projectDir ?? cwd(), "./analysis/public")),
    }
}

export function resolveProjectOptions(projectsConfigs?: ProjectConfig[], projectDir?: string) {
    let projectOptionsList: ProjectOptions[] = []
    // assign default value
    if (!projectsConfigs?.length) {
        projectsConfigs = []
        const packageJsonObject = importPackageJson(join(projectDir || cwd(), "./package.json"))
        projectsConfigs.push({
            name: packageJsonObject.name,
            path: projectDir || cwd() && normalize(projectDir || cwd()).split(sep).join("/"),
            type: "npm",
            package: "package.json"
        })
    }
    // resolve options
    const recursionTree = (node: ProjectConfig, parentChildren: ProjectOptions[]) => {
        if (!node) return

        parentChildren.push({
            ...node,
            path: node.path && normalize(node.path).split(sep).join("/"),
            name: node.name || importPackageJson(join(node.path, "./package.json")).name,
            type: node.type || "npm",
            packageModule: importPackageJson(join(node.path, "./package.json")),
            children: [],
            dependencyTree: null,
            package: node.package || "package.json",
        })

        for (let index = 0; index < node.children?.length; index++) {
            const child = node.children[index];
            recursionTree(child, parentChildren[index].children)
        }
    }

    for (const projectsConfig of projectsConfigs) {
        recursionTree(projectsConfig, projectOptionsList)
    }

    return projectOptionsList
}
export function resolveServerOptions(serverConfigs?: ServerConfig) {
    return withDefault<ServerConfig>(serverConfigs, {
        port: 3001,
        host: "127.0.0.1",
        open: true,
        template: join(cwd(), "node_modules", "@tracer/client/templates/dev.html")
    })
}
export function resolveBuildOptions(buildConfigs?: buildConfig) {
    return withDefault<buildConfig>(buildConfigs, {
        template: join(cwd(), "node_modules", "@tracer/client/templates/build.html")
    })
}

export function resolveBundlerOptions(bundlerConfigs?: Bundler) {
    return withDefault(bundlerConfigs, bundler())
}