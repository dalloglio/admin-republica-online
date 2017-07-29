<template>
  <div class="filters edit">
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

    <el-card class="box-card">

      <el-alert :closable="false" title="Atenção" description="Todos os campos devem ser preenchidos." type="warning" show-icon></el-alert>

      <el-form label-position="top" :model="form">
        <el-form-item label="Título">
          <el-input v-model="form.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Descrição">
          <el-input v-model="form.description" type="text" placeholder="Informe uma descrição" :minlength="3" :maxlength="255"></el-input>
          </el-form-item>
        <el-form-item label="Tipo">
          <el-select v-model="form.type" placeholder="Escolha o tipo">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.values" label="Valores">
          <el-select v-model="form.values" multiple filterable allow-create placeholder="Adicione os valores do filtro">
            <el-option v-for="item in values" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="success" @click="save" :disabled="saving">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'filters-edit',
  data () {
    return {
      saving: false,
      values: [],
      types: [{
        value: 'select',
        label: 'Select'
      }]
    }
  },
  methods: {
    save () {
      let params = {
        id: this.$route.params.id,
        data: this.form
      }
      this.$store.dispatch('updateFilter', params).then((response) => {
        if (response.ok) {
          this.$router.push({ name: 'filters.index' })
        }
      }, (error) => {
        console.log(error)
        this.$message({
          showClose: true,
          message: 'Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.',
          type: 'error'
        })
      })
    }
  },
  computed: {
    form () {
      return this.$store.state.filter.filter
    }
  },
  created () {
    this.$store.dispatch('getFilter', this.$route.params.id)
  }
}
</script>
