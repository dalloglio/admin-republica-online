<template>
  <el-card class="box-card">
    <el-form-item label="Título" prop="title">
      <el-input v-model="model.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>
    <el-form-item label="Descrição" prop="description">
      <el-input v-model="model.description" type="text" placeholder="Informe uma descrição" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>
    <el-form-item label="Filtros">
      <el-transfer filterable
        :filter-method="filterMethod" filter-placeholder="Pesquisar filtro..." v-model="model.filters" :data="filters">
      </el-transfer>
    </el-form-item>
    <el-form-item label="Ativo" prop="status">
      <el-switch v-model="model.status" on-color="#13ce66" off-color="#ff4949" :on-value="true" :off-value="false" on-text="Sim" off-text="Não"></el-switch>
    </el-form-item>
  </el-card>
</template>

<script>
  export default {
    name: 'categories-form-category',
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        filterMethod (query, item) {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        }
      }
    },
    computed: {
      filters () {
        let data = []
        let filters = this.$store.state.filter.filters.data
        if (filters !== undefined) {
          filters.forEach((filter) => {
            data.push({
              key: filter.id,
              label: filter.title
            })
          })
        }
        return data
      }
    },
    methods: {
      getFilters () {
        this.$store.dispatch('getFilters').then(() => {
          this.$loader.close()
        })
      }
    },
    beforeCreate () {
      this.$loader.open()
    },
    created () {
      if (this.$route.params.id) {
        this.$store.dispatch('getCategory', this.$route.params.id).then((response) => {
          let filters = response.body.filters
          if (filters) {
            this.model.filters = []
            filters.forEach((filter) => {
              if (filter.id) {
                this.model.filters.push(filter.id)
              }
            })
          }
          this.getFilters()
        })
      } else {
        this.getFilters()
      }
    }
  }
</script>

