import { PackageJsonObject } from "@tracer/utils"
import { ProjectConfig, DirConfig, ServerConfig, buildConfig } from "./config"
import { DepTree } from "./dependency"
import { Bundler } from "@tracer/bundler"

export type ProjectOptions = Omit<Required<ProjectConfig>, "children"> & {
    /**
    * The object value of the package.json 
    */
    packageModule: Partial<PackageJsonObject>
    children: ProjectOptions[]
    dependencyTree: DepTree
}
export type PathOptions = {
    [key in keyof DirConfig]: (...relativePaths: string[]) => string
}
export type ServerOptions = Required<ServerConfig>
export type BuildOptions = Required<buildConfig>
export type WriteTemp = (relativeFilePath: string, content: string) => string
export type APPBase = {
    base: '/' | `/${string}/`,
    projects: ProjectOptions[]
    plugins: PluginFunction[]
    path: PathOptions
    server: ServerOptions
    build: BuildOptions
    bundler: Bundler
}
export type AppMethods = {
    use: (plugin: PluginFunction) => void
    init: () => void
    write: () => void
    analyze: () => Promise<void>
}
export type AppUtils = {
    writeTemp: WriteTemp
}
export type App = APPBase & AppUtils & AppMethods
export type PluginFunction = (app: Omit<App, keyof AppMethods>) => void
export type PluginObjectUserSide = {
    name: string,
}
export type PluginObject = PluginObjectUserSide /* & {
    hooks: {
        [key in keyof Hooks]: Hooks[key][]
    }
} */