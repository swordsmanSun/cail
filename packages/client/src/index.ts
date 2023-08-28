import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"
import "normalize.css"
import 'element-plus/dist/index.css'
import "./styles/index.scss"
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount("#app")