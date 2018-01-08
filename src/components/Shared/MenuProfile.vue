<template lang="html">
  <div class="menu-profile">
    <div class="avatar">
      <img v-if="photoUrl" :src="photoUrl" :alt="user.name">
      <avatar v-else :username="user.name" :size="40" background-color="#324157"></avatar>
    </div>
    <div class="user">
      {{ user.name }}
    </div>
  </div>
</template>

<script>
  import Avatar from 'vue-avatar'
  export default {
    name: 'menu-profile',
    components: {
      Avatar
    },
    computed: {
      user () {
        return this.$store.state.auth.user || {}
      },
      photo () {
        return this.user.photo || {}
      },
      photoUrl () {
        let url = ''
        if (this.photo.id > 0) {
          url = this.$store.getters.urlPhoto(this.photo.id)
        }
        return url
      }
    }
  }
</script>

<style lang="css" scoped>
.menu-profile {
  display: table;
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0;
  background-color: #bfcbd9;
  color: #324157;
}
.menu-profile .avatar {
  display: table-cell;
  vertical-align: middle;
  padding: 9px 10px 8px 20px;
  width: 40px;
  height: 40px;
}
.menu-profile .avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.menu-profile .user {
  display: table-cell;
  vertical-align: middle;
  text-align: left;
  padding: 9px 20px 8px 10px;
}
</style>
