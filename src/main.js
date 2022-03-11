import { createApp } from 'vue'

import './styles/index.css'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from './plugins/axios'
import filters from './plugins/filters'
import components from './plugins/components'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.use(filters)
app.use(components)
app.mount('#app')
