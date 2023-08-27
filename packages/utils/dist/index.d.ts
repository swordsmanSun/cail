export { default as debug } from 'debug';
export { default as chalk } from 'chalk';

type Cast<A, B> = A extends B ? A : B;
type TupleLast<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;

declare function Pipe<Fns extends ((...args: unknown[]) => unknown)[]>(...fns: Fns): (...args: Parameters<Fns[0]>) => ReturnType<Cast<TupleLast<Fns>, (...args: unknown[]) => unknown>>;

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

declare function withDefault<T>(value: Partial<T>, defaultValue: T): T;

declare function DFS<T>(tree: T | T[], callbackFn: (node: T) => any, props?: {
    children?: string;
}): void;
declare function BFS<T>(tree: T | T[], callbackFn: (node: T) => any, props?: {
    children?: string;
}): void;
declare function DFSReduce<T, R, I = undefined>(tree: T | T[], callbackFn: (previousValue: I extends undefined ? Record<any, any> : I, currentValue: T) => R, initialValue?: I, props?: {
    children?: string;
}): I extends undefined ? R : I;

export { BFS, DFS, DFSReduce, PackageJsonObject, Pipe, importJson, importModule, importPackageJson, packageJsonDefault, withDefault };
