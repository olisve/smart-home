import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import PinMapping from '@/components/pin-mapping/pin-mapping'
import 'jointjs/dist/joint.css'
import System from '@/components/system/system'
import Flows from "@/components/flows/flows";

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const routes = [
    {path: '/system', component: System},
    {path: '/flows', component: Flows},
    {path: '/', redirect: 'system'},
    {path: '/configuration/:id', component: PinMapping}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
