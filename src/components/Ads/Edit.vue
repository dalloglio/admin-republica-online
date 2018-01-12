<template>
  <div v-if="form.id" class="ads edit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'ads.index' }">Anúncios</el-breadcrumb-item>
      <el-breadcrumb-item>Editar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Editar anúncio
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
  import Address from '@/utils/domains/address'
  import Contact from '@/utils/domains/contact'
  import rules from '@/utils/rules/ad-edit'
  export default {
    'name': 'ads-edit',
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
            this.$store.dispatch('updateAd', params).then((response) => {
              if (response.ok) {
                window.events.$emit('upload-start', {
                  id: this.$route.params.id,
                  input: 'photo',
                  action: 'createAdPhoto'
                })
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
        let ad = this.$store.state.ad.ad || new Ad()
        let data = []
        let detailsAd = ad.details || []
        if (detailsAd.length) {
          let details = detailsAd
          for (let detail in details) {
            let index = details[detail].filter_id
            let value = details[detail].input_id
            data[index] = value
          }
        }
        ad.details = data

        if (!ad.address) {
          ad.address = new Address()
        }

        if (!ad.contact) {
          ad.contact = new Contact()
        }

        return ad
      }
    },
    beforeCreate () {
      this.$loader.open()
    },
    created () {
      this.$store.dispatch('getAd', this.$route.params.id).then(() => {
        this.$store.dispatch('getCategories').then(() => {
          this.$loader.close()
        })
      })
    },
    beforeDestroy () {
      this.$store.commit('setAd', {})
    }
  }
</script>
