import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'

import App from './App'
import router from './router'
import { store } from './store'
import UtilsUrl from './utils/url'
import UtilsDate from './utils/date'
import UtilsAuth from './utils/auth'

Vue.use(VueResource)
Vue.use(ElementUI, { locale })
Vue.use(UtilsUrl)
Vue.use(UtilsDate)
Vue.use(UtilsAuth, { client_id: process.env.API_CLIENT_ID, client_secret: process.env.API_CLIENT_SECRET })

Vue.http.options.root = process.env.API_URL

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', 'Bearer ' + Vue.auth.getAccessToken())
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
