import { importPackageJson, packageJsonDefault } from '../utils/importModule';
import { DepForest, DepNode, Visitor } from "../../types/dependency"
import { join } from "path";
/**
 * @param pkgJSONAbsPath The absolute file path of the package.json of the project
 * @param modulesDir Dependencies directory
 * @returns 
 */
export function pnpmAnalyzer(pkgJSONAbsPath: string, modulesDir: string, visitor: Visitor): DepForest {
    const module = importPackageJson(pkgJSONAbsPath)
    const dependencyNode: DepNode = {
        packageModule: importPackageJson(pkgJSONAbsPath),
        depth: 0,
        isCircular: false,
        children: [],
    }
    // 访问Dependency的历史记录
    const historyDependencyNames: string[] = []
    // 记录从起点到当前所在的Dependency的路径记录，如果当前Dependency在该路径记录中出现过，则说明形成了一个回路
    const pathRecord: string[] = []
    // 记录位于回路中的Dependency，其节点的isCircular属性需要设置为true
    const circleDeps: string[] = []

    const recursion = (dependencies: Record<string, string>, parent: DepNode, curDepth:number = 1, maxDepth:number = Infinity) => {
        // pnpm中依赖存放的文件夹除了packageName外，还需要标注version，如：react@18.2.0
        const depsList: string[] = Object.entries(dependencies).map(([key, value])=>{
            return key.concat(value).replace('^','@')
        })
        
        depsList.forEach((dependencyName) => {
            
            // 初始化当前访问的dependency节点，并添加到父节点的children属性中
            const dependencyNode: DepNode = {
                packageModule: importPackageJson(join(modulesDir, dependencyName, "package.json")),
                depth: curDepth,
                children: [],
            }
            parent.children.push(dependencyNode)

            // 递归边界：当前深度（curDepth）超过最大目标深度（maxDepth）或该dependency已经访问过时
            // 
            if (curDepth > maxDepth || historyDependencyNames.includes(dependencyName) ) {
                return
            }

            // 如果未到达递归边界
            // 在历史记录中记录当前访问的dependency
            historyDependencyNames.push(dependencyName)

            // 查询该dependency是否在从根节点到当前节点的路径中已经出现过，如果已经在路径中出现过，说明具有回路
            const inPathRecord = pathRecord.indexOf(dependencyName)
            if ( inPathRecord !== -1) {
                circleDeps.push(...pathRecord.slice(inPathRecord))
            }
            pathRecord.push(dependencyName)

            // 读取当前依赖的package.json文件，pnpm的依赖全部存放于./node.modules/.pnpm/<pkgName>@<pkgVersion>/node.modules/<pkg>/package.json

            const indexAt = dependencyName.indexOf("@")
            const pkgName = dependencyName.substring(0,indexAt)
            const curDepPath = join(modulesDir, '.pnpm', dependencyName, 'node.modules', pkgName, 'package.json')

            const packageModule = importPackageJson(curDepPath)
  
            recursion(packageModule.dependencies, dependencyNode, curDepth + 1)
        

            // 该递归过程结束前查询该节点是否在回路中,并将该节点从路径记录栈顶中弹出
            if (circleDeps.includes(dependencyName)) {
                dependencyNode.isCircular = true
            }
            pathRecord.pop()
        })
    }

    recursion(dependencyNode.packageModule.dependencies, dependencyNode, 1)

}