import { importPackageJson } from "../../src/utils/importModule";
import { join } from "path";
import { expect, test } from "vitest";
import { DepForest, npmAnalyzer } from "../../src";

test("npmAnalyzer", async () => {
    const reactPackageObject = await importPackageJson(join(__dirname, "./npmProject/node_modules/react/package.json"))
    const looseEnvifyPackageObject = await importPackageJson(join(__dirname, "./npmProject/node_modules/loose-envify/package.json"))
    const jsTokensPackageObject = await importPackageJson(join(__dirname, "./npmProject/node_modules/js-tokens/package.json"))

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
    //     await npmAnalyzer(
    //         join(__dirname, "./npmProject/package.json"),
    //         join(__dirname, "./npmProject/node_modules")
    //     )
    // ).toMatchObject(depthTree)
})