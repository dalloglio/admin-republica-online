import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI, { Message } from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'

import App from './App'
import router from './router'
import { store } from './store'
import UtilsAuth from './utils/auth'
import UtilsCep from './utils/cep'
import UtilsDate from './utils/date'
import UtilsLoader from './utils/loader'
import UtilsUrl from './utils/url'

Vue.use(VueResource)
Vue.use(ElementUI, { locale })
Vue.use(UtilsAuth, { client_id: process.env.API_CLIENT_ID, client_secret: process.env.API_CLIENT_SECRET })
Vue.use(UtilsCep)
Vue.use(UtilsDate)
Vue.use(UtilsLoader)
Vue.use(UtilsUrl)

Vue.http.options.root = process.env.API_URL

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', 'Bearer ' + Vue.auth.getAccessToken())
  next(function (response) {
    let message = null

    if (response.status >= 500 && response.status <= 599) {
      message = 'Ops! Houve um erro interno. Por favor, tente novamente mais tarde.'
    } else if (response.status === 422) {
      let errors = response.body
      let messages = Object.values(errors).shift()
      message = messages.shift()
      if (!message) {
        message = 'Ops! Houve um erro de validação. Por favor, tente novamente mais tarde.'
      }
    } else if (response.status === 403) {
      message = 'Ops! Você não tem autorização para acessar este recurso.'
    } else if (response.status === 401) {
      // message = 'Ops! Você precisa se autenticar para acessar este recurso.'
      Vue.auth.logout()
    }

    if (message) {
      Message({
        showClose: true,
        message: message,
        type: 'error'
      })
    }
  })
})

Vue.config.productionTip = false

window.events = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
