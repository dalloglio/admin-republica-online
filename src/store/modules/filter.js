import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/filters'

export default {
  state: {
    filters: [],
    filter: {}
  },

  getters: {
    getFilterById: (state, getters) => (id) => {
      if (state.filters.data) {
        return state.filters.data.find(filter => filter.id === id)
      } else {
        return {}
      }
    }
  },

  mutations: {
    setFilters (state, data) {
      state.filters = data
    },

    setFilter (state, data) {
      state.filter = data
    }
  },

  actions: {
    getFilters ({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.http.get(ENDPOINT).then((response) => {
          commit('setFilters', response.body)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    getFilter ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setFilter', response.body)
      })
    },

    createFilter ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT, data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateFilter ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(ENDPOINT + '/' + params.id, params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    deleteFilter ({ commit }, id) {
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
