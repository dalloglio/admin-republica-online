import Vue from 'vue'
import Vuex from 'vuex'

import category from './modules/category'
import partner from './modules/partner'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    category,
    partner,
    user
  }
})
