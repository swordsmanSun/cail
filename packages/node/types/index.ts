import { PackageJsonObject } from "@tracer/utils"
import { ProjectConfig, DirConfig } from "../../../types/node/config"

export type DepNode = {
    /**
     * The object value of the package.json 
     */
    packageModule: PackageJsonObject
    /**
     * Cyclic node or not
     */
    isCircular?: boolean
    children?: DepNode[]
}
export type DepTree = DepNode[]

export type ProjectOptions = Required<ProjectConfig> & {
    /**
    * The object value of the package.json 
    */
    packageModule: Partial<PackageJsonObject>
    children: ProjectOptions[]
}
// export type PathOptions = Required<DirConfig>