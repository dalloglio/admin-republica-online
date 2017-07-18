import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

// Users
import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/Create'
import UserShow from '@/components/Users/Show'
import UserEdit from '@/components/Users/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Hello', component: Hello },

    // Users
    { path: '/users', name: 'users.index', component: UserIndex },
    { path: '/users/create', name: 'users.create', component: UserCreate },
    { path: '/users/:id', name: 'users.', component: UserShow },
    { path: '/users/:id/edit', name: 'users.edit', component: UserEdit }
  ]
})
