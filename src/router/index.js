import Home from '@/components/Home'
import UsersList from '@/components/Users/List'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/usuarios', name: 'users', component: UsersList }
]

export default routes
