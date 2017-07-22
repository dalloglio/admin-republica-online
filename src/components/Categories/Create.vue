<template>
  <div class="categories create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'categories.index' }">Categorias</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar categoria
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'categories.index' })">Voltar</el-button>
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
        <el-form-item label="Ativo">
          <el-switch v-model="form.status" on-color="#13ce66" off-color="#ff4949" :on-value="true" :off-value="false" on-text="Sim" off-text="Não"></el-switch>
        </el-form-item>
        <el-button type="success" @click="save">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'categories-create',
  data () {
    return {
      form: {
        title: '',
        description: '',
        status: ''
      }
    }
  },
  methods: {
    save () {
      this.$store.dispatch('createCategory', this.form).then((response) => {
        if (response.ok) {
          this.$router.push({ name: 'categories.index' })
        }
      }, (error) => {
        console.log(error)
        this.$message({
          showClose: true,
          message: 'Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.',
          type: 'error'
        })
      })
    }
  }
}
</script>
