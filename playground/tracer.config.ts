import { defineConfig } from "@tracer/node"

export default defineConfig({
    base: "/tracer/",
    projects: [{
        path: "../",
        type: "pnpm"
    }],
})