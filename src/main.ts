import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Dashboard from '@/components/dashboard/dashboard'
import SystemInformation from '@/components/system-information/system-information'
import Configurator from '@/components/configurator/configurator'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/system', component: SystemInformation },
    { path: '/configuration', component: Configurator },
    { path: '/', redirect: 'dashboard' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
