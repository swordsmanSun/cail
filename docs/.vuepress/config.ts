import { createRequire } from "module";
import { defaultTheme, defineUserConfig, viteBundler } from "vuepress";

const require = createRequire(import.meta.url)
const projectName = require("../../package.json").name

export default defineUserConfig({
    base: `/${projectName}/`,
    description: "分析项目中所安装依赖包之间的关系",
    title: `${projectName}`,
    head: [["link", { rel: "icon", href: "/favicon.png" }]],
    // 默认主题
    theme: defaultTheme({
        logo: "/logo.png",
        // 仓库名称和链接
        repoLabel: "GitHub",
        repo: `https://github.com/swordsmanSun/${projectName}`,
        navbar: [
            { text: "指南", link: "/guide/introduction/", activeMatch: "/guide/" },
            { text: "深入", link: "/insight/plugin/", activeMatch: "/insight/" },
        ],
        sidebar: {
            "/guide/": [
                {
                    text: "指南",
                    children: [
                        { text: "介绍", link: "/guide/introduction/" },
                        { text: "安装", link: "/guide/install/" },
                    ],
                },
            ],
            "/insight/": [
                {
                    text: "深入",
                    children: [
                        { text: "插件开发", link: "/insight/plugin/" },
                        { text: "官方插件", link: "/insight/plugins/" },
                    ],
                },
            ]
        }
    }),
});