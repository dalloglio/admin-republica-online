<template>
  <div v-if="form.id" class="filters edit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'filters.index' }">Filtros</el-breadcrumb-item>
      <el-breadcrumb-item>Editar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Editar filtro
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'filters.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-alert :closable="false" title="Atenção" description="Os campos com * devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form ref="form" label-position="top" :model="form" :rules="rules">
      <filters-form-filter :model="form"></filters-form-filter>
      <el-button type="success" @click="save" :loading="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
  import FiltersFormFilter from '@/components/Filters/Form/Filter'
  import Filter from '@/utils/domains/filter'
  import rules from '@/utils/rules/filter-edit'
  export default {
    'name': 'filters-edit',
    components: {
      FiltersFormFilter
    },
    data () {
      return {
        saving: false,
        rules: rules
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            let params = {
              id: this.$route.params.id,
              data: this.form
            }
            this.$store.dispatch('updateFilter', params).then((response) => {
              if (response.ok) {
                if (this.form.photo instanceof File) {
                  let photoData = new FormData()
                  photoData.append('photo', this.form.photo)
                  let params = {
                    id: response.body.id,
                    data: photoData
                  }
                  this.$store.dispatch('createFilterPhoto', params).then((response) => {
                    this.saving = false
                    if (response.ok) {
                      this.$router.push({ name: 'filters.index' })
                    }
                  }, (error) => {
                    this.saving = false
                    console.log(error)
                  })
                } else {
                  this.saving = false
                  this.$router.push({ name: 'filters.index' })
                }
              } else {
                this.saving = false
              }
            }, () => {
              this.saving = false
            })
          } else {
            this.$message.warning('Ops, preencha corretamente o formulário!')
            return false
          }
        })
      }
    },
    computed: {
      form () {
        return this.$store.state.filter.filter || new Filter()
      }
    },
    beforeCreate () {
      this.$loader.open()
    },
    created () {
      this.$store.dispatch('getFilter', this.$route.params.id).then(() => {
        this.$loader.close()
      })
    },
    beforeDestroy () {
      this.$store.commit('setFilter', {})
    }
  }
</script>
