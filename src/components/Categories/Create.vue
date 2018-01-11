<template>
  <div class="categories create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'categories.index' }">Categorias</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar categoria
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
  import rules from '@/utils/rules/category-create'
  export default {
    name: 'categories-create',
    components: {
      CategoriesFormCategory
    },
    data () {
      return {
        saving: false,
        rules: rules,
        form: new Category()
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            this.form.status = 1
            this.$store.dispatch('createCategory', this.form).then((response) => {
              this.saving = false
              if (response.ok) {
                this.$router.push({ name: 'categories.index' })
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
