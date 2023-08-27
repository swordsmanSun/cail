import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

const routes: Readonly<RouteRecordRaw[]> = [
    {
        name: "home",
        path: "/",
        component: () => import("@/views/home/Home.vue")
    }
]

export const router = createRouter({
    // TODO need to change
    history: createWebHistory("/tracer/"),
    routes,
})