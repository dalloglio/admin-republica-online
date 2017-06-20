import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'
import UsersList from '@/components/Users/List'
import AuthLogin from '@/components/Auth/Login'
import AuthLogout from '@/components/Auth/Logout'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/usuarios', name: 'users', component: UsersList },
        { path: '/login', name: 'auth.login', component: AuthLogin },
        { path: '/logout', name: 'auth.logout', component: AuthLogout }
    ]
})
