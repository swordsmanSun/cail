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

/**
 * @param dirname 当前执行目录
 * @returns 配置文件绝对路径
 */
declare function getConfigFilePath(dirname?: string): string;
/**
 * @param filePath 文件绝对路径
 * @param _cwd 当前执行目录
 * @returns 配置对象
 */
declare function importConfigFile(filePath: string): Promise<{
    default: Config;
}>;
declare function loadConfigModule(dirname: string): Promise<{
    default: Config;
}>;

export { defineConfig, getConfigFilePath, importConfigFile, loadConfigModule };
