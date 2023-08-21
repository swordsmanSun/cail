import { Theme } from "./theme"
import { Plugin } from "./plugin"

interface SiteData {
    /**
     * The base URL the site will be deployed at
     *
     * It should always start and end with a slash
     *
     * @default '/'
     */
    base?: '/' | `/${string}/`
}
interface Project {
    /**
     * The name of the project
     */
    name?: string,
    /**
     * The path of the project
     */
    path: string,
    /**
     * The sub project
     */
    children: Project[]
}

export declare interface Config extends SiteData {
    projects: Project[],
    theme?: Theme
    plugins?: Plugin[]
} 