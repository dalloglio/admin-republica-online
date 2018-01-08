<template lang="html">
  <div class="navbar">
    <el-menu theme="dark" mode="horizontal" :router="true">
      <!-- <el-menu-item index="0">
        <i class="fa fa-fw fa-bars"></i>
      </el-menu-item> -->

      <el-menu-item index="1" class="logout" :route="{ name: 'auth.logout' }">
        <i class="fa fa-fw fa-sign-out"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style lang="css" scoped>
  .el-menu {
    border-radius: 0;
  }
  .el-menu .el-menu-item {
    border-bottom: 0 none;
  }
  .el-menu .el-menu-item i.fa {
    vertical-align: top;
    line-height: 60px;
    font-size: 2em;
  }
  .el-menu .el-menu-item.logout {
    float: right;
  }
</style>
