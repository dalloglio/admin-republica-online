<template>
  <div class="partners index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Parceiros</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Parceiros
      <el-button-group class="right">
        <el-button type="success" @click="url.go({ name: 'partners.create' })">Criar parceiro</el-button>
      </el-button-group>
    </h1>

    <el-table :data="partners" empty-text="Não há registros..." :default-sort="{ prop: 'title', order: 'ascending' }" border stripe fit>
      <el-table-column prop="title" label="Título" sortable></el-table-column>
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
            <el-button type="info" size="small" @click="url.go({ name: 'partners.edit', params: { id: scope.row.id } })">Editar</el-button>
            <el-button type="danger" size="small" @click.native.prevent="deletePartner(scope.row.id)">Excluir</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'partners-index',
  methods: {
    datetimeToBr (row, column, date) {
      return this.date.toDateTimeBr(date)
    },
    deletePartner (id) {
      if (!Number.isInteger(id) || !confirm('Você tem certeza que deseja excluir este registro?')) {
        return
      }
      let partner = this.$store.getters.getPartnerById(id)
      if (Number.isInteger(partner.id)) {
        this.$store.dispatch('deletePartner', partner.id).then((response) => {
          if (response.ok) {
            this.$store.dispatch('getPartners')
          }
        }, (error) => {
          console.log(error)
        })
      }
    }
  },
  computed: {
    partners () {
      return this.$store.state.partner.partners.data
    }
  },
  created () {
    this.$store.dispatch('getPartners')
  }
}
</script>
