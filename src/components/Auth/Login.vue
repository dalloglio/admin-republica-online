<template>
    <div class="login">
        <form class="form-signin" @submit.prevent="submit">
            <h2 class="form-signin-heading">Login</h2>
            <label for="inputEmail" class="sr-only">Email</label>
            <input v-model="user.username" type="email" id="inputEmail" class="form-control" placeholder="Email" required="" autofocus="">
            <label for="inputPassword" class="sr-only">Senha</label>
            <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Senha" required="">
            <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
        </form>
    </div>
</template>

<script>
import Auth from '../../auth'

export default {
    name: 'login',
    data: function () {
        return {
            user: {}
        }
    },
    methods: {
        submit () {
            Auth.login(this.user.username, this.user.password)
        }
    }
}
</script>

<style scoped>
.form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
    margin-bottom: 10px;
}
.form-signin .checkbox {
    font-weight: normal;
}
.form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
