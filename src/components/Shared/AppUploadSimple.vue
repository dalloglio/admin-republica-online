<template>
  <el-form-item :label="label">
    <div v-if="urlPhoto" class="image">
      <img :src="urlPhoto">
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
      <div slot="tip" class="el-upload__tip">{{ info }}</div>
    </el-upload>
  </el-form-item>
</template>


<script>
  import Photo from '@/utils/domains/photo'
  export default {
    name: 'app-upload-simple',
    props: {
      label: {
        type: String,
        default: null
      },
      info: {
        type: String,
        default: null
      },
      model: {
        type: Object,
        required: true
      },
      upload: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        urlPhoto: ''
      }
    },
    computed: {
      file () {
        return this.model.photo || new Photo()
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
        this.urlPhoto = url
        return url
      }
    },
    methods: {
      deletePhoto () {
        if (Number.isInteger(this.file.id)) {
          this.$store.dispatch('deletePhoto', this.file.id).then((response) => {
            if (response.ok) {
              this.model.photo = new Photo()
              this.urlPhoto = ''
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          this.model.photo = new Photo()
          this.urlPhoto = ''
        }
      },
      onChange (file, fileList) {
        this.model.photo = file.raw
        this.urlPhoto = file.url
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
    float: left;
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
