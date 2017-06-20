import Vue from 'vue'
import router from '@/router'

export default {

    authenticated: false,

    login (username, password) {
        let data = {
            grant_type: 'password',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: username,
            password: password,
            scope: ''
        }
        Vue.http.post('oauth/token', data).then(response => {
            this.setToken(response.body)
            router.push({ name: 'home' })
        }, response => {
            console.log('Erro...')
        })
    },

    logout () {
        this.removeToken()
        this.redirectLogin()
    },

    setToken (token) {
        if (!token) {
            token = '{}'
        }
        localStorage.setItem('token', JSON.stringify(token))
    },

    getToken () {
        let token = localStorage.getItem('token')
        if (!token) {
            token = {}
        }
        return token
    },

    removeToken () {
        localStorage.removeItem('token')
    },

    checkAuth () {
        let token = this.getToken()
        if (token.access_token) {
            this.authenticated = true
        } else {
            this.authenticated = false
        }
    },

    isAuthenticated () {
        return this.authenticated
    },

    redirectLogin () {
        router.push({ name: 'auth.login' })    
    },

    setHeaderAuthorization () {
        let token = this.getToken()
        Vue.http.interceptors.push(function(request, next) {
            request.headers.set('Authorization', 'Bearer ' + token.access_token)
            next()
        })
    }
}
