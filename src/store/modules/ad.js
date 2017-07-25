import Vue from 'vue'

const ENDPOINT = 'ads'

export default {
  state: {
    ads: [],
    ad: {}
  },

  getters: {
    getAdById: (state, getters) => (id) => {
      if (state.ads.data) {
        return state.ads.data.find(ad => ad.id === id)
      } else {
        return {}
      }
    }
  },

  mutations: {
    setAds (state, data) {
      state.ads = data
    },

    setAd (state, data) {
      state.ad = data
    }
  },

  actions: {
    getAds ({ commit }) {
      Vue.http.get(ENDPOINT).then((response) => {
        commit('setAds', response.body)
      })
    },

    getAd ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setAd', response.body)
      })
    },

    createAd ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT, data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateAd ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(ENDPOINT + '/' + params.id, params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    deleteAd ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(ENDPOINT + '/' + id).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    createAdPhoto ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT + '/' + params.id + '/photos', params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  }
}
