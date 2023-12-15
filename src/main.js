// import './assets/main.css' <-  Vue-vie template code
import './style.css'
import { createApp, } from 'vue'
import {createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import TheCesium from './components/TheCesium.vue'
import TheHeader from './components/TheHeader.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/project1', component: App
        }
    ]
})

app.component('the-cesium', TheCesium)
app.component('the-header', TheHeader)

app.use(router)

app.mount('#app')
