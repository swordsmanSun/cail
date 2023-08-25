import { expect, test, describe, vi } from "vitest";
import { CreateWriteFunction } from "../../src/app/write";
import { CreateWriteTemp } from "../../src/app/createOptions";
import { resolvePathOptions } from "../../src/app/resolveOptions";
import { unlinkSync } from "fs";
import { join } from "path";
import { onTemped } from "../../src/app/hook";

describe("write", async () => {
    const path = resolvePathOptions({
        temp: __dirname
    })
    const fn = vi.fn()
    onTemped(fn)
    const write = CreateWriteFunction({
        writeTemp: CreateWriteTemp(path),
        projects: [1, 2, 3, 4, 5]
    } as any)
    write()
    const relativePath = "./analysis/.temp/projectsData.js"
    const { projects } = await import(relativePath)

    test("write function", () => {
        expect(projects).toEqual([1, 2, 3, 4, 5])
        unlinkSync(join(__dirname, relativePath))
    })
    test("if the temped hook function is be called correctly ", () => {
        expect(fn).toBeCalled()
    })
})
