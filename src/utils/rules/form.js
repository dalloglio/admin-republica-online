const rulesForm = {
  Ad: {
    user_id: [
      { required: true, message: 'O usuário é obrigatório' },
      { type: 'number', message: 'O usuário deve ser um número' }
    ],
    category_id: [
      { required: true, message: 'A categoria é obrigatória' },
      { type: 'number', message: 'A categoria deve ser um número' }
    ],
    title: [
      { required: true, message: 'O título é obrigatório' },
      { min: 10, max: 200, message: 'O título deve ter de 10 até 200 caracteres' }
    ],
    description: [
      { required: true, message: 'A descrição é obrigatória' },
      { min: 10, max: 500, message: 'A descrição deve ter de 10 até 500 caracteres' }
    ],
    price: [
      { required: true, message: 'O preço é obrigatório' },
      { max: 13, message: 'O preço deve ter até 13 caracteres' }
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
  },
  Banner: {
    title: [
      { required: true, message: 'O título é obrigatório' },
      { min: 3, max: 200, message: 'O título deve ter de 3 até 200 caracteres' }
    ],
    description: [
      { min: 3, max: 200, message: 'A descrição deve ter de 3 até 200 caracteres' }
    ],
    link: [
      { min: 3, max: 200, message: 'O link deve ter de 3 até 200 caracteres' }
    ],
    size: [
      { required: true, message: 'O tamanho é obrigatório' }
    ]
  },
  Category: {
    title: [
      { required: true, message: 'O título é obrigatório' },
      { min: 3, max: 200, message: 'O título deve ter de 3 até 200 caracteres' }
    ],
    description: [
      { min: 3, max: 200, message: 'A descrição deve ter de 3 até 200 caracteres' }
    ],
    status: [
      { required: true, message: 'O status é obrigatório' }
    ]
  },
  Filter: {
    title: [
      { required: true, message: 'O título é obrigatório' },
      { min: 3, max: 200, message: 'O título deve ter de 3 até 200 caracteres' }
    ],
    description: [
      { required: true, message: 'A descrição é obrigatória' },
      { min: 3, max: 200, message: 'A descrição deve ter de 3 até 200 caracteres' }
    ],
    type: [
      { required: true, message: 'O tipo é obrigatório' }
    ],
    values: [
      { required: true, message: 'Adicione ao menos um valor.' }
    ],
    order: [
      { required: true, message: 'A ordem é obrigatória' }
    ]
  }
}

export default rulesForm
