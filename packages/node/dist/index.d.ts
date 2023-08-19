interface Theme {
}

interface Plugin {
}

interface SiteData {
    /**
     * The base URL the site will be deployed at
     *
     * It should always start and end with a slash
     *
     * @default '/'
     */
    base?: '/' | `/${string}/`;
}
declare interface Config extends SiteData {
    theme?: Theme;
    plugins?: Plugin[];
}

declare function defineConfig(config: Config): Config;

export { defineConfig };
