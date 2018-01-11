<template>
  <el-card class="box-card">
    <el-form-item label="Usuário" prop="user_id">
      <el-select v-model.number="model.user_id" filterable remote placeholder="Digite algo para buscar um usuário" :remote-method="remoteUsers" :loading="loading">
        <el-option v-for="user in users" :key="user.id" :label="user.name" :value="user.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Categoria" prop="category_id">
      <el-select v-model.number="model.category_id" placeholder="Escolha uma categoria">
        <el-option v-for="category in categories" :key="category.id" :label="category.title" :value="category.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Título" prop="title">
      <el-input v-model="model.title" type="text" placeholder="Informe o título" :minlength="10" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Descrição" prop="description">
      <el-input v-model="model.description" type="textarea" placeholder="Informe uma descrição" :minlength="10" :maxlength="500" :rows="4"></el-input>
    </el-form-item>

    <el-form-item label="Preço" prop="price">
      <el-input v-model.lazy="model.price" type="text" placeholder="Informe o preço" :minlength="1" :maxlength="13" v-money="money"></el-input>
    </el-form-item>

    <el-form-item label="Ativo" prop="status">
      <el-switch v-model="model.status" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="0" on-text="Sim" off-text="Não"></el-switch>
    </el-form-item>
  </el-card>
</template>

<script>
  import { VMoney } from 'v-money'
  export default {
    name: 'ads-form-ad',
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    directives: { money: VMoney },
    data () {
      return {
        loading: false,
        users: [],
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: true
        }
      }
    },
    computed: {
      categories () {
        let categories = this.$store.state.category.categories
        let data = []
        if (categories.data) {
          data = categories.data
        }
        return data
      }
    },
    methods: {
      remoteUsers (query) {
        if (query !== '') {
          this.loading = true
          this.$store.dispatch('getUsers').then((response) => {
            this.loading = false
            if (response.body.data) {
              this.users = response.body.data.filter(user => {
                if (user.id === query) {
                  return user.name.toLowerCase().indexOf(user.name.toLowerCase()) > -1
                } else {
                  return user.name.toLowerCase().indexOf(query.toString().toLowerCase()) > -1
                }
              })
            }
          })
        } else {
          this.users = []
        }
      }
    }
  }
</script>
