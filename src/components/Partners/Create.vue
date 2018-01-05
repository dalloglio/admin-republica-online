<template>
  <div class="partners create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'partners.index' }">Parceiros</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar parceiro
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'partners.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-alert :closable="false" title="Atenção" description="Os campos com * devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form ref="form" label-position="top" :model="form" :rules="rules">
      <partners-form-partner :model="form"></partners-form-partner>
      <el-button type="success" @click="save" :loading="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
  import PartnersFormPartner from '@/components/Partners/Form/Partner'
  import Partner from '@/utils/domains/partner'
  import rules from '@/utils/rules/partner-create'
  export default {
    name: 'partners-create',
    components: {
      PartnersFormPartner
    },
    data () {
      return {
        saving: false,
        rules: rules,
        form: new Partner()
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            this.$store.dispatch('createPartner', this.form).then((response) => {
              if (response.ok) {
                if (this.form.photo instanceof File) {
                  let photoData = new FormData()
                  photoData.append('photo', this.form.photo)
                  let params = {
                    id: response.body.id,
                    data: photoData
                  }
                  this.$store.dispatch('createPartnerPhoto', params).then((response) => {
                    this.saving = false
                    if (response.ok) {
                      this.$router.push({ name: 'partners.index' })
                    }
                  }, (error) => {
                    this.saving = false
                    console.log(error)
                  })
                } else {
                  this.saving = false
                  this.$router.push({ name: 'partners.index' })
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

<style>
  .el-select .el-input {
    width: 90px;
  }
</style>

