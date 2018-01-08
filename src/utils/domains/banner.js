import Model from './model'
import Photo from './photo'

class Banner extends Model {
  constructor (data = {
    title: '',
    description: '',
    link: '',
    size: '',
    photo: new Photo()
  }) {
    super(data)
  }

  static sizes () {
    return [{
      value: '300x600',
      label: 'Meia página (300x600)'
    }, {
      value: '970x250',
      label: 'Outdoor (970x250)'
    }]
  }
}

export default Banner
