import Vue from 'vue'

const ENDPOINT = 'users'

export default {
  state: {
    users: [],
    user: {}
  },

  getters: {
    getUserById: (state, getters) => (id) => {
      if (state.users.data) {
        return state.users.data.find(user => user.id === id)
      } else {
        return {}
      }
    }
  },

  mutations: {
    setUsers (state, data) {
      state.users = data
    },

    setUser (state, data) {
      state.user = data
    }
  },

  actions: {
    getUsers ({ commit }) {
      Vue.http.get(ENDPOINT).then((response) => {
        commit('setUsers', response.body)
      })
    },

    getUser ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setUser', response.body)
      })
    },

    createUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT, data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateUser ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(ENDPOINT + '/' + params.id, params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    deleteUser ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(ENDPOINT + '/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
