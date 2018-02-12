<template></template>

<script>
export default {
  beforeCreate () {
    this.$auth.logout()
    this.$store.commit('setAuthUser', {})
  }
}
</script>
