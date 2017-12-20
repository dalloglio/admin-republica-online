<template>
  <el-card class="box-card">
    <h2>Endereço</h2>
    <el-form-item label="Cep" prop="address.zip_code">
      <el-input v-model="model.address.zip_code" type="text" placeholder="Informe o cep" :minlength="9" :maxlength="9" @blur="pesquisarCep" v-mask="'#####-###'"></el-input>
    </el-form-item>
    <el-form-item label="Estado" prop="address.state_initials">
      <el-input v-model="model.address.state_initials" type="text" placeholder="Informe o estado" :minlength="2" :maxlength="2"></el-input>
    </el-form-item>
    <el-form-item label="Cidade" prop="address.city">
      <el-input v-model="model.address.city" type="text" placeholder="Informe a cidade" :minlength="1" :maxlength="200"></el-input>
    </el-form-item>
    <el-form-item label="Bairro" prop="address.neighborhood">
      <el-input v-model="model.address.neighborhood" type="text" placeholder="Informe o bairro" :minlength="1" :maxlength="200"></el-input>
    </el-form-item>
    <el-form-item label="Rua" prop="address.street">
      <el-input v-model="model.address.street" type="text" placeholder="Informe a rua" :minlength="1" :maxlength="200"></el-input>
    </el-form-item>
    <el-form-item label="Número" prop="address.number">
      <el-input ref="number" v-model="model.address.number" type="text" placeholder="Informe o número" :minlength="1" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="Complemento" prop="address.sub_address">
      <el-input v-model="model.address.sub_address" type="text" placeholder="Informe o complemento" :minlength="1" :maxlength="200"></el-input>
    </el-form-item>
    <el-form-item label="No mapa" prop="address.show_on_map">
      <el-radio-group v-model="model.address.show_on_map">
        <el-radio v-for="option in showMapOptions" :key="option.key" :label="option.key">{{ option.value }}</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-card>
</template>

<script>
  import { mask } from 'vue-the-mask'
  import Address from '@/utils/domains/address'
  export default {
    name: 'ads-form-address',
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    directives: { mask },
    data () {
      return {
        showMapOptions: Address.showMapOptions()
      }
    },
    methods: {
      pesquisarCep () {
        if (this.model.address.zip_code !== '') {
          this.cep.pesquisar(this.model.address.zip_code, this.model.address)
        }
      }
    }
  }
</script>
