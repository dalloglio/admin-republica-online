import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App'
import routes from './router'

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes,
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
