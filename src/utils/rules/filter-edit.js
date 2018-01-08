const rules = {
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

export default rules
