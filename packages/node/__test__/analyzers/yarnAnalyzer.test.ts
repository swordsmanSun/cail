import { join } from "path";
import { expect, test, vi, describe } from "vitest";
import { DepForest, yarnAnalyzer } from "../../src";
import { importPackageJson } from "../../src/utils/importModule";

describe("yarnAnalyzer", () => {
    const reactPackageObject = importPackageJson(join(__dirname, "./yarnProject/node_modules/react/package.json"))
    const looseEnvifyPackageObject = importPackageJson(join(__dirname, "./yarnProject/node_modules/loose-envify/package.json"))
    const jsTokensPackageObject = importPackageJson(join(__dirname, "./yarnProject/node_modules/js-tokens/package.json"))

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

    const dependencyTree = yarnAnalyzer(
        join(__dirname, "./npmProject/package.json"),
        join(__dirname, "./npmProject/node_modules"),
        fn
    )


    test("the correct dependency tree", () => {
        expect(dependencyTree).toMatchObject(depthTree)
    })

    test("the correct calls to callback function", () => {
        expect(fn).toBeCalledTimes(4)
    })
})