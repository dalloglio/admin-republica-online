import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/user'

export default {
  state: {
    user: {}
  },

  mutations: {
    setAuthUser (state, data) {
      state.user = data
    }
  },

  actions: {
    getAuthUser ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.get(ENDPOINT).then((response) => {
          commit('setAuthUser', response.body)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
