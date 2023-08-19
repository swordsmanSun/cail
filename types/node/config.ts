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

export declare interface Config extends SiteData {
    theme?: Theme
    plugins?: Plugin[]
} 