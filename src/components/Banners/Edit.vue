<template>
  <div class="banners edit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'banners.index' }">Banners</el-breadcrumb-item>
      <el-breadcrumb-item>Editar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Editar banner
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'banners.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-card class="box-card">

      <el-alert :closable="false" title="Atenção" description="Todos os campos devem ser preenchidos." type="warning" show-icon></el-alert>

      <el-form label-position="top" :model="form">
        <el-form-item label="Título">
          <el-input v-model="form.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Descrição">
          <el-input v-model="form.description" type="text" placeholder="Informe uma descrição" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Link">
          <el-input v-model="form.link" type="text" placeholder="Informe o link" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Tamanho">
          <el-select v-model="form.size" placeholder="Escolha o tamanho">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="success" @click="save" :disabled="saving">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'banners-edit',
  data () {
    return {
      saving: false,
      options: [{
        value: '300x600',
        label: 'Meia página (300x600)'
      }, {
        value: '970x250',
        label: 'Outdoor (970x250)'
      }]
    }
  },
  methods: {
    save () {
      this.saving = true
      let params = {
        id: this.$route.params.id,
        data: this.form
      }
      this.$store.dispatch('updateBanner', params).then((response) => {
        this.saving = false
        if (response.ok) {
          this.$router.push({ name: 'banners.index' })
        }
      }, (error) => {
        this.saving = false
        console.log(error)
        this.$message({
          showClose: true,
          message: 'Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.',
          type: 'error'
        })
      })
    }
  },
  computed: {
    form () {
      return this.$store.state.banner.banner
    }
  },
  created () {
    this.$store.dispatch('getBanner', this.$route.params.id)
  }
}
</script>
