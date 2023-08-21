import { PackageJsonModule } from "@tracer/utils"

export type DepNode = {
    /**
     * The object value of the package.json 
     */
    packageModule: PackageJsonModule
    /**
     * Cyclic node or not
     */
    isCircular?: boolean
    children?: DepNode[]
}
export type DepTree = DepNode[]