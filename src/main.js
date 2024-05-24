import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import {createBootstrap} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


const app = createApp(App)

app.use(router)
app.use(store)
app.use(Toast, {
    timeout: 8000,
    position: 'bottom-center'
    })
app.use(createBootstrap())

app.mount('#app')
