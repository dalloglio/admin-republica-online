const rules = {
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
}

export default rules
