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

Vue.use(VueResource)
Vue.use(ElementUI, { locale })
Vue.use(UtilsUrl)
Vue.use(UtilsDate)

Vue.http.options.root = process.env.API_URL
// window.axios.defaults.baseURL = process.env.API_URL
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// window.axios.defaults.headers.common['Authorization'] = 'Bearer abcdefghijklmnopqrstuvwxyz0123456789'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
