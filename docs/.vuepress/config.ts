import { createRequire } from "module";
import { defaultTheme, defineUserConfig, viteBundler } from "vuepress";

const require = createRequire(import.meta.url)
const projectName = require("../../package.json").name

export default defineUserConfig({
    base: `/${projectName}/`,
    description: "分析项目中所安装依赖包之间的关系",
    title: `${projectName}`,
    // 默认主题
    theme: defaultTheme({
        logo: "/logo.png",
        // 仓库名称和链接
        repoLabel: "GitHub",
        repo: `https://github.com/swordsmanSun/${projectName}`,
    }),
});