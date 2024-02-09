import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import toast from './plugins/toast'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(toast)



app.mount('#app')