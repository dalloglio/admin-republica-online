import Model from './model'
import Photo from './photo'

class Partner extends Model {
  constructor (data = {
    title: '',
    description: '',
    link: '',
    photo: new Photo()
  }) {
    super(data)
  }
}

export default Partner
