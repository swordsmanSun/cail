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

    test("the correct number of exit function calls", () => {
        const fn = vi.fn()
        DFS(tree, () => fn)
        expect(fn).toBeCalledTimes(7)
    })

    test("the inverted order calls of exit function", () => {
        let depths = []
        DFS(tree, () => (node, context) => {
            depths.push(context.depth)
        })
        expect(depths).toEqual([3, 3, 2, 3, 3, 2, 1])
    })

    test("the context is global", () => {
        const results = []
        DFS(tree, (node, context: any) => {
            if (!context.global) {
                context.global = 1
            }
            results.push(context.global)

            return (node, context: any) => {
                results.push(context.global)
            }
        })
        expect(results).toEqual(new Array(14).fill(1))
    })

    test("the context is global", () => {
        const results = []
        DFS(tree, (node, context: any) => {
            if (!context.global) {
                context.global = 1
            }
            results.push(context.global++)

            return (node, context: any) => {
                results.push(context.global++)
            }
        })
        expect(results).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
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