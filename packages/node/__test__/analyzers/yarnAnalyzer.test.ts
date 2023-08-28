import { join } from "path";
import { expect, test } from "vitest";
import { DepForest, yarnAnalyzer } from "../../src";
import { importPackageJson } from "../../src/utils/importModule";

test("yarnAnalyzer", () => {
    const reactPackageObject = importPackageJson(join(__dirname, "./yarnProject/node_modules/react/package.json"))
    const looseEnvifyPackageObject = importPackageJson(join(__dirname, "./yarnProject/node_modules/loose-envify/package.json"))
    const jsTokensPackageObject = importPackageJson(join(__dirname, "./yarnProject/node_modules/js-tokens/package.json"))

    const depthTree: DepForest = [
        {
            packageModule: reactPackageObject,
            children: [
                {
                    packageModule: looseEnvifyPackageObject,
                    children: [
                        {
                            packageModule: jsTokensPackageObject
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
        ...reactPkgNode,
        isCircular: true
    })

    // expect(
    //     await yarnAnalyzer(
    //         join(__dirname, "./npmProject/package.json"),
    //         join(__dirname, "./npmProject/node_modules")
    //     )
    // ).toMatchObject(depthTree)
})