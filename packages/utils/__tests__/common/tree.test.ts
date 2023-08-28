import { describe, expect, test, vi } from "vitest";
import { BFS, DFS, DFSReduce, treeDepth } from "../../src";
const tree = {
    children: [
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
}

describe("DFS", () => {
    test("it is be called 6 times", () => {
        const fn = vi.fn()
        DFS(tree, fn)
        expect(fn).toBeCalledTimes(7)
    })

    test("the depth is correct", () => {
        let depth = 1
        DFS(tree, (node, { depth: _depth }) => depth = Math.max(_depth, depth));
        expect(depth).toBe(3)
    })
})


describe("BFS", () => {
    test("it is be called 6 times", () => {
        const fn = vi.fn()
        BFS(tree, fn)
        expect(fn).toBeCalledTimes(7)
    })

    test("the depth is correct", () => {
        let depth = 1
        BFS(tree, (node, _depth) => depth = Math.max(_depth, depth));
        expect(depth).toBe(3)
    })
})


describe("DFSReduce", () => {
    const tree = {
        children: [
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
    }
    test("has initial value", () => {
        const result = DFSReduce(tree, (pre) => {
            return pre + 1
        }, 0)
        expect(result).toBe(7)
    })

    test("no initial value", () => {
        const result = DFSReduce(tree, (pre) => {
            return {
                ...pre,
                count: (pre.count ?? 0) + 1 as number
            }
        })
        expect(result).toMatchObject({
            count: 6,
        })
    })

    test("the depth is correct", () => {

        expect(DFSReduce(tree, (pre, node, { depth }) => {
            return Math.max(depth, pre)
        }, 1)).toBe(3)
    })
})

test("treeDepth", () => {
    expect(treeDepth(tree)).toBe(3)
})