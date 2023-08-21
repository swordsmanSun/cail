import { importPackageJson } from "@tracer/utils";
import { DepTree } from "../../types"
/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns 
 */
export async function pnpmAnalyzer(pkgJSONAbsPath: string, modulesDir: string): Promise<DepTree> {
    const module = await importPackageJson(pkgJSONAbsPath)
    // TODO the codes
    return 1 as unknown as DepTree
}