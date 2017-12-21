<template>
  <div class="ads index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Anúncios</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Anúncios
      <el-button-group class="right">
        <el-button type="success" @click="url.go({ name: 'ads.create' })">Criar anúncio</el-button>
      </el-button-group>
    </h1>

    <el-table :data="ads" empty-text="Não há registros..." :default-sort="{ prop: 'title', order: 'ascending' }" border stripe fit>
      <el-table-column prop="title" label="Título" sortable></el-table-column>
      <el-table-column prop="price" label="Preço" sortable></el-table-column>
      <el-table-column prop="status" label="Ativo" sortable :formatter="status"></el-table-column>
      <el-table-column prop="created_at" label="Data de criação" sortable :formatter="datetimeToBr"></el-table-column>
      <el-table-column
        align="center"
        label="Ações"
        width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="info" size="small" @click="url.go({ name: 'ads.edit', params: { id: scope.row.id } })">Editar</el-button>
            <el-button type="danger" size="small" @click.native.prevent="deleteAd(scope.row.id)">Excluir</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ads-index',
    methods: {
      status (row, column, status) {
        if (status) {
          return 'Sim'
        }
        return 'Não'
      },
      datetimeToBr (row, column, date) {
        return this.date.toDateTimeBr(date)
      },
      deleteAd (id) {
        if (!Number.isInteger(id) || !confirm('Você tem certeza que deseja excluir este registro?')) {
          return
        }
        let ad = this.$store.getters.getAdById(id)
        if (Number.isInteger(ad.id)) {
          this.$store.dispatch('deleteAd', ad.id).then((response) => {
            if (response.ok) {
              this.$store.dispatch('getAds')
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    computed: {
      ads () {
        return this.$store.state.ad.ads.data
      }
    },
    beforeCreate () {
      this.$loader.open()
    },
    created () {
      this.$store.dispatch('getAds').then(() => {
        this.$loader.close()
      })
    },
    beforeDestroy () {
      this.$store.commit('setAds', [])
    }
  }
</script>
