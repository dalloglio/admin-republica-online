import Model from './model'

class Contact extends Model {
  constructor (data = {
    name: '',
    cellphone: '',
    whatsapp: ''
  }) {
    super(data)
  }
}

export default Contact
