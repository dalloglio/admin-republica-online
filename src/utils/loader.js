import { Loading } from 'element-ui'

export default {
  install (Vue, options) {
    Vue.loader = {

      instance: null,

      open () {
        this.instance = Loading.service({
          lock: true,
          text: 'Carregando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },

      close () {
        setTimeout(() => {
          this.instance.close()
        }, 300)
      }
    }

    Object.defineProperties(Vue.prototype, {
      $loader: {
        get: () => {
          return Vue.loader
        }
      }
    })
  }
}
