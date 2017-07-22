import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'

import App from './App'
import router from './router'
import { store } from './store'
import Url from './utils/url'

Vue.use(VueResource)
Vue.use(Url)
Vue.use(ElementUI)

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
