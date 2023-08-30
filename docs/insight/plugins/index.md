### plugin-output

输出依赖文件（默认已内置），你可以选择手动加载更改其默认配置

```ts
import { defineConfig } from "@tracer/node"
import { tracerPluginOutput } from "@tracer/plugins"

export default defineConfig({
    plugins: [tracerPluginOutput({
        output: [
            { format: "js", dir: "./" },
            { format: "json", dir: "./" },
        ],
    })]
})
```