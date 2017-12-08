<template>
  <div class="ads edit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'ads.index' }">Anúncios</el-breadcrumb-item>
      <el-breadcrumb-item>Editar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Editar anúncio
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'ads.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-alert :closable="false" title="Atenção" description="Todos os campos devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form label-position="top" :model="form">
      <el-card class="box-card">
        <el-form-item label="Usuário">
          <el-select v-model="form.user_id" filterable remote placeholder="Digite algo para buscar um usuário" :remote-method="remoteUsers" :loading="loading" :default-first-option="false">
            <el-option v-for="user in users" :key="user.id" :label="user.name" :value="user.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Categoria">
          <el-select v-model="form.category_id" placeholder="Escolha uma categoria" @change="getCategory">
            <el-option v-for="category in categories" :key="category.id" :label="category.title" :value="category.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Título">
          <el-input v-model="form.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Descrição">
          <el-input v-model="form.description" type="textarea" placeholder="Informe uma descrição" :minlength="10" :maxlength="~500" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="Preço">
          <el-input v-model="form.price" type="text" placeholder="Informe o preço." :minlength="3" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="Ativo">
          <el-switch v-model="form.status" on-color="#13ce66" off-color="#ff4949" :on-value="true" :off-value="false" on-text="Sim" off-text="Não"></el-switch>
        </el-form-item>
      </el-card>

      <div v-if="filters.length" id="filters">
        <el-card class="box-card">
          <h2>Filtros</h2>
          <el-row :gutter="20">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" v-for="(filter, index) in filters" :key="filter.id">
              <el-form-item :label="filter.title">
                <el-select v-model="form.details[filter.id]" :placeholder="filter.description">
                  <el-option v-for="input in filter.inputs" :key="input.id" :label="input.value" :value="input.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </div>

      <el-card class="box-card">
        <h2>Endereço</h2>
        <el-form-item label="Cep">
          <el-input v-model="form.address.zip_code" type="text" placeholder="Informe o cep" :minlength="8" :maxlength="9" @blur="pesquisarCep"></el-input>
        </el-form-item>
        <el-form-item label="Estado">
          <el-input v-model="form.address.state_initials" type="text" placeholder="Informe o estado" :minlength="2" :maxlength="2"></el-input>
        </el-form-item>
        <el-form-item label="Cidade">
          <el-input v-model="form.address.city" type="text" placeholder="Informe a cidade" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Bairro">
          <el-input v-model="form.address.neighborhood" type="text" placeholder="Informe o bairro" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Rua">
          <el-input v-model="form.address.street" type="text" placeholder="Informe a rua" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Número">
          <el-input v-model="form.address.number" type="text" placeholder="Informe o número" :minlength="3" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Complemento">
          <el-input v-model="form.address.sub_address" type="text" placeholder="Informe o complemento" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="No mapa">
          <el-radio-group v-model="form.address.show_on_map">
            <el-radio v-for="option in showOnMapOptions" :key="option.key" :label="option.key">{{ option.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <h2>Fotos</h2>
        <app-upload
        :data-files="files"
        :params="params"
        :max-files="maxFiles"
        @upload-remove="uploadRemove"
        @upload-complete="uploadComplete"></app-upload>
      </el-card>

      <el-card class="box-card">
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
      </el-card>

      <el-button type="success" @click="save" :loading="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
import AppUpload from '@/components/Shared/AppUpload'
export default {
  'name': 'ads-edit',
  components: {
    AppUpload
  },
  data () {
    return {
      maxFiles: 8,
      params: {
        id: this.$route.params.id,
        input: 'photo',
        action: 'createAdPhoto'
      },
      users: [],
      loading: false,
      saving: false,
      query: '',
      showOnMapOptions: [
        { key: 'default', value: 'Não mostrar' },
        { key: 'approximate', value: 'Mostrar a localização aproximada' },
        { key: 'exact', value: 'Mostrar a localização exata' }
      ]
    }
  },
  methods: {
    getCategory () {
      if (this.form.category_id) {
        this.$store.dispatch('getCategory', this.form.category_id)
      }
    },
    save () {
      this.saving = true
      let params = {
        id: this.$route.params.id,
        data: this.form
      }
      this.$store.dispatch('updateAd', params).then((response) => {
        if (response.ok) {
          window.events.$emit('upload-start')
        } else {
          this.saving = false
        }
      }, (error) => {
        this.saving = false
        console.log(error)
        this.$message.error('Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.')
      })
    },
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
    },
    pesquisarCep () {
      if (this.form.address.zip_code !== '') {
        this.cep.pesquisar(this.form.address.zip_code, this.form.address)
      }
    },
    uploadRemove () {},
    uploadComplete () {
      this.$router.push({ name: 'ads.index' })
    }
  },
  computed: {
    form () {
      let ad = this.$store.state.ad.ad
      let data = []
      let detailsAd = ad.details || []
      if (detailsAd.length) {
        let details = detailsAd
        for (let detail in details) {
          let index = details[detail].filter_id
          let value = details[detail].input_id
          data[index] = value
        }
      }
      ad.details = data

      if (!ad.address) {
        ad.address = {}
      }

      if (!ad.contact) {
        ad.contact = {}
      }

      return ad
    },
    files () {
      let photos = this.$store.state.ad.ad.photos || []
      let files = []
      photos.forEach((file, index) => {
        files.push({
          id: file.id,
          name: file.name,
          url: this.$store.getters.urlPhoto(file.id)
        })
      })
      return files
    },
    categories () {
      let categories = this.$store.state.category.categories || {}
      let data = []
      if (categories.data) {
        data = categories.data
      }
      return data
    },
    filters () {
      return this.$store.state.category.category.filters || []
    }
  },
  created () {
    this.$store.dispatch('getAd', this.$route.params.id)
    this.$store.dispatch('getCategories')
  },
  beforeDestroy () {
    this.$store.commit('setAd', {})
  }
}
</script>
