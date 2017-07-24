<template>
  <div class="login">
    <h1>Login</h1>
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
#app > main {
  margin: 0 auto;
  padding: 0;
  width: 100%;
}
</style>
