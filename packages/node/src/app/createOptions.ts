import { writeFileSync } from "fs"
import { outputFileSync } from "fs-extra"
import { App, AppMethods, AppUtils, PathOptions, PluginFunction, WriteTemp } from "../../types"
/**
 * create write temp file util for tracer app
 * @param path path options
 * @returns write temp file util
 */
export function CreateWriteTemp(path: PathOptions): WriteTemp {
    return (relativeFilePath: string, content: string) => {
        const absoluteFilePath = path.temp(relativeFilePath)
        outputFileSync(absoluteFilePath, content)
        return absoluteFilePath
    }
}