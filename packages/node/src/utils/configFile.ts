import { existsSync, unlinkSync } from "fs"
import { dirname, join } from "path"
import { Config } from "../../../../types/node/config"
import { cwd } from "process"
import { pathToFileURL } from "url"

/**
 * @param dirname current file execution directory
 * @returns absolute path of the config file
 */
export function getConfigFilePath(dirname = cwd()) {
    const extensions = ["ts", "js", "mjs"]
    const configFileName = "tracer.config"

    const extension = extensions.find(extension => existsSync(join(dirname, `${configFileName}.${extension}`)))

    return join(dirname, configFileName + "." + extension)
}
/**
 * @param filePath file absolute path
 * @returns current config object
 */
export async function importConfigFile(filePath: string) {
    const _cwd = dirname(filePath)
    // build file 
    const { build } = await import("esbuild")
    await build({
        absWorkingDir: _cwd,
        entryPoints: [filePath],
        outfile: "tracer.config.temp.js",
        platform: "node",
        bundle: true,
        format: "esm",
        external: ["esbuild"]
    })
    // import file
    const tempFilePath = join(_cwd, "tracer.config.temp.js")
    let module: { default: Config }
    try {
        // user environment
        module = await import(pathToFileURL(tempFilePath).href)
    } catch (error) {
        // testing environment
        module = await import(tempFilePath)
    }
    // remove file 
    unlinkSync(tempFilePath)

    return module as { default: Config }
}
/**
 * @param dirname current file execution directory
 * @returns the out module of the config file
 */
export async function loadConfigModule(dirname: string) {
    const filePath = getConfigFilePath(dirname)
    const module = await importConfigFile(filePath)
    return module
}
/**
 * @param dirname current file execution directory
 * @returns  the out default export object of the config file
 */
export async function loadConfigObject(dirname: string){
    const module = await loadConfigModule(dirname)

    if (!module.default){
        throw new Error("config file has no default export object")
    }

    return module.default
}