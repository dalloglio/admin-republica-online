<template>
  <div v-if="form.id" class="partners edit">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'partners.index' }">Parceiros</el-breadcrumb-item>
      <el-breadcrumb-item>Editar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Editar parceiro
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
  import rules from '@/utils/rules/partner-edit'
  export default {
    name: 'partners-edit',
    components: {
      PartnersFormPartner
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
            this.$store.dispatch('updatePartner', params).then((response) => {
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
    },
    computed: {
      form () {
        return this.$store.state.partner.partner || new Partner()
      }
    },
    beforeCreate () {
      this.$loader.open()
    },
    created () {
      this.$store.dispatch('getPartner', this.$route.params.id).then(() => {
        this.$loader.close()
      })
    },
    beforeDestroy () {
      this.$store.commit('setPartner', {})
    }
  }
</script>

<style>
.uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader .el-upload:hover {
  border-color: #20a0ff;
}
.uploader .el-icon-plus,
.uploader .el-icon-close {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.image {
  position: relative;
  z-index: 1;
}
.image:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.8);
  z-index: 2;
  display: none;
}
.image:hover:before {
  display: block;
}
.image img {
  display: block;
  max-width: 100%;
  min-width: 178px;
  min-height: 178px;
  height: auto;
  z-index: 1;
}
.image button {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  display: none;
  z-index: 3;
}
.image:hover button {
  display: block;
}
</style>
