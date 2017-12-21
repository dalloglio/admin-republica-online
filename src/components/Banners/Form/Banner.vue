<template>
  <el-card class="box-card">
    <el-form-item label="Título" prop="title">
      <el-input v-model="model.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Descrição" prop="description">
      <el-input v-model="model.description" type="text" placeholder="Informe uma descrição" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Link" prop="link">
      <el-input v-model="model.link" type="text" placeholder="Informe o link" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Tamanho" prop="size">
      <el-select v-model="model.size" placeholder="Escolha o tamanho">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
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
        :file-list="fileList"
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
  </el-card>
</template>

<script>
  import Banner from '@/utils/domains/banner'
  export default {
    name: 'banners-form-banner',
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        imageUrl: '',
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
        },
        options: Banner.sizes()
      }
    },
    computed: {
      file () {
        return this.model.photo || {
          id: null,
          name: null
        }
      },
      fileList () {
        return [{
          name: this.file.name || '',
          url: this.photoUrl || ''
        }]
      },
      photoUrl () {
        let url = ''
        if (this.file.id > 0) {
          url = this.$store.getters.urlPhoto(this.file.id)
        }
        this.imageUrl = url
        return url
      }
    },
    methods: {
      deletePhoto () {
        if (Number.isInteger(this.file.id)) {
          this.$store.dispatch('deletePhoto', this.file.id).then((response) => {
            if (response.ok) {
              this.model.photo = {}
              this.imageUrl = ''
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          this.model.photo = {}
          this.imageUrl = ''
        }
      },
      onChange (file, fileList) {
        this.model.photo = file.raw
        this.imageUrl = file.url
      }
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
