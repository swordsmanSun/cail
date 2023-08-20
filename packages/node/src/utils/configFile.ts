import { existsSync, unlinkSync } from "fs"
import { dirname, join, resolve } from "path"
import { Config } from "../../../../types/node/config"
import { cwd } from "process"
import { pathToFileURL } from "url"

/**
 * @param dirname 当前执行目录
 * @returns 配置文件绝对路径
 */
export function getConfigFilePath(dirname = cwd()) {
    const extensions = ["ts", "js", "mjs"]
    const configFileName = "tracer.config"

    const extension = extensions.find(extension => existsSync(join(dirname, `${configFileName}.${extension}`)))

    return join(dirname, configFileName + "." + extension)
}
/**
 * @param filePath 文件绝对路径
 * @param _cwd 当前执行目录
 * @returns 配置对象
 */
export async function importConfigFile(filePath: string) {
    const _cwd = dirname(filePath)
    const { build } = await import("esbuild")
    // build file 
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

    const module = await import(pathToFileURL(tempFilePath).href)
    // remove file 
    unlinkSync(tempFilePath)

    return module as { default: Config }
}

export async function loadConfigModule(dirname: string) {
    const filePath = getConfigFilePath(dirname)
    const module = await importConfigFile(filePath)
    return module
} 