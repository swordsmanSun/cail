import { describe, expect, test, vi } from "vitest";
import { BFS, DFS, DFSReduce } from "../../src";
const tree = [
    {
        children: [
            {},
            {}
        ]
    },
    {
        children: [
            {},
            {}
        ]
    }
]

describe("DFS", () => {
    test("it is be called 6 times", () => {
        const fn = vi.fn()
        DFS(tree, fn)
        expect(fn).toBeCalledTimes(6)
    })
})


describe("BFS", () => {
    test("it is be called 6 times", () => {
        const fn = vi.fn()
        BFS(tree, fn)
        expect(fn).toBeCalledTimes(6)
    })
})


describe("DFSReduce", () => {
    const tree = [
        {
            children: [
                {},
                {}
            ]
        },
        {
            children: [
                {},
                {}
            ]
        }
    ]
    test("has initial value", () => {
        const result = DFSReduce(tree, (pre) => {
            return pre + 1
        }, 0)
        expect(result).toBe(6)
    })

    test("no initial value", () => {
        const result = DFSReduce(tree, (pre) => {
            return {
                ...pre,
                count: (pre.count ?? 0) + 1 as number
            }
        })
        expect(result).toMatchObject({
            count: 5,
        })
    })
})