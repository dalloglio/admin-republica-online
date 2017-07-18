<template lang="html">
  <div class="menu-profile">
    <div class="avatar">
      <img src="https://randomuser.me/api/portraits/men/81.jpg">
    </div>
    <div class="user">
      Ricardo Pires Dall`Oglio
    </div>
  </div>
</template>

<script>
  export default {
    name: 'menu-profile'
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
