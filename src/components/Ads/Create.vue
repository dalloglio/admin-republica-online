<template>
  <div class="ads create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'ads.index' }">Anúncios</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar anúncio
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'ads.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-alert :closable="false" title="Atenção" description="Os campos com * devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form ref="form" label-position="top" :model="form" :rules="rules">
      <ads-form-ad :model="form"></ads-form-ad>
      <ads-form-filters :model="form"></ads-form-filters>
      <ads-form-address :model="form"></ads-form-address>
      <ads-form-photos :model="form"></ads-form-photos>
      <ads-form-contact :model="form"></ads-form-contact>
      <el-button type="success" @click="save" :loading="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
  import AdsFormAd from '@/components/Ads/Form/Ad'
  import AdsFormFilters from '@/components/Ads/Form/Filters'
  import AdsFormAddress from '@/components/Ads/Form/Address'
  import AdsFormPhotos from '@/components/Ads/Form/Photos'
  import AdsFormContact from '@/components/Ads/Form/Contact'
  import Ad from '@/utils/domains/ad'
  import rulesForm from '@/utils/rules/form'
  export default {
    'name': 'ads-create',
    components: {
      AdsFormAd,
      AdsFormFilters,
      AdsFormAddress,
      AdsFormPhotos,
      AdsFormContact
    },
    data () {
      return {
        saving: false,
        form: new Ad(),
        rules: rulesForm.Ad
      }
    },
    methods: {
      save () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.saving = true
            this.$store.dispatch('createAd', this.form).then((response) => {
              if (response.ok) {
                window.events.$emit('upload-start', {
                  id: response.body.id,
                  input: 'photo',
                  action: 'createAdPhoto'
                })
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
    },
    beforeCreate () {
      this.$loader.open()
    },
    created () {
      this.$store.dispatch('getCategories').then(() => {
        this.$loader.close()
      })
    }
  }
</script>
