import Vue from 'vue'

const ENDPOINT = process.env.API_VERSION + '/forms'

export default {
  state: {
    form: {
      contacts: []
    },
    contact: {}
  },

  mutations: {
    setForm (state, data) {
      state.form = data
    },
    setFormContact (state, data) {
      state.form = data.contactable
      delete data.contactable
      state.contact = data
    }
  },

  actions: {
    getForm ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.get(ENDPOINT + '/' + id).then((response) => {
          commit('setForm', response.body)
          resolve(response)
        }, error => reject(error))
      })
    },
    getFormContact ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.get(ENDPOINT + '/' + params.form_id + '/contacts/' + params.id).then((response) => {
          commit('setFormContact', response.body)
          resolve(response)
        }, error => reject(error))
      })
    },
    deleteFormContact ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(ENDPOINT + '/' + params.form_id + '/contacts/' + params.id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
