import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

// Categories
import CategoryIndex from '@/components/Categories/Index'
import CategoryCreate from '@/components/Categories/Create'
import CategoryEdit from '@/components/Categories/Edit'

// Users
import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/Create'
import UserEdit from '@/components/Users/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },

    // Categories
    { path: '/categories', name: 'categories.index', component: CategoryIndex },
    { path: '/categories/create', name: 'categories.create', component: CategoryCreate },
    { path: '/categories/:id/edit', name: 'categories.edit', component: CategoryEdit },

    // Users
    { path: '/users', name: 'users.index', component: UserIndex },
    { path: '/users/create', name: 'users.create', component: UserCreate },
    { path: '/users/:id/edit', name: 'users.edit', component: UserEdit }
  ]
})
