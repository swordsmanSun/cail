import { importPackageJson } from "@tracer/utils"
import { DepTree } from "../../types/dependency"
/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns 
 */
export function npmAnalyzer(pkgJSONAbsPath: string, modulesDir: string): DepTree {
    const module = importPackageJson(pkgJSONAbsPath)
    // TODO the codes
    return 1 as unknown as DepTree
}