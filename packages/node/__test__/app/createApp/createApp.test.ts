import { describe, expect, test } from "vitest";
import { app } from "../../__fixtures__/createApp/createApp";

describe("createApp", () => {
    test("the app should be created successfully", async () => {
        expect(app).toMatchObject({
            base: '/',
            projects: [
                {
                    name: 'app',
                    path: 'D:\\07_project\\19_字节青训营\\01_tracer\\packages\\node\\__test__\\__fixtures__\\createApp',
                    type: 'npm',
                    package: 'package.json',
                    children: [],
                    dependencyTree: null
                }
            ],
            server: {
                port: 3001,
                host: '127.0.0.1',
                open: true,
                template: '@tracer/client/templates/dev.html'
            },
            build: { template: '@tracer/client/templates/build.html' },
        })
    })
})