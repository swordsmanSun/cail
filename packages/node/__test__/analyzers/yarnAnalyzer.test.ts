import { importPackageJson } from "@tracer/utils";
import { join } from "path";
import { expect, test } from "vitest";
import { DepTree, yarnAnalyzer } from "../../src";

test("yarnAnalyzer", async () => {
    const reactPackageObject = await importPackageJson(join(__dirname, "./yarnProject/node_modules/react/package.json"))
    const looseEnvifyPackageObject = await importPackageJson(join(__dirname, "./yarnProject/node_modules/loose-envify/package.json"))
    const jsTokensPackageObject = await importPackageJson(join(__dirname, "./yarnProject/node_modules/js-tokens/package.json"))

    const depthTree: DepTree = [
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