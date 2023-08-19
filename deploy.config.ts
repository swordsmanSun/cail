import { defineConfig } from "@ddongui/deploy"
// 发布在线文档到github page服务
export default defineConfig({
    relativePath: "./docs/.vuepress/dist/",
    branchName: "page",
    files: ".",
    message: "#",
    remoteUrl: "https://github.com/swordsmanSun/tracer.git"
})
