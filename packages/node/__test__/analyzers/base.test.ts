import { expect, test } from "vitest";
import { getAnalyzerByName, npmAnalyzer, pnpmAnalyzer, yarnAnalyzer } from "../../src";

test("getAnalyzerByName", () => {
    expect(getAnalyzerByName("npm")).toEqual(npmAnalyzer)
    expect(getAnalyzerByName("pnpm")).toEqual(pnpmAnalyzer)
    expect(getAnalyzerByName("yarn")).toEqual(yarnAnalyzer)
    expect(() => getAnalyzerByName("xxx" as any)).toThrowError("Analyzer xxx not found")
})