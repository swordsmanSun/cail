import { Bundler } from "@tracer/bundler"
import { PluginFunction } from "."

export interface SiteDataConfig {
    /**
     * The base URL the site will be deployed at
     *
     * It should always start and end with a slash
     *
     * @default '/'
     */
    base?: '/' | `/${string}/`
}
export interface ProjectConfig {
    /**
     * The name of the project
     */
    name?: string,
    /**
     * The type of  package manager
     */
    type?: "npm" | "pnpm" | "yarn"
    /**
     * The path of the project
     */
    path: string,
    /* 
    * the project info file
    */
    package?: string
    /**
     * The sub project
     */
    children?: ProjectConfig[]
}
export interface ServerConfig {
    host?: string,
    port?: number,
    open?: boolean
    template?: string
}
export interface buildConfig {
    outDir?: string
    template?: string
}
export interface DirConfig {
    temp?: string
    cache?: string
    public?: string
    out?: string
    root?: string
}

export declare interface Config extends SiteDataConfig {
    projects?: ProjectConfig[],
    // theme?: Theme
    plugins?: PluginFunction[],
    dir?: DirConfig,
    server?: ServerConfig,
    build?: buildConfig,
    bundler?: Bundler
}