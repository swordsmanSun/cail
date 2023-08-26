import { Bundler } from '@tracer/bundler';
import { PackageJsonObject } from '@tracer/utils';

type Hooks = {
    temped: () => void;
    analyzing: (depNode: DepNode, depth: number) => void;
    watching: () => void;
    analyzed: (project: ProjectOptions) => void;
    built: () => void;
    initialized: (projects: ProjectOptions[]) => void;
};

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
type Visitor = Hooks["analyzing"];

type ProjectOptions = Omit<Required<ProjectConfig>, "children"> & {
    /**
    * The object value of the package.json
    */
    packageModule: Partial<PackageJsonObject>;
    children: ProjectOptions[];
    dependencyTree: DepTree;
};
type PathOptions = {
    [key in keyof DirConfig]: (...relativePaths: string[]) => string;
};
type ServerOptions = Required<ServerConfig>;
type BuildOptions = Required<buildConfig>;
type WriteTemp = (relativeFilePath: string, content: string) => string;
type APPBase = {
    base: '/' | `/${string}/`;
    projects: ProjectOptions[];
    plugins: PluginFunction[];
    path: PathOptions;
    server: ServerOptions;
    build: BuildOptions;
    bundler: Bundler;
};
type AppMethods = {
    use: (plugin: PluginFunction) => void;
    init: () => void;
    write: () => void;
    analyze: () => Promise<void>;
};
type AppUtils = {
    writeTemp: WriteTemp;
};
type App = APPBase & AppUtils & AppMethods;
type PluginFunction = (app: Omit<App, keyof AppMethods>) => void;
type PluginObjectUserSide = {
    name: string;
};
type PluginObject = PluginObjectUserSide;

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
    package?: string;
    /**
     * The sub project
     */
    children?: ProjectConfig[];
}
interface ServerConfig {
    host?: string;
    port?: number;
    open?: boolean;
    template?: string;
}
interface buildConfig {
    outDir?: string;
    template?: string;
}
interface DirConfig {
    temp?: string;
    cache?: string;
    public?: string;
    out?: string;
    root?: string;
}
declare interface Config extends SiteDataConfig {
    projects?: ProjectConfig[];
    plugins?: PluginFunction[];
    dir?: DirConfig;
    server?: ServerConfig;
    build?: buildConfig;
    bundler?: Bundler;
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

declare const getAnalyzerByName: (name: "npm" | "pnpm" | "yarn") => (projectPath: string, visitor: Visitor) => Promise<DepTree>;

declare function createApp(config: Config): Promise<App>;

declare const hooks: {
    analyzing: ((depNode: DepNode, depth: number) => void)[];
    analyzed: ((project: ProjectOptions) => void)[];
    initialized: ((projects: ProjectOptions[]) => void)[];
    temped: (() => void)[];
    watching: (() => void)[];
    built: (() => void)[];
};
declare function runHook<N extends keyof typeof hooks>(name: N, ...args: Parameters<Hooks[N]>): void;
declare function onTemped(fn: Hooks["temped"]): void;
declare function onAnalyzing(fn: Hooks["analyzing"]): void;
declare function onAnalyzed(fn: Hooks["analyzed"]): void;
declare function onBuilt(fn: Hooks["built"]): void;
declare function onWatching(fn: Hooks["watching"]): void;
declare function onInitialized(fn: Hooks["initialized"]): void;

declare function resolvePathOptions(dirConfig?: DirConfig, projectDir?: string): {
    root: (...relativePaths: string[]) => string;
    temp: (...relativePaths: string[]) => string;
    out: (...relativePaths: string[]) => string;
    cache: (...relativePaths: string[]) => string;
    public: (...relativePaths: string[]) => string;
};
declare function resolveProjectOptions(projectsConfigs?: ProjectConfig[], projectDir?: string): Promise<ProjectOptions[]>;
declare function resolveServerOptions(serverConfigs?: ServerConfig): ServerConfig;
declare function resolveBuildOptions(buildConfigs?: buildConfig): buildConfig;
declare function resolveBundlerOptions(bundlerConfigs?: Bundler): Bundler;

export { APPBase, App, AppMethods, AppUtils, BuildOptions, PathOptions, PluginFunction, PluginObject, PluginObjectUserSide, ProjectOptions, ServerOptions, WriteTemp, createApp, defineConfig, getAnalyzerByName, getConfigFilePath, importConfigFile, loadConfigModule, loadConfigObject, npmAnalyzer, onAnalyzed, onAnalyzing, onBuilt, onInitialized, onTemped, onWatching, pnpmAnalyzer, resolveBuildOptions, resolveBundlerOptions, resolvePathOptions, resolveProjectOptions, resolveServerOptions, runHook, yarnAnalyzer };
