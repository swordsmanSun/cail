import { importPackageJson } from "@tracer/utils";
import { join } from "path";
import { expect, test } from "vitest";
import { DepTree } from "../../types/dependency";
import { pnpmAnalyzer } from "../../src";

test("pnpmAnalyzer", () => {
    const reactPackageObject = importPackageJson(join(__dirname, "./pnpmProject/node_modules/react/package.json"))
    const looseEnvifyPackageObject = importPackageJson(join(__dirname, "./pnpmProject/node_modules/.pnpm/node_modules/loose-envify/package.json"))
    const jsTokensPackageObject = importPackageJson(join(__dirname, "./pnpmProject/node_modules/.pnpm/node_modules/js-tokens/package.json"))

    const depthTree: DepTree = [
        {
            packageModule: reactPackageObject,
            children: [
                {
                    packageModule: looseEnvifyPackageObject,
                    children: [
                        {
                            packageModule: jsTokensPackageObject
                        },
                        // {
                        //     packageModule: reactPackageObject,
                        //     children: [],
                        //     isCircular: true
                        // }
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
    //     pnpmAnalyzer(
    //         join(__dirname, "./pnpmProject/package.json"),
    //         join(__dirname, "./pnpmProject/node_modules")
    //     )
    // ).toMatchObject(depthTree)
})