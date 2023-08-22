import { PackageJsonObject } from '@tracer/utils';

interface Theme {
}

interface Plugin {
}

interface SiteDataConfig {
    /**
     * The base URL the site will be deployed at
     *
     * It should always start and end with a slash
     *
     * @default '/'
     */
    base?: '/' | `/${string}/`;
}
interface ProjectConfig {
    /**
     * The name of the project
     */
    name?: string;
    /**
     * The type of  package manager
     */
    type?: "npm" | "pnpm" | "yarn";
    /**
     * The path of the project
     */
    path: string;
    /**
     * The sub project
     */
    children?: ProjectConfig[];
}
interface ServerConfig {
    host?: string;
    port?: string;
    open?: boolean;
}
interface DirConfig {
    temp?: string;
}
declare interface Config extends SiteDataConfig {
    projects?: ProjectConfig[];
    theme?: Theme;
    plugins?: Plugin[];
    server?: ServerConfig;
    dir?: DirConfig;
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
    packageModule: PackageJsonObject;
    /**
     * Cyclic node or not
     */
    isCircular?: boolean;
    children?: DepNode[];
};
type DepTree = DepNode[];
type ProjectOptions = Required<ProjectConfig> & {
    /**
    * The object value of the package.json
    */
    packageModule: Partial<PackageJsonObject>;
    children: ProjectOptions[];
};
type PathOptions = {
    [key in keyof DirConfig]: (...relativePaths: string[]) => string;
};

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

declare function createBuildApp(config: Config): void;
declare function createDevApp(config: Config): void;

export { DepNode, DepTree, PathOptions, ProjectOptions, createBuildApp, createDevApp, defineConfig, getAnalyzerByName, getConfigFilePath, importConfigFile, loadConfigModule, loadConfigObject, npmAnalyzer, pnpmAnalyzer, yarnAnalyzer };
