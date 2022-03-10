import { createApp } from 'vue'

import './styles/index.css'
import App from './App.vue'
import router from './router'
import axiosPlugin from './plugins/axios'

const app = createApp(App)
app.use(router)
app.use(axiosPlugin.VueAxios, axiosPlugin.axios)
app.mount('#app')
