import { join } from "path";
import { npmAnalyzer } from "./npmAnalyzer";
import { pnpmAnalyzer } from "./pnpmAnalyzer";
import { yarnAnalyzer } from "./yarnAnalyzer";
import { Visitor } from "../../types/dependency";

export const getAnalyzerByName = (() => {
    const analyzerMap = {
        npm: npmAnalyzer,
        pnpm: pnpmAnalyzer,
        yarn: yarnAnalyzer
    }

    return (name: keyof typeof analyzerMap) => {
        if (name in analyzerMap) {
            return NodeAnalyzer(analyzerMap[name])
        }
        throw new Error(`Analyzer ${name} not found`)
    }
})()

/**
 * create analyzer function with default params
 */
function NodeAnalyzer(analyzer: typeof npmAnalyzer) {
    return (projectPath: string, visitor: Visitor) => {
        return analyzer(join(projectPath, "package.json"), join(projectPath, "node_modules"), visitor)
    }
}