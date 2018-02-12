<template>
  <div class="categories edit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'categories.index' }">Categorias</el-breadcrumb-item>
      <el-breadcrumb-item>Editar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Editar categoria
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'categories.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-alert :closable="false" title="Atenção" description="Os campos com * devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form ref="form" label-position="top" :model="form" :rules="rules">
      <categories-form-category :model="form"></categories-form-category>
      <el-button type="success" @click="save" :loading="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
  import CategoriesFormCategory from '@/components/Categories/Form/Category'
  import Category from '@/utils/domains/category'
  import rules from '@/utils/rules/category-edit'
  export default {
    name: 'categories-edit',
    components: {
      CategoriesFormCategory
    },
    data () {
      return {
        saving: false,
        rules: rules,
        filterMethod (query, item) {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        }
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            this.form.status = 1
            let params = {
              id: this.$route.params.id,
              data: this.form
            }
            this.$store.dispatch('updateCategory', params).then((response) => {
              this.saving = false
              if (response.ok) {
                this.$router.push({ name: 'categories.index' })
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
        return this.$store.state.category.category || new Category()
      }
    },
    beforeDestroy () {
      this.$store.commit('setCategory', {})
    }
  }
</script>
