import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import { userConfig } from "@temp/userConfig"

const routes: Readonly<RouteRecordRaw[]> = [
    {
        name: "home",
        path: "/",
        component: () => import("@/views/home/Home.vue")
    }
]

export const router = createRouter({
    history: createWebHistory(userConfig.base),
    routes,
})