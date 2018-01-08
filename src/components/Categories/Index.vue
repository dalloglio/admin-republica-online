<template>
  <div class="categories index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Categorias</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Categorias
      <el-button-group class="right">
        <el-button type="success" @click="url.go({ name: 'categories.create' })">Criar categoria</el-button>
      </el-button-group>
    </h1>

    <el-table :data="categories" empty-text="Não há registros..." :default-sort="{ prop: 'title', order: 'ascending' }" border stripe fit>
      <el-table-column prop="title" label="Título" sortable></el-table-column>
      <el-table-column prop="status" label="Ativo" sortable :formatter="status"></el-table-column>
      <el-table-column prop="created_at" label="Data de criação" sortable :formatter="datetimeToBr"></el-table-column>
      <el-table-column
        align="center"
        label="Ações"
        width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="info" size="small" @click="url.go({ name: 'categories.edit', params: { id: scope.row.id } })">Editar</el-button>
            <el-button type="danger" size="small" @click.native.prevent="deleteCategory(scope.row.id)">Excluir</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'categories-index',
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
    deleteCategory (id) {
      if (!Number.isInteger(id) || !confirm('Você tem certeza que deseja excluir este registro?')) {
        return
      }
      let category = this.$store.getters.getCategoryById(id)
      if (Number.isInteger(category.id)) {
        this.$loader.open()
        this.$store.dispatch('deleteCategory', category.id).then((response) => {
          if (response.ok) {
            this.getCategories()
          }
        }, (error) => {
          console.log(error)
        })
      }
    },
    getCategories () {
      this.$store.dispatch('getCategories').then(() => {
        this.$loader.close()
      })
    }
  },
  computed: {
    categories () {
      return this.$store.state.category.categories.data
    }
  },
  beforeCreate () {
    this.$loader.open()
  },
  created () {
    this.getCategories()
  },
  beforeDestroy () {
    this.$store.commit('setCategories', [])
  }
}
</script>
