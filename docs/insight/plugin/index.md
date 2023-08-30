::: tip
插件开发之前必须要了解到tracer的项目架构以及核心hooks
:::


## 架构

![Alt text](%E6%9E%B6%E6%9E%84.drawio.png)

- Node端中包含cli包，node(core)包，bundler包。
- node包：来创建整个App实例。
- Cli包中：访问App实例，初始化APP，写入临时文件。并且控制bundler包创建devServer或者build项目

## 生命周期与hooks

![Alt text](%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.drawio.png)

## 开发插件

tracer 插件只支持composition API，这意味着插件默认是一个函数, 其接收App实例作为参数，

```ts
import { App } from "@tracer/node"

const pluginFunction = (app :App) => {
    
}
```

那么如何为插件定义name等一系列options，可以使用defineOptions函数

```ts
import { App, defineOptions } from "@tracer/node"

const pluginFunction = (app :App) => {
    defineOptions({
        name: "tracer-plugin-xxx"
    }) 
}
```

配合多个hook来实现完整的插件功能

```ts
import { App, defineOptions, DepNode, ProjectOptions } from "@tracer/node"

const pluginFunction = () => {
    defineOptions({
        name: "tracer-plugin-xxx"
    })
    onAnalyzing((depNode: DepNode, depth: number) => {})
    onAnalyzed((project: ProjectOptions) => {})
    onInitialized((projects: ProjectOptions[]) => {})
    onTemped(() => {})
    onBuilt(() => {})
    onWatching(() => {})
}
```