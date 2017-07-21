<template>
  <div class="users edit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'users.index' }">Usuários</el-breadcrumb-item>
      <el-breadcrumb-item>Editar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Editar usuário
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'users.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-card class="box-card">
      <el-form label-position="top" :model="form">
        <el-form-item label="Nome">
          <el-input v-model="form.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="form.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="Senha">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-button type="success" @click="save">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'users-edit',
  data () {
    return {
      form: {
        name: 'Ricardo Pires',
        email: 'ricardo@email.com',
        password: '123456'
      }
    }
  },
  methods: {
    save () {
      this.$router.push({ name: 'users.index' })
    }
  }
}
</script>

<style>
</style>
