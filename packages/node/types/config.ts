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
    /**
     * The sub project
     */
    children?: ProjectConfig[]
}
export interface ServerConfig {
    host?: string,
    port?: string,
    open?: boolean
}
export interface DirConfig {
    temp?: string
}

export declare interface Config extends SiteDataConfig {
    projects?: ProjectConfig[],
    // theme?: Theme
    plugins?: PluginFunction[],
    server?: ServerConfig,
    dir?: DirConfig
}