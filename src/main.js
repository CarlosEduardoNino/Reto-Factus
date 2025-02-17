// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

// Importar iconos y CSS de Quasar
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router/router.js'  

const myApp = createApp(App)

// Usar Pinia y Quasar
const pinia = createPinia()

myApp
  .use(Quasar, { plugins: {} })
  .use(pinia)  // Usar Pinia
  .use(router) // Usar Vue Router
  .mount('#app')  // Montar la app en el DOM
