import Address from './address'
import Model from './model'

class User extends Model {
  constructor (data = {
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    status: 0,
    address: new Address()
  }) {
    super(data)
  }
}

export default User
