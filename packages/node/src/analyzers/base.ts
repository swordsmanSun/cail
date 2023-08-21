import { npmAnalyzer } from "./npmAnalyzer";
import { pnpmAnalyzer } from "./pnpmAnalyzer";
import { yarnAnalyzer } from "./yarnAnalyzer";

export const getAnalyzerByName = (() => {
    const analyzerMap = {
        npm: npmAnalyzer,
        pnpm: pnpmAnalyzer,
        yarn: yarnAnalyzer
    }

    return (name: keyof typeof analyzerMap) => {
        if (name in analyzerMap) {
            return analyzerMap[name]
        }
        throw new Error(`Analyzer ${name} not found`)
    }
})()
