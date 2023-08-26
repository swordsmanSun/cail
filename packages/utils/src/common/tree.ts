export function DFS<T>(
    tree: T | T[],
    callbackFn: (node: T) => any,
    props: { children?: string } = { children: "children" }
) {
    if (Array.isArray(tree)) {
        for (const node of tree) {
            if (callbackFn(node) === false) return

            const subTree = node[props.children]
            if (subTree && Array.isArray(subTree)) {
                DFS(subTree, callbackFn)
            }
        }

    } else {
        DFS([tree], callbackFn)
    }
}

export function BFS<T>(
    tree: T | T[],
    callbackFn: (node: T) => any,
    props: { children?: string } = { children: "children" }
) {
    if (Array.isArray(tree)) {
        const queue = tree

        while (queue.length) {
            const node = queue.shift()
            if (callbackFn(node) === false) return

            const subTree = node[props.children]
            if (subTree && Array.isArray(subTree)) {
                queue.push(...subTree)
            }
        }
    } else {
        DFS([tree], callbackFn)
    }
}

export function DFSReduce<T, R, I = undefined,>(
    tree: T | T[],
    callbackFn: (previousValue: I extends undefined ? Record<any, any> : I, currentValue: T) => R,
    initialValue?: I,
    props: { children?: string } = { children: "children" }
): I extends undefined ? R : I {
    if (Array.isArray(tree)) {
        if (initialValue !== undefined) {
            let result = initialValue

            DFS(tree, (node) => {
                // @ts-ignore
                result = callbackFn(result, node)
            }, props)

            return result as any
        } else {
            let result = tree[0]

            if (result[props.children]) {
                DFS(result[props.children], (node) => {
                    // @ts-ignore
                    result = callbackFn(result, node)
                })
            }
            DFS(tree.slice(1), (node) => {
                // @ts-ignore
                result = callbackFn(result, node)
            }, props)

            return result as any
        }
    }
}