<template>
  <div class="users create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'users.index' }">Usuários</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar usuário
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'users.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-card class="box-card">
      <el-form label-position="top" :model="form">
        <el-form-item label="Nome">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Senha">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-button type="success" @click="save">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'users-create',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    save () {
      console.log('Implementar...')
    }
  }
}
</script>

<style>
</style>
