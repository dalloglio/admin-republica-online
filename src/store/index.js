import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import ad from './modules/ad'
import auth from './modules/auth'
import banner from './modules/banner'
import category from './modules/category'
import filter from './modules/filter'
import form from './modules/form'
import photo from './modules/photo'
import partner from './modules/partner'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['auth']
    })
  ],
  modules: {
    ad,
    auth,
    banner,
    category,
    filter,
    form,
    photo,
    partner,
    user
  }
})
