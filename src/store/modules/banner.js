import Vue from 'vue'

const ENDPOINT = 'banners'

export default {
  state: {
    banners: [],
    banner: {}
  },

  getters: {
    getBannerById: (state, getters) => (id) => {
      if (state.banners.data) {
        return state.banners.data.find(banner => banner.id === id)
      } else {
        return {}
      }
    }
  },

  mutations: {
    setBanners (state, data) {
      state.banners = data
    },

    setBanner (state, data) {
      state.banner = data
    }
  },

  actions: {
    getBanners ({ commit }) {
      Vue.http.get(ENDPOINT).then((response) => {
        commit('setBanners', response.body)
      })
    },

    getBanner ({ commit }, id) {
      Vue.http.get(ENDPOINT + '/' + id).then((response) => {
        commit('setBanner', response.body)
      })
    },

    createBanner ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Vue.http.post(ENDPOINT, data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    updateBanner ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Vue.http.put(ENDPOINT + '/' + params.id, params.data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },

    deleteBanner ({ commit }, id) {
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