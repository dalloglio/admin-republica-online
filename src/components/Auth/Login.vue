<template>
  <div class="login">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">

        <el-card>

          <h1><small>Admin</small>Login</h1>

          <el-form label-position="top" :model="user" class="clearfix">
            <el-form-item label="E-mail">
              <el-input v-model="user.username" :required="true" placeholder="E-mail" type="email" :minlength="3" :maxlength="255" :autofocus="true"></el-input>
            </el-form-item>

            <el-form-item label="Senha">
              <el-input v-model="user.password" :required="true" placeholder="Senha" type="password" :minlength="6" :maxlength="20"></el-input>
            </el-form-item>

            <el-button type="primary" class="right" @click="onSubmit" :loading="loading">Entrar</el-button>
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
      loading: false,
      user: {
        username: 'ricardo.tech@live.com',
        password: '123456'
      }
    }
  },
  methods: {
    onSubmit: function () {
      this.loading = true
      this.$auth.login(this.user).then((response) => {
        this.loading = false
        if (response.status === true) {
          this.$router.push({ name: response.redirect })
        } else {
          this.message('Oops, não foi possível fazer login! ' + response.message)
        }
      }, (error) => {
        this.loading = false
        this.message('Oops, não foi possível fazer login! ' + error.message)
      })
    },

    message: function (msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      })
    }
  }
}
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
.login .el-row {
  height: 100%;
}

.login {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#1e5799+0,7db9e8+100 */
  background: #1e5799; /* Old browsers */
  background: -moz-linear-gradient(top, #1e5799 0%, #7db9e8 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #1e5799 0%,#7db9e8 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #1e5799 0%,#7db9e8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */
}
form {
  position: relative;
}
h1 {
  text-transform: uppercase;
  text-align: center;
  color: #444;
}
h1 small {
  display: block;
  color: #999;
  font-size: 0.50em;
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
