import { createApp } from 'vue'

import './styles/index.css'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from './plugins/axios'
import filters from './plugins/filters'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.use(filters)
app.mount('#app')
