<template>
  <div class="hello bg-black">
    <el-row type="flex" justify="center" align="middle">
      <el-col>
        <i class="fa fa-2x fa-paw"></i>
        <h1>Olá!<small>Seja bem vindo</small></h1>
        <p>Aqui esta o painel de administração de conteúdo do site.</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hello'
}
</script>

<style scoped>
  .hello {
    height: 100%;
    text-align: center;
  }
  .el-row {
    height: 100%;
  }
  small {
    display: block;
  }
  p {
    color: #999;
  }
</style>
