import Vue from 'vue'
import Vuex from 'vuex'

import banner from './modules/banner'
import category from './modules/category'
import photo from './modules/photo'
import partner from './modules/partner'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    banner,
    category,
    photo,
    partner,
    user
  }
})
