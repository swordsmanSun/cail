// src/functional/index.ts
function Pipe(...fns) {
  return (...args) => fns.reduce((arg, fn) => arg.length ? fn(...arg) : fn(arg), args);
}

// src/common/withDefault.ts
function withDefault(value, defaultValue) {
  if (defaultValue !== null && !(defaultValue instanceof Array) && typeof defaultValue === "object") {
    let obj = {};
    Object.keys(defaultValue).forEach((key) => {
      obj[key] = withDefault(value?.[key], defaultValue[key]);
    });
    return obj;
  } else {
    return value ?? defaultValue;
  }
}

// src/common/tree.ts
function DFS(tree, callbackFn, props, depth = 1) {
  props = props ?? { children: "children" };
  if (Array.isArray(tree)) {
    for (const node of tree) {
      if (callbackFn(node, depth) === false)
        return;
      const subTree = node[props.children];
      if (subTree && Array.isArray(subTree)) {
        DFS(subTree, callbackFn, props, depth + 1);
      }
    }
  } else {
    DFS([tree], callbackFn, props, depth);
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
  if (Array.isArray(tree)) {
    if (initialValue !== void 0) {
      let result = initialValue;
      DFS(tree, (node, depth) => {
        result = callbackFn(result, node, depth);
      }, props);
      return result;
    } else {
      let result = tree[0];
      if (result[props.children]) {
        DFS(result[props.children], (node, depth) => {
          result = callbackFn(result, node, depth);
        }, null, 2);
      }
      DFS(tree.slice(1), (node, depth) => {
        result = callbackFn(result, node, depth);
      }, props);
      return result;
    }
  }
}
function treeDepth(tree, props) {
  return DFSReduce(tree, (pre, node, depth) => {
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
