import { pathToFileURL } from "url"
import { PackageJsonObject } from "../../types"
/**
 * @param fileAbsPath the absolute path of the module
 * @returns the out module of the config file
 */
export async function importModule<M>(fileAbsPath: string) {
    let module: M
    try {
        // testing environment
        module = await import(fileAbsPath)
    } catch (error) {
        // user environment
        module = await import(pathToFileURL(fileAbsPath).href)
    }
    return module
}
/**
 * @returns the default values of package.json
 */
export const packageJsonDefault = () => ({
    name: "",
    version: "",
    description: "",
    main: "",
    module: "",
    types: "",
    files: [],
    scripts: {},
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
    optionalDependencies: {},
    bundledDependencies: [],
    keywords: [],
})
/**
 * @param fileAbsPath the absolute path of package.json
 * @returns the out object of the package.json with default values
 */
export async function importPackageJson(fileAbsPath: string) {
    const module = (await importModule<{ default: Partial<PackageJsonObject> }>(fileAbsPath)).default
    // assign default values
    const pkg: PackageJsonObject = {
        ...packageJsonDefault(),
        ...module
    }
    return pkg
}