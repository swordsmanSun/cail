import { ProjectOptions } from "."
import { DepNode } from "./dependency"

export type Hooks = {
    temped: () => void
    analyzing: (depNode: DepNode, depth: number) => void
    watching: () => void
    analyzed: (project: ProjectOptions) => void
    built: () => void
    initialized: (projects: ProjectOptions[]) => void
}