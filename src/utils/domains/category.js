import Model from './model'

class Category extends Model {
  constructor (data = {
    title: '',
    description: '',
    status: 0,
    filters: []
  }) {
    super(data)
  }
}

export default Category
