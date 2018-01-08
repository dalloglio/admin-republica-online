import Model from './model'

class Address extends Model {
  constructor (data = {
    zip_code: '',
    street: '',
    number: '',
    sub_address: '',
    neighborhood: '',
    country: 'Brasil',
    state: 'SC',
    state_initials: '',
    city: '',
    show_on_map: 'default'
  }) {
    super(data)
  }

  static showMapOptions () {
    return [
      { key: 'default', value: 'Não mostrar' },
      { key: 'approximate', value: 'Mostrar a localização aproximada' },
      { key: 'exact', value: 'Mostrar a localização exata' }
    ]
  }
}

export default Address
