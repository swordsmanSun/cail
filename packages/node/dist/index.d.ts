import { PackageJsonModule } from '@tracer/utils';

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
interface Project {
    /**
     * The name of the project
     */
    name?: string;
    /**
     * The path of the project
     */
    path: string;
    /**
     * The sub project
     */
    children: Project[];
}
declare interface Config extends SiteData {
    projects: Project[];
    theme?: Theme;
    plugins?: Plugin[];
}

declare function defineConfig(config: Config): Config;

/**
 * @param dirname current file execution directory
 * @returns absolute path of the config file
 */
declare function getConfigFilePath(dirname?: string): string;
/**
 * @param filePath file absolute path
 * @returns current config object
 */
declare function importConfigFile(filePath: string): Promise<{
    default: Config;
}>;
/**
 * @param dirname current file execution directory
 * @returns the out module of the config file
 */
declare function loadConfigModule(dirname: string): Promise<{
    default: Config;
}>;
/**
 * @param dirname current file execution directory
 * @returns  the out default export object of the config file
 */
declare function loadConfigObject(dirname: string): Promise<Config>;

type DepNode = {
    /**
     * The object value of the package.json
     */
    packageModule: PackageJsonModule;
    /**
     * Cyclic node or not
     */
    isCircular?: boolean;
    children?: DepNode[];
};
type DepTree = DepNode[];

/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns
 */
declare function npmAnalyzer(pkgJSONAbsPath: string, modulesDir: string): Promise<DepTree>;

/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns
 */
declare function pnpmAnalyzer(pkgJSONAbsPath: string, modulesDir: string): Promise<DepTree>;

/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns
 */
declare function yarnAnalyzer(pkgJSONAbsPath: string, modulesDir: string): Promise<DepTree>;

declare const getAnalyzerByName: (name: "npm" | "pnpm" | "yarn") => typeof npmAnalyzer | typeof pnpmAnalyzer | typeof yarnAnalyzer;

export { DepNode, DepTree, defineConfig, getAnalyzerByName, getConfigFilePath, importConfigFile, loadConfigModule, loadConfigObject, npmAnalyzer, pnpmAnalyzer, yarnAnalyzer };
