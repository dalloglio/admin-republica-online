<template lang="html">
  <div class="menu">
    <el-menu mode="vertical" default-active="0" theme="dark" :router="true">
      <app-menu-profile></app-menu-profile>
      <el-menu-item-group title="Cadastros">
        <el-menu-item index="1" :route="{ name: 'ads.index' }"><i class="fa fa-fw fa-clone"></i>Anúncios</el-menu-item>
        <el-menu-item index="2" :route="{ name: 'banners.index' }"><i class="fa fa-fw fa-picture-o"></i>Banners</el-menu-item>
        <el-menu-item index="3" :route="{ name: 'categories.index' }"><i class="fa fa-fw fa-share-alt"></i>Categorias</el-menu-item>
        <el-menu-item index="4" :route="{ name: 'filters.index' }"><i class="fa fa-fw fa-list-ul"></i>Filtros</el-menu-item>
        <el-menu-item index="5" :route="{ name: 'partners.index' }"><i class="fa fa-fw fa-briefcase"></i>Parceiros</el-menu-item>
        <el-menu-item index="6" :route="{ name: 'users.index' }"><i class="fa fa-fw fa-users"></i>Usuários</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Formulários">
        <el-menu-item index="7" :route="{ name: 'contacts.index' }"><i class="fa fa-fw fa-envelope-o"></i>Contatos</el-menu-item>
        <el-menu-item index="8" :route="{ name: 'newsletters.index' }"><i class="fa fa-fw fa-newspaper-o"></i>Newsletters</el-menu-item>
        <el-menu-item index="9" :route="{ name: 'resumes.index' }"><i class="fa fa-fw fa-graduation-cap"></i>Trabalhe Conosco</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
  import AppMenuProfile from '@/components/Shared/MenuProfile'
  export default {
    name: 'menu',
    components: {
      AppMenuProfile
    }
  }
</script>

<style scoped>
  .menu, .el-menu {
    height: 100%;
    overflow: hidden;
  }
  i.fa {
    margin-right: 10px;
  }
  @media (max-height: 600px) {
    .el-menu {
      overflow-y: scroll;
    }
  }
</style>
