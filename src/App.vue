<template>
  <div id="app">
    <header v-if="this.$auth.isAuthenticated()">
      <app-navbar></app-navbar>
    </header>
    <aside v-if="this.$auth.isAuthenticated()">
      <app-menu></app-menu>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import appMenu from '@/components/Shared/Menu'
import appNavbar from '@/components/Shared/Navbar'
export default {
  name: 'app',
  components: {
    'app-menu': appMenu,
    'app-navbar': appNavbar
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0px;
  padding: 0px;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  color: #333;
  background-color: #fff;
  font-size: 14px;
  position: relative;
  z-index: 1;
}
a {
  color: #20a0ff;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #4db3ff;
  text-decoration: underline;
}
#app {
  position: relative;
  width: 100%;
}
#app > header {
  position: relative;
  padding-left: 200px;
  width: calc(100% - 200px);
  height: 60px;
  z-index: 2;
}
#app > aside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  z-index: 2;
}
#app > main {
  position: relative;
  margin-left: 200px;
  padding: 15px;
  width: calc(100% - 230px);
  z-index: 1;
}
#app > main .el-breadcrumb {
  margin: 10px auto;
}
#app > main .el-breadcrumb .el-breadcrumb__item {
  padding: 5px;
}

/*TIPOGRAFIA*/
h1 > small,
h2 > small,
h3 > small,
h4 > small {
  color: #999;
}

/*HELPERS*/
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.right {
  float: right;
}
.left {
  float: left;
}

/*FORM*/
.el-picker-panel.el-date-picker {
  max-width: 200px !important;
}
.el-date-editor.el-input,
.el-select {
  width: 100%;
}

/*ALERT*/
.el-alert {
  margin-bottom: 20px;
}
</style>
