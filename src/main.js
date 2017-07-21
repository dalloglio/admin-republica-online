// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router'
import { store } from './store'
import Url from './utils/url'

Vue.use(Url)
Vue.use(ElementUI)

axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.common['Authorization'] = 'Bearer abcdefghijklmnopqrstuvwxyz0123456789'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
