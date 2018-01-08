import Model from './model'

class Photo extends Model {
  constructor (data = {
    title: '',
    description: '',
    photo: '',
    name: '',
    type: '',
    size: '',
    url: '',
    favorite: false
  }) {
    super(data)
  }
}

export default Photo
