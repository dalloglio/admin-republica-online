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

    <el-alert :closable="false" title="Atenção" description="Os campos com * devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form ref="form" label-position="top" :model="form" :rules="rules">
      <users-form-user :model="form"></users-form-user>
      <users-form-address :model="form"></users-form-address>
      <el-button type="success" @click="save" :loading="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
  import UsersFormUser from '@/components/Users/Form/User'
  import UsersFormAddress from '@/components/Users/Form/Address'
  import User from '@/utils/domains/user'
  import rules from '@/utils/rules/user-create'
  export default {
    name: 'users-create',
    components: {
      UsersFormUser,
      UsersFormAddress
    },
    data () {
      return {
        saving: false,
        form: new User(),
        rules: rules
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            this.form.birthday = this.date.toDate(this.form.birthday)
            this.$store.dispatch('createUser', this.form).then((response) => {
              if (response.ok) {
                if (this.form.photo instanceof File) {
                  let photoData = new FormData()
                  photoData.append('photo', this.form.photo)
                  let params = {
                    id: response.body.id,
                    data: photoData
                  }
                  this.$store.dispatch('createUserPhoto', params).then((response) => {
                    this.saving = false
                    if (response.ok) {
                      this.$router.push({ name: 'users.index' })
                    }
                  }, (error) => {
                    this.saving = false
                    console.log(error)
                  })
                } else {
                  this.saving = false
                  this.$router.push({ name: 'users.index' })
                }
              } else {
                this.saving = false
              }
            }, () => {
              this.saving = false
            })
          } else {
            this.$message.warning('Ops, preencha corretamente o formulário!')
            return false
          }
        })
      }
    }
  }
</script>
