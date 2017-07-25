<template>
  <div class="login">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="4">

        <el-card>

          <h1>Login</h1>

          <el-form label-position="top" :model="user" class="clearfix">
            <el-form-item label="E-mail">
              <el-input v-model="user.username" :required="true" placeholder="E-mail" type="email" :minlength="3" :maxlength="255" :autofocus="true"></el-input>
            </el-form-item>

            <el-form-item label="Senha">
              <el-input v-model="user.password" :required="true" placeholder="Senha" type="password" :minlength="6" :maxlength="20"></el-input>
            </el-form-item>

            <el-button type="primary" class="right" @click="onSubmit">Entrar</el-button>
          </el-form>

        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      this.$auth.login(this.user)
    }
  }
}
</script>

<style>
body,
#app,
#app main,
#app main .login,
#app main .login .el-row {
  height: 100%;
}

#app > main {
  margin: 0 auto;
  padding: 0;
  width: 100%;
}
form {
  position: relative;
}
h1 {
  text-transform: uppercase;
  text-align: center;
  color: #444;
}
.el-form--label-top .el-form-item__label {
  display: none;
}
.el-button {
  padding-left: 30px;
  padding-right: 30px;
  text-transform: uppercase;
}
</style>
