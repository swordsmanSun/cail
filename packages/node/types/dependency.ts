import { PackageJsonObject } from "@tracer/utils"
import { Hooks } from "./hook"

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

export type Visitor = Hooks["analyzing"]