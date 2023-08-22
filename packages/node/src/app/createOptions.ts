import { writeFileSync } from "fs"
import { outputFileSync } from "fs-extra"
import { PathOptions, WriteTemp } from "../../types"
/**
 * create write temp file util for tracer app
 * @param path 
 * @returns 
 */
export function CreateWriteTemp(path: PathOptions): WriteTemp {
    return (relativeFilePath: string, content: string) => {
        const absoluteFilePath = path.temp(relativeFilePath)
        outputFileSync(absoluteFilePath, content)
        return absoluteFilePath
    }
}