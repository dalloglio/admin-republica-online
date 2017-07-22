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

      <el-alert :closable="false" title="Atenção" description="Todos os campos devem ser preenchidos." type="warning" show-icon></el-alert>

      <el-form label-position="top" :model="form">
        <el-form-item label="Nome completo">
          <el-input v-model="form.name" type="text" placeholder="Informe o nome completo" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Nome">
          <el-input v-model="form.first_name" type="text" placeholder="Informe o nome" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Sobrenome">
          <el-input v-model="form.last_name" type="text" placeholder="Informe o sobrenome" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Aniversário">
          <el-date-picker v-model="form.birthday" type="date" placeholder="Informe a data de nascimento" format="dd/MM/yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="form.email" type="email" placeholder="Informe o e-mail" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Senha">
          <el-input v-model="form.password" type="password" placeholder="Informe a senha" :minlength="6" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Sexo">
          <el-radio-group v-model="form.gender">
            <el-radio-button label="Male">Masculino</el-radio-button>
            <el-radio-button label="Female">Feminino</el-radio-button>
          </el-radio-group>
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
  'name': 'users-create',
  data () {
    return {
      form: {
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        gender: '',
        birthday: '',
        status: ''
      }
    }
  },
  methods: {
    save () {
      this.form.birthday = this.date.toDate(this.form.birthday)
      this.$store.dispatch('createUser', this.form).then((response) => {
        if (response.ok) {
          this.$router.push({ name: 'users.index' })
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
