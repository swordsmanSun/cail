import { TreeTraverseContext } from "../../types/tree"
import { withDefault } from "./withDefault"

/**
 * Perform the specified action for each node in the tree or forest using depth-first search
 * @param tree Tree or forest
 * @param callbackFn A function that accepts up two arguments. DFS calls the callbackfn function one time for each node in the tree or forest.
 * @param props Props.children is the name of the children property
 */
export function DFS<T>(
    node: T,
    callbackFn: (node: T, context: TreeTraverseContext<T>) => number | string | boolean | void | undefined | null | ((node: T, context: TreeTraverseContext<T>) => void),
    props?: { children?: string },
    context?: TreeTraverseContext<T>
) {
    props = withDefault(props, { children: "children" })
    if (!context) {
        context = {
            depth: 1
        }
    }
    const { depth = 1 } = context

    const exit = callbackFn(node, context)
    if (exit === false) return

    node[props.children]?.forEach((childNode: T, i: number) => {
        context.parent = node
        context.childIndex = i
        context.depth = depth + 1
        DFS(childNode, callbackFn, props, context)
    })
    // postorder traversal
    if (exit instanceof Function) {
        context.depth = depth
        exit(node, context)
    }
}
// TODO change it as the DFS
/**
 * Perform the specified action for each node in the tree or forest using breadth-first search
 * @param tree Tree or forest
 * @param callbackFn A function that accepts up two arguments. DFS calls the callbackfn function one time for each node in the tree or forest.
 * @param props Props.children is the name of the children property
 */
export function BFS<T>(
    tree: T | T[],
    callbackFn: (node: T, depth: number) => any,
    props?: { children?: string }
) {
    props = props ?? { children: "children" }

    if (Array.isArray(tree)) {
        const queue = tree.map(tree => ({ tree, depth: 1 }))

        while (queue.length) {
            const { tree, depth } = queue.shift()
            if (callbackFn(tree, depth) === false) return

            const subTree = tree[props.children]
            if (subTree && Array.isArray(subTree)) {
                queue.push(...subTree.map(tree => ({ tree, depth: depth + 1 })))
            }
        }
    } else {
        BFS([tree], callbackFn, props)
    }
}
/**
 * Perform the specified action for each node in the tree or forest using depth-first search.
 * The return value of the callback function is the accumulated result, and it is provided as an argument in the next call to the callback function.
 * @param tree Tree or forest
 * @param callbackFn  A function that accepts up one arguments. DFS calls the callbackfn function one time for each node in the tree or forest.
 * @param initialValue If initial value is specified, it is used as the initial value to start the accumulation. 
 * @param props Props.children is the name of the children property
 * @returns The accumulated result
 */
export function DFSReduce<T, R, I = undefined,>(
    tree: T,
    callbackFn: (previousValue: I extends undefined ? Record<any, any> : I, currentValue: T, context: TreeTraverseContext<T>) => R,
    initialValue?: I,
    props: { children?: string } = { children: "children" }
): I extends undefined ? R : I {
    if (initialValue !== undefined) {
        let result = initialValue

        DFS(tree, (node, context) => {
            // @ts-ignore
            result = callbackFn(result, node, context)
        }, props)

        return result as any
    } else {
        let result = tree

        tree[props.children]?.forEach((node: T, index: number) => {
            DFS(node, (node, context) => {
                // @ts-ignore
                result = callbackFn(result, node, context)
            }, null, { depth: 2, parent: tree, childIndex: index })
        })

        return result as any
    }
}
/**
 * Get the depth of the tree
 * @param tree tree 
 * @param props Props.children is the name of the children property
 * @returns The depth of the tree
 */
export function treeDepth<T>(tree: T, props?: { children?: string }) {
    return DFSReduce(tree, (pre, node, { depth }) => {
        return Math.max(depth, pre)
    }, 1, props)
}

