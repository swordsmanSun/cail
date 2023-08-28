import { importPackageJson } from "../utils/importModule"
import { DepForest } from "../../types/dependency";
/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns 
 */
export function yarnAnalyzer(pkgJSONAbsPath: string, modulesDir: string): DepForest {
    const module = importPackageJson(pkgJSONAbsPath)
    // TODO the codes
    return 1 as unknown as DepForest
}