import { importPackageJson } from "../utils/importModule"
import { DepForest, Visitor } from "../../types/dependency";
import { npmAnalyzer } from "./npmAnalyzer";
/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns 
 */
export function yarnAnalyzer(pkgJSONAbsPath: string, modulesDir: string, visitor: Visitor): DepForest {
    return npmAnalyzer(pkgJSONAbsPath, modulesDir, visitor)
}