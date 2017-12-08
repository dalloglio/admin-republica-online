<template>
  <div class="banners index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Banners</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Banners
      <el-button-group class="right">
        <el-button type="success" @click="url.go({ name: 'banners.create' })">Criar banner</el-button>
      </el-button-group>
    </h1>

    <el-table :data="banners" empty-text="Não há registros..." :default-sort="{ prop: 'title', order: 'ascending' }" border stripe fit>
      <el-table-column prop="title" label="Título" sortable></el-table-column>
      <el-table-column prop="size" label="Tamanho" sortable></el-table-column>
      <el-table-column prop="link" label="Link" sortable>
        <template scope="scope">
          <a v-if="scope.row.link" :href="scope.row.link" target="_blank">Visitar o link</a>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="Data de criação" sortable :formatter="datetimeToBr"></el-table-column>
      <el-table-column
        align="center"
        label="Ações"
        width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="info" size="small" @click="url.go({ name: 'banners.edit', params: { id: scope.row.id } })">Editar</el-button>
            <el-button type="danger" size="small" @click.native.prevent="deleteBanner(scope.row.id)">Excluir</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'banners-index',
  methods: {
    datetimeToBr (row, column, date) {
      return this.date.toDateTimeBr(date)
    },
    deleteBanner (id) {
      if (!Number.isInteger(id) || !confirm('Você tem certeza que deseja excluir este registro?')) {
        return
      }
      let banner = this.$store.getters.getBannerById(id)
      if (Number.isInteger(banner.id)) {
        this.$store.dispatch('deleteBanner', banner.id).then((response) => {
          if (response.ok) {
            this.$store.dispatch('getBanners')
          }
        }, (error) => {
          console.log(error)
        })
      }
    }
  },
  computed: {
    banners () {
      return this.$store.state.banner.banners.data
    }
  },
  created () {
    this.$store.dispatch('getBanners')
  },
  beforeDestroy () {
    this.$store.commit('setBanners', [])
  }
}
</script>
