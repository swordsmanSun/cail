import { defineConfig } from "@tracer/node"

export default defineConfig({
    projects: [
        {
            path: __dirname,
        }
    ],
    base: "/tracer/",
    plugins: [],
    // theme: "default",
})