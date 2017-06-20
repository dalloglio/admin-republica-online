import { sync } from 'vuex-router-sync'

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

import App from './App'
import router from './router'
import VuexStore from './vuex/store'
import Auth from './auth'

Vue.http.options.root = process.env.API_URL

const store = new Vuex.Store(VuexStore)

Auth.checkAuth()

sync(store, router)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    watch: {
        '$route' (to, from) {
            if (to.name !== 'auth.login' && to.name !== 'auth.logout') {
                if (Auth.isAuthenticated() === false) {
                    Auth.redirectLogin()
                }
            }
        }
    },
    template: '<App/>',
    components: { App }
})
