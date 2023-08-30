// src/functional/index.ts
function Pipe(...fns) {
  return (...args) => fns.reduce((arg, fn) => arg.length ? fn(...arg) : fn(arg), args);
}

// src/common/withDefault.ts
function withDefault(value, defaultValue) {
  if (defaultValue !== null && !(defaultValue instanceof Array) && typeof defaultValue === "object") {
    let obj = value ?? {};
    Object.keys(defaultValue).forEach((key) => {
      obj[key] = withDefault(value?.[key], defaultValue[key]);
    });
    return obj;
  } else {
    return value ?? defaultValue;
  }
}

// src/common/tree.ts
function DFS(node, callbackFn, props, context) {
  props = withDefault(props, { children: "children" });
  if (!context) {
    context = {
      depth: 1
    };
  }
  const { depth = 1 } = context;
  const exit = callbackFn(node, context);
  if (exit === false)
    return;
  node[props.children]?.forEach((childNode, i) => {
    context.parent = node;
    context.childIndex = i;
    context.depth = depth + 1;
    DFS(childNode, callbackFn, props, context);
  });
  if (exit instanceof Function) {
    context.depth = depth;
    exit(node, context);
  }
}
function BFS(tree, callbackFn, props) {
  props = props ?? { children: "children" };
  if (Array.isArray(tree)) {
    const queue = tree.map((tree2) => ({ tree: tree2, depth: 1 }));
    while (queue.length) {
      const { tree: tree2, depth } = queue.shift();
      if (callbackFn(tree2, depth) === false)
        return;
      const subTree = tree2[props.children];
      if (subTree && Array.isArray(subTree)) {
        queue.push(...subTree.map((tree3) => ({ tree: tree3, depth: depth + 1 })));
      }
    }
  } else {
    BFS([tree], callbackFn, props);
  }
}
function DFSReduce(tree, callbackFn, initialValue, props = { children: "children" }) {
  if (initialValue !== void 0) {
    let result = initialValue;
    DFS(tree, (node, context) => {
      result = callbackFn(result, node, context);
    }, props);
    return result;
  } else {
    let result = tree;
    tree[props.children]?.forEach((node, index) => {
      DFS(node, (node2, context) => {
        result = callbackFn(result, node2, context);
      }, null, { depth: 2, parent: tree, childIndex: index });
    });
    return result;
  }
}
function treeDepth(tree, props) {
  return DFSReduce(tree, (pre, node, { depth }) => {
    return Math.max(depth, pre);
  }, 1, props);
}
export {
  BFS,
  DFS,
  DFSReduce,
  Pipe,
  treeDepth,
  withDefault
};
