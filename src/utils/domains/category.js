import Model from './model'

class Category extends Model {
  constructor (data = {
    title: '',
    description: '',
    status: '',
    filters: []
  }) {
    super(data)
  }
}

export default Category
