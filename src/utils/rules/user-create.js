const rules = {
  name: [
    { required: true, message: 'O nome é obrigatório' },
    { min: 3, max: 200, message: 'O nome deve ter de 3 até 200 caracteres' }
  ],
  first_name: [
    { required: true, message: 'O nome é obrigatório' },
    { min: 3, max: 500, message: 'O nome deve ter de 3 até 200 caracteres' }
  ],
  last_name: [
    { required: true, message: 'O sobrenome é obrigatório' },
    { min: 3, max: 500, message: 'O sobrenome deve ter de 3 até 200 caracteres' }
  ],
  birthday: [
    { required: true, message: 'A data de nascimento é obrigatório' }
  ],
  email: [
    { required: true, message: 'O e-mail é obrigatório' },
    { max: 200, message: 'O e-mail deve ter até 200 caracteres' },
    { type: 'email', message: 'Informe um e-mail válido' }
  ],
  password: [
    { required: true, message: 'A senha é obrigatória' },
    { min: 6, max: 20, message: 'A senha deve ter de 6 até 20 caracteres' }
  ],
  gender: [
    { required: true, message: 'O sexo é obrigatório', trigger: 'change' }
  ],
  status: [
    { required: true, message: 'O status é obrigatório' }
  ],
  'address.zip_code': [
    { required: true, message: 'O cep é obrigatório' },
    { min: 9, max: 9, message: 'O cep deve ter 9 caracteres' }
  ],
  'address.state_initials': [
    { required: true, message: 'O estado é obrigatório' },
    { min: 2, max: 2, message: 'O estado deve ter 2 caracteres' }
  ],
  'address.city': [
    { required: true, message: 'A cidade é obrigatória' },
    { max: 200, message: 'A cidade deve ter até 200 caracteres' }
  ],
  'address.neighborhood': [
    { required: true, message: 'O bairro é obrigatório' },
    { max: 200, message: 'O bairro deve ter até 200 caracteres' }
  ],
  'address.street': [
    { required: true, message: 'A rua é obrigatória' },
    { max: 200, message: 'A rua deve ter até 200 caracteres' }
  ],
  'address.number': [
    { required: true, message: 'O número é obrigatório' },
    { max: 20, message: 'O número deve ter até 20 caracteres' }
  ],
  'address.sub_address': [
    { max: 200, message: 'O número deve ter até 200 caracteres' }
  ],
  'address.show_on_map': [
    { required: true, message: 'A forma de exibição no mapa é obrigatória' }
  ],
  'contact.name': [
    { required: true, message: 'O nome é obrigatório' },
    { max: 200, message: 'O nome deve ter até 200 caracteres' }
  ],
  'contact.cellphone': [
    { required: true, message: 'O celular é obrigatório' },
    { min: 15, max: 15, message: 'O celular deve ter 15 caracteres' }
  ],
  'contact.whatsapp': [
    { required: true, message: 'O WhatApp é obrigatório' },
    { min: 15, max: 15, message: 'O WhatApp deve ter 15 caracteres' }
  ]
}

export default rules
