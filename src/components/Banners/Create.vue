<template>
  <div class="banners create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'banners.index' }">Banners</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar banner
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'banners.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-alert :closable="false" title="Atenção" description="Os campos com * devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form ref="form" label-position="top" :model="form" :rules="rules">
      <banners-form-banner :model="form"></banners-form-banner>
      <el-button type="success" @click="save" :loading="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
  import BannersFormBanner from '@/components/Banners/Form/Banner'
  import Banner from '@/utils/domains/banner'
  import rules from '@/utils/rules/banner-create'
  export default {
    name: 'banners-create',
    components: {
      BannersFormBanner
    },
    data () {
      return {
        saving: false,
        rules: rules,
        form: new Banner()
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            this.$store.dispatch('createBanner', this.form).then((response) => {
              if (response.ok) {
                if (this.form.photo instanceof File) {
                  let photoData = new FormData()
                  photoData.append('photo', this.form.photo)
                  let params = {
                    id: response.body.id,
                    data: photoData
                  }
                  this.$store.dispatch('createBannerPhoto', params).then((response) => {
                    this.saving = false
                    if (response.ok) {
                      this.$router.push({ name: 'banners.index' })
                    }
                  }, (error) => {
                    this.saving = false
                    console.log(error)
                  })
                } else {
                  this.saving = false
                  this.$router.push({ name: 'banners.index' })
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
    }
  }
</script>
