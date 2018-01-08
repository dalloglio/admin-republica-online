import Address from './address'
import Contact from './contact'
import Model from './model'

class Ad extends Model {
  constructor (data = {
    title: '',
    description: '',
    price: '',
    status: '',
    category_id: '',
    user_id: '',
    address: new Address(),
    contact: new Contact(),
    details: []
  }) {
    super(data)
  }
}

export default Ad
