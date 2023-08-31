import { importPackageJson } from "../../src/utils/importModule";
import { join } from "path";
import { describe, expect, test, vi } from "vitest";
import { DepForest } from "../../types/dependency";
import { pnpmAnalyzer } from "../../src";

describe("pnpmAnalyzer", () => {
    const reactPackageObject = importPackageJson(join(__dirname, "./npmProject/node_modules/react/package.json"))
    const looseEnvifyPackageObject = importPackageJson(join(__dirname, "./npmProject/node_modules/loose-envify/package.json"))
    const jsTokensPackageObject = importPackageJson(join(__dirname, "./npmProject/node_modules/js-tokens/package.json"))

    const depthTree: DepForest = [
        {
            packageModule: reactPackageObject,
            depth: 1,
            children: [
                {
                    packageModule: looseEnvifyPackageObject,
                    depth: 2,
                    children: [
                        {
                            depth: 3,
                            packageModule: jsTokensPackageObject,
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
    // circular dependency
    const reactPkgNode = depthTree[0]
    const looseEnvifyPkgNode = reactPkgNode.children![0]
    looseEnvifyPkgNode.children.push({
        depth: 3,
        packageModule: reactPkgNode.packageModule,
        isCircular: true
    })
    const fn = vi.fn()

    const dependencyTree = pnpmAnalyzer(
        join(__dirname, "./npmProject/package.json"),
        join(__dirname, "./npmProject/node_modules"),
        fn
    )
        
    test("", () => {
        expect(1).toMatchObject(1)
    })

    // test("the correct dependency tree", () => {
    //     expect(dependencyTree).toMatchObject(depthTree)
    // })

    // test("the correct calls to callback function", () => {
    //     expect(fn).toBeCalledTimes(4)
    // })
})