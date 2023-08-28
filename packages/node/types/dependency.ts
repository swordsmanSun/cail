import { Hooks } from "./hook"
import { PackageJsonObject } from "./packageJson"

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

export type DepForest = DepNode[]

export type Visitor = Hooks["analyzing"]