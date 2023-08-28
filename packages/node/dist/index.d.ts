export { default as debug } from 'debug';
export { default as chalk } from 'chalk';
import { Bundler } from '@tracer/bundler';

type Hooks = {
    temped: () => void;
    analyzing: (depNode: DepNode, depth: number) => void;
    watching: () => void;
    analyzed: (project: ProjectOptions) => void;
    built: () => void;
    initialized: (projects: ProjectOptions[]) => void;
};

interface PackageJsonObject {
    name: string;
    version: string;
    description: string;
    main: string;
    module: string;
    types: string;
    files: string[];
    scripts: {
        [key: string]: string;
    };
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
    peerDependencies: {
        [key: string]: string;
    };
    optionalDependencies: {
        [key: string]: string;
    };
    bundledDependencies: string[];
    keywords: string[];
}

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
type DepForest = DepNode[];
type Visitor = Hooks["analyzing"];

type ProjectOptions = Omit<Required<ProjectConfig>, "children"> & {
    /**
    * The object value of the package.json
    */
    packageModule: Partial<PackageJsonObject>;
    children: ProjectOptions[];
    dependencyTree: DepForest;
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
    userConfig: Config;
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
 * @param fileAbsPath the absolute path of the module
 * @returns the out module of the config file
 */
declare function importModule<M>(fileAbsPath: string): Promise<M>;
declare function importJson(fileAbsPath: string): any;
/**
 * @returns the default values of package.json
 */
declare const packageJsonDefault: () => {
    name: string;
    version: string;
    description: string;
    main: string;
    module: string;
    types: string;
    files: any[];
    scripts: {};
    dependencies: {};
    devDependencies: {};
    peerDependencies: {};
    optionalDependencies: {};
    bundledDependencies: any[];
    keywords: any[];
};
/**
 * @param fileAbsPath the absolute path of package.json
 * @returns the out object of the package.json with default values
 */
declare function importPackageJson(fileAbsPath: string): PackageJsonObject;

/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns
 */
declare function npmAnalyzer(pkgJSONAbsPath: string, modulesDir: string): DepForest;

/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns
 */
declare function pnpmAnalyzer(pkgJSONAbsPath: string, modulesDir: string): DepForest;

/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns
 */
declare function yarnAnalyzer(pkgJSONAbsPath: string, modulesDir: string): DepForest;

declare const getAnalyzerByName: (name: "npm" | "pnpm" | "yarn") => (projectPath: string, visitor: Visitor) => DepForest;

declare function createApp(config: Config, projectDir?: string): App;

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
declare function resolveProjectOptions(projectsConfigs?: ProjectConfig[], projectDir?: string): ProjectOptions[];
declare function resolveServerOptions(serverConfigs?: ServerConfig): ServerConfig;
declare function resolveBuildOptions(buildConfigs?: buildConfig): buildConfig;
declare function resolveBundlerOptions(bundlerConfigs?: Bundler): Bundler;

declare function getActivePlugin(): PluginFunction;
/**
 * create use plugin method for tracer app
 * @param app app base data and utils
 * @returns use plugin method
 */
declare function CreateUsePluginFunction(app: Omit<App, keyof AppMethods>): (plugin: PluginFunction) => Omit<App, keyof AppMethods>;
/**
 * define the plugin info, the call to this function mus be inside the plugin function
 * @param pluginObject plugin object
 */
declare function defineOptions(pluginObject: PluginObjectUserSide): void;
declare function getPluginObject(pluginFunction: PluginFunction): PluginObjectUserSide;

export { APPBase, App, AppMethods, AppUtils, BuildOptions, CreateUsePluginFunction, DepForest, DepNode, PathOptions, PluginFunction, PluginObject, PluginObjectUserSide, ProjectOptions, ServerOptions, Visitor, WriteTemp, createApp, defineConfig, defineOptions, getActivePlugin, getAnalyzerByName, getConfigFilePath, getPluginObject, importConfigFile, importJson, importModule, importPackageJson, loadConfigModule, loadConfigObject, npmAnalyzer, onAnalyzed, onAnalyzing, onBuilt, onInitialized, onTemped, onWatching, packageJsonDefault, pnpmAnalyzer, resolveBuildOptions, resolveBundlerOptions, resolvePathOptions, resolveProjectOptions, resolveServerOptions, runHook, yarnAnalyzer };
