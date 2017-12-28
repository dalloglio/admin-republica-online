<template>
  <div class="filters create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'filters.index' }">Filtros</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar filtro
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
  import rulesForm from '@/utils/rules/form'
  export default {
    name: 'filters-create',
    components: {
      FiltersFormFilter
    },
    data () {
      return {
        saving: false,
        rules: rulesForm.Filter,
        form: new Filter()
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            this.$store.dispatch('createFilter', this.form).then((response) => {
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
            }, (error) => {
              this.saving = false
              console.log(error)
              this.$message({
                showClose: true,
                message: 'Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.',
                type: 'error'
              })
            })
          } else {
            this.$message.warning('Ops, preencha corretamente o formulário!')
            return false
          }
        })
      }
    }
  }
</script>
