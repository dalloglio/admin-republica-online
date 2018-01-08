class Model {
  constructor (data = {}) {
    this.setData(data)
  }

  setData (data) {
    if (data instanceof Object) {
      Object.keys(data).map((key) => {
        this[key] = data[key]
      })
    }
  }
}

export default Model
