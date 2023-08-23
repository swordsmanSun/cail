import { expect, test } from "vitest";
import { getAnalyzerByName, npmAnalyzer, pnpmAnalyzer, yarnAnalyzer } from "../../src";

test("getAnalyzerByName", () => {
    expect(getAnalyzerByName("npm")).toBeInstanceOf(Function)
    expect(getAnalyzerByName("pnpm")).toBeInstanceOf(Function)
    expect(getAnalyzerByName("yarn")).toBeInstanceOf(Function)
    expect(() => getAnalyzerByName("xxx" as any)).toThrowError("Analyzer xxx not found")
})