<template>
  <div class="partners edit">
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

    <el-card class="box-card">

      <el-alert :closable="false" title="Atenção" description="Todos os campos devem ser preenchidos." type="warning" show-icon></el-alert>

      <el-form label-position="top" :model="form">
        <el-form-item label="Título">
          <el-input v-model="form.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Descrição">
          <el-input v-model="form.description" type="text" placeholder="Informe uma descrição" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Link">
          <el-input v-model="form.link" type="text" placeholder="Informe o link" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Banner">
          <div v-if="imageUrl" class="image">
            <img :src="imageUrl">
            <el-button type="danger" @click="deletePhoto">Remover</el-button>
          </div>
          <el-upload
            v-else
            class="uploader"
            :data="upload.data"
            :name="upload.name"
            :action="upload.action"
            :list-type="upload.list_type"
            :show-file-list="upload.show_file_list"
            :multiple="upload.multiple"
            :accept="upload.accept"
            :auto-upload="upload.auto"
            :on-change="onChange">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">Arquivos JPEG, PNG ou GIF com um tamanho de até 2MB.</div>
          </el-upload>
        </el-form-item>
        <el-button type="success" @click="save" :disabled="saving">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'partners-edit',
  data () {
    return {
      file: null,
      imageUrl: '',
      saving: false,
      upload: {
        name: 'photo',
        action: '',
        show_file_list: false,
        list_type: 'text',
        fileList: [],
        multiple: false,
        accept: 'image/*',
        auto: false,
        disabled: true
      }
    }
  },
  methods: {
    save () {
      this.saving = true
      let params = {
        id: this.$route.params.id,
        data: this.form
      }
      this.$store.dispatch('updatePartner', params).then((response) => {
        this.saving = false
        if (response.ok) {
          if (this.file) {
            let photoData = new FormData()
            photoData.append('photo', this.file)
            let params = {
              id: response.body.id,
              data: photoData
            }
            this.$store.dispatch('createPartnerPhoto', params).then((response) => {
              if (response.ok) {
                this.$router.push({ name: 'partners.index' })
              }
            }, (error) => {
              console.log(error)
            })
          } else {
            this.$router.push({ name: 'partners.index' })
          }
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
    },
    deletePhoto () {
      if (Number.isInteger(this.photo.id)) {
        this.$store.dispatch('deletePhoto', this.photo.id).then((response) => {
          if (response.ok) {
            this.form.photo = {
              id: null,
              photo: null
            }
            this.imageUrl = ''
          }
        }, (error) => {
          console.log(error)
        })
      } else {
        this.file = {}
        this.imageUrl = ''
      }
    },
    onPreview (file) {
      console.log('onPreview...')
    },
    onRemove (file, fileList) {
      console.log('onRemove...')
      this.deletePhoto()
    },
    onSuccess (response, file, fileList) {
      console.log('onSuccess...')
    },
    onError (error, file, fileList) {
      console.log('onError...')
      return error
    },
    onChange (file, fileList) {
      console.log('onChange...')
      this.file = file.raw
      this.imageUrl = file.url
    },
    beforeUpload (file) {
      console.log('beforeUpload...')
      console.log(file)
    }
  },
  computed: {
    form () {
      return this.$store.state.partner.partner
    },
    photo () {
      if (!this.form.photo) {
        return {
          id: null,
          photo: null
        }
      }
      return this.form.photo
    },
    photoUrl () {
      let url = ''
      if (this.photo.id > 0) {
        url = this.$store.getters.urlPhoto(this.photo.id)
      }
      this.imageUrl = url
      return url
    }
  },
  created () {
    this.$store.dispatch('getPartner', this.$route.params.id)
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
