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
    params: {
      type: Object,
      default: {}
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
      fileList: []
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
        this.fileList.push(file)
      })

      if (this.fileList.length > this.maxFiles) {
        this.$message.error('Você só pode enviar até ' + this.maxFiles + ' arquivos.')
      }

      this.files = this.fileList.slice(0, this.maxFiles)
      this.fileList = this.files
    },
    removeFile (file, index) {
      if (this.files[index]) {
        if (file.id > 0) {
          this.$store.dispatch('deletePhoto', file.id).then((response) => {
            this.files.splice(index, 1)
            this.$emit('upload-remove')
          }, (error) => {
            console.log(error)
            this.$message.error('Não foi possível excluir o arquivo.')
          })
        } else {
          this.files.splice(index, 1)
        }
      }
    },
    uploadStart () {
      let self = this
      let total = 0
      self.files.forEach((file, index) => {
        let formData = new FormData()
        formData.append(self.params.input, file, file.name)
        let params = {
          id: self.params.id,
          data: formData
        }
        self.$store.dispatch(self.params.action, params).then((response) => {
          if (response.ok) {
            total++
            if (total === self.files.length) {
              self.files = []
              self.fileList = []
              self.$emit('upload-complete')
            }
          }
        }, (error) => {
          console.log(error)
          self.$message.error('O arquivo ' + file.name + ' não foi enviado.')
        })
      })
    }
  },
  created () {
    window.events.$on('upload-start', () => this.uploadStart())
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
