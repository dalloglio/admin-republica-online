<template>
  <div class="filters index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Filtros</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Filtros
      <el-button-group class="right">
        <el-button type="success" @click="url.go({ name: 'filters.create' })">Criar filtro</el-button>
      </el-button-group>
    </h1>

    <el-table :data="filters" empty-text="Não há registros..." :default-sort="{ prop: 'title', order: 'ascending' }" border stripe fit>
      <el-table-column prop="title" label="Título" sortable></el-table-column>
      <el-table-column prop="description" label="Descrição" sortable></el-table-column>
      <el-table-column prop="type" label="Tipo" sortable></el-table-column>
      <el-table-column prop="created_at" label="Data de criação" sortable :formatter="datetimeToBr"></el-table-column>
      <el-table-column
        align="center"
        label="Ações"
        width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="info" size="small" @click="url.go({ name: 'filters.edit', params: { id: scope.row.id } })">Editar</el-button>
            <el-button type="danger" size="small" @click.native.prevent="deleteFilter(scope.row.id)">Excluir</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'filters-index',
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
    deleteFilter (id) {
      if (!Number.isInteger(id) || !confirm('Você tem certeza que deseja excluir este registro?')) {
        return
      }
      let filter = this.$store.getters.getFilterById(id)
      if (Number.isInteger(filter.id)) {
        this.$store.dispatch('deleteFilter', filter.id).then((response) => {
          if (response.ok) {
            this.$store.dispatch('getFilters')
          }
        }, (error) => {
          console.log(error)
        })
      }
    }
  },
  computed: {
    filters () {
      return this.$store.state.filter.filters.data
    }
  },
  created () {
    this.$store.dispatch('getFilters')
  },
  beforeDestroy () {
    this.$store.commit('setFilters', [])
  }
}
</script>
