import axios from 'axios'

const ENDPOINT = 'users'

export default {
  state: {
    users: [],
    user: {}
  },

  mutations: {
    setUsers: (state, data) => {
      state.users = data
    },

    setUser: (state, data) => {
      state.user = data
    }
  },

  actions: {
    getUsers ({ commit }) {
      return axios.get(ENDPOINT).then((response) => {
        commit('setUsers', response.body)
      })
    },

    getUser ({ commit }, id) {
      return axios.get(ENDPOINT + '/' + id).then((response) => {
        commit('setUser', response.body)
      })
    },

    createUser ({ commit }, data) {
      return axios.post(ENDPOINT, data)
    },

    updateUser ({ commit }, params) {
      return axios.put(ENDPOINT + '/' + params.id, params.data)
    },

    deleteUser ({ commit }, id) {
      return axios.delete(ENDPOINT + '/' + id)
    }
  }
}
