export interface PackageJsonObject {
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
    }
    devDependencies: {
        [key: string]: string;
    }
    peerDependencies: {
        [key: string]: string;
    }
    optionalDependencies: {
        [key: string]: string;
    }
    bundledDependencies: string[];
    keywords: string[];
}