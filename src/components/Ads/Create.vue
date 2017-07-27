<template>
  <div class="ads create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'ads.index' }">Anúncios</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar anúncio
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'ads.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-card class="box-card">

      <el-alert :closable="false" title="Atenção" description="Todos os campos devem ser preenchidos." type="warning" show-icon></el-alert>

      <el-form label-position="top" :model="form">
        <el-form-item label="Usuário">
          <el-select v-model="form.user_id" filterable remote placeholder="Digite algo para buscar um usuário" :remote-method="remoteUsers" :loading="loading">
            <el-option v-for="user in users" :key="user.id" :label="user.name" :value="user.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Categoria">
          <el-select v-model="form.category_id" placeholder="Escolha uma categoria">
            <el-option v-for="category in categories" :key="category.id" :label="category.title" :value="category.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Título">
          <el-input v-model="form.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Descrição">
          <el-input v-model="form.description" type="text" placeholder="Informe uma descrição" :minlength="3" :maxlength="255"></el-input>
          </el-form-item>
        <el-form-item label="Texto">
          <el-input v-model="form.content" type="textarea" placeholder="Informe o texto" :minlength="0" :maxlength="5000" :rows="4"></el-input>
          </el-form-item>
        <el-form-item label="Preço">
          <el-input v-model="form.price" type="text" placeholder="Informe o preço." :minlength="3" :maxlength="10"></el-input>
          </el-form-item>
        <el-form-item label="Ativo">
          <el-switch v-model="form.status" on-color="#13ce66" off-color="#ff4949" :on-value="true" :off-value="false" on-text="Sim" off-text="Não"></el-switch>
        </el-form-item>

        <h2>Contatos</h2>
        <el-form-item label="Nome">
          <el-input v-model="form.contact.name" type="text" placeholder="Informe o nome" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Celular">
          <el-input v-model="form.contact.cellphone" type="text" placeholder="Informe o celular" :minlength="11" :maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="WhatsApp">
          <el-input v-model="form.contact.whatsapp" type="text" placeholder="Informe o whatsapp" :minlength="11" :maxlength="15"></el-input>
        </el-form-item>

        <el-button type="success" @click="save">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'ads-create',
  data () {
    return {
      users: [],
      loading: false,
      form: {
        title: '',
        description: '',
        content: '',
        price: '',
        status: '',
        category_id: '',
        user_id: '',
        contact: {
          name: '',
          cellphone: '',
          whatsapp: ''
        }
      }
    }
  },
  methods: {
    save () {
      this.$store.dispatch('createAd', this.form).then((response) => {
        if (response.ok) {
          this.$router.push({ name: 'ads.index' })
        }
      }, (error) => {
        console.log(error)
        this.$message({
          showClose: true,
          message: 'Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.',
          type: 'error'
        })
      })
    },
    remoteUsers (query) {
      if (query !== '') {
        this.loading = true
        this.$store.dispatch('getUsers').then((response) => {
          this.loading = false
          if (response.body.data) {
            this.users = response.body.data.filter(user => {
              let q = query.toString()
              return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1
            })
          }
        })
      } else {
        this.users = []
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
  created () {
    this.$store.dispatch('getCategories')
  }
}
</script>

<style>
  fieldset {
    border: 0 none;
    padding: 0;
    margin: 0 auto;
  }
</style>
