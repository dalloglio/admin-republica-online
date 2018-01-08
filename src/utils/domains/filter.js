import Model from './model'
import Photo from './photo'

class Filter extends Model {
  constructor (data = {
    title: '',
    description: '',
    type: 'select',
    values: [],
    photo: new Photo(),
    order: 0
  }) {
    super(data)
  }

  static types () {
    return [{
      value: 'select',
      label: 'Select'
    }]
  }
}

export default Filter
