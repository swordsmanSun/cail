import { expect, test } from "vitest";
import { CreateWriteTemp } from "../../src/app/createOptions";
import { resolvePathOptions } from "../../src/app/resolveOptions";
import { readFileSync, unlinkSync } from "fs";
import { join } from "path";

test("createWriteTemp", () => {
    const path = resolvePathOptions({
        temp: __dirname
    })
    const writeTemp = CreateWriteTemp(path)
    writeTemp("name.js", "test")
    expect(readFileSync(join(path.temp(), "name.js")).toString()).toBe("test")
    unlinkSync(join(path.temp(), "name.js"))
})