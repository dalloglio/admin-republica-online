<template></template>

<script>
export default {
  beforeCreate () {
    this.$auth.logout()
    localStorage.removeItem('vuex')
  }
}
</script>
