interface SiteData {
    /**
     * The base URL the site will be deployed at
     *
     * It should always start and end with a slash
     *
     * @default '/'
     */
    base: '/' | `/${string}/`
}

declare interface AppConfig extends SiteData {
    theme: Theme
    plugins?: Plugin[]
} 