<template>
  <div class="app-upload">
    <ul class="filelist">
      <li v-for="(file, index) in files">
        <a :title="file.name">
          <img :src="file.url" :alt="file.name">
          <el-button type="danger" size="mini" @click="removeFile(file, index)">excluir</el-button>
        </a>
      </li>
      <li class="uploader" v-if="files.length < maxFiles">
        <a title="Clique para selecionar">
          <input type="file" name="app-upload" id="app-upload" :multiple="multipleFiles" @change="onChangeFile" accept="image/*">
          <label for="app-upload">
            <i class="el-icon-plus"></i>
          </label>
        </a>
      </li>
    </ul>
    <p><small>JPG, PNG ou GIF com até 5MB.</small></p>
  </div>
</template>

<script>
export default {
  name: 'app-upload',
  props: {
    dataFiles: {
      type: Array,
      default: []
    },
    maxFiles: {
      type: Number,
      default: 10
    },
    multipleFiles: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      files: this.dataFiles,
      filesToUpload: 0
    }
  },
  methods: {
    onChangeFile (e) {
      if (e.target.files.length > 0) {
        this.prepareFiles(e.target.files)
      }
    },
    prepareFiles (fileList) {
      if (fileList.length > this.maxFiles) {
        this.$message.error('Você só pode enviar até ' + this.maxFiles + ' arquivos.')
      }

      Array.from(fileList).forEach((file) => {
        file.url = window.URL.createObjectURL(file)
        this.dataFiles.push(file)
        this.filesToUpload++
      })

      if (this.dataFiles.length > this.maxFiles) {
        this.$message.error('Você só pode enviar até ' + this.maxFiles + ' arquivos.')
      }

      this.dataFiles.slice(0, this.maxFiles)
    },
    removeFile (file, index) {
      if (this.dataFiles[index]) {
        if (file.id > 0) {
          this.$store.dispatch('deletePhoto', file.id).then((response) => {
            this.dataFiles.splice(index, 1)
            this.$emit('upload-remove', file)
          }, (error) => {
            console.log(error)
            this.$message.error('Não foi possível excluir o arquivo.')
          })
        } else {
          this.dataFiles.splice(index, 1)
        }
      }
    },
    uploadStart (destroy = false, params = {}) {
      if (destroy) {
        return
      }
      let self = this
      if (self.filesToUpload > 0) {
        let total = 0
        self.dataFiles.forEach((file, index) => {
          if (file instanceof File) {
            let formData = new FormData()
            formData.append(params.input, file, file.name)
            let data = {
              id: params.id,
              data: formData
            }
            self.$store.dispatch(params.action, data).then((response) => {
              if (response.ok) {
                total++
                if (total === self.filesToUpload) {
                  self.dataFiles.splice(0)
                  self.$emit('upload-complete')
                }
              }
            }, (error) => {
              console.log(error)
              self.$message.error('O arquivo ' + file.name + ' não foi enviado.')
            })
          }
        })
      } else {
        this.uploadComplete()
      }
    },
    uploadComplete () {
      this.dataFiles.splice(0)
      this.$emit('upload-complete')
    }
  },
  created () {
    window.events.$on('upload-start', (params) => this.uploadStart(false, params))
  },
  beforeDestroy () {
    window.events.$off('upload-start', () => this.uploadStart(true))
  }
}
</script>

<style scoped>
.filelist {
  position: relative;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.filelist:after {
  display: table;
  content: "";
  clear: both;
}
.filelist li {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
.filelist li a {
  position: relative;
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 6px;
  border: 2px solid #20a0ff;
  background-color: #fff;
  overflow: hidden;
}
.filelist li a img {
  position: relative;
  width: 100px;
  height: 100px;
}
.filelist li a button {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.filelist li.uploader {
  margin-right: 0;
}
.filelist li.uploader a {
  border-color: #20a0ff;
  border-style: dashed;
}
.filelist li.uploader a input {
  display: none;
}
.filelist li.uploader a label {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #f5f5f5;
  color: #777;
  font-size: 1.5em;
  line-height: 100px;
  text-align: center;
}
.filelist li.uploader:hover a label {
  cursor: pointer;
  background-color: #f9f9f9;
  color: #555;
}
p>small {
  color: #999;
}
</style>
