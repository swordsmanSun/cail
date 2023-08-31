import { join } from "path";
import { DepForest, DepNode, Visitor } from "../../types/dependency"
import { importPackageJson } from "../utils/importModule"
/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns 
 */
export function npmAnalyzer(pkgJSONAbsPath: string, modulesDir: string, visitor: Visitor): DepForest {
    // 虚节点
    const dependencyNode: DepNode = {
        packageModule: importPackageJson(pkgJSONAbsPath),
        depth: 0,
        isCircular: false,
        children: [],
    }
    // 历史访问过的依赖名称
    const historyDependencyNames: string[] = []

    // 读取json => 读取deps => 读取每个json => 读取 deps => 读取每个json
    // 递归最小单元：读取deps => 读取每个json
    const recursion = (dependencies: Record<string, string>, parent: DepNode, depth: number) => {
        // 读取 deps
        Object.keys(dependencies).forEach(dependencyName => {
            // 历史记录
            const isVisited = historyDependencyNames.includes(dependencyName)
            historyDependencyNames.push(dependencyName)
            // 读取每个json
            const packageModule = importPackageJson(join(modulesDir, dependencyName, "package.json"))
            const dependencyNode: DepNode = {
                packageModule,
                depth,
                children: [],
            }
            // 如果依赖已访问
            if (isVisited) {
                dependencyNode.isCircular = true
            }
            // 调用visitor
            visitor(dependencyNode)
            parent.children.push(dependencyNode)
            if (!isVisited && packageModule.dependencies) {
                recursion(packageModule.dependencies, dependencyNode, depth + 1)
            }
        })
    }

    recursion(dependencyNode.packageModule.dependencies, dependencyNode, 1)

    return dependencyNode.children
}