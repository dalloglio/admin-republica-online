<template>
  <div class="filters create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'filters.index' }">Filtros</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar filtro
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'filters.index' })">Voltar</el-button>
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
        <el-form-item label="Tipo">
          <el-select v-model="form.type" placeholder="Escolha o tipo">
            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Valores">
          <el-select v-model="form.values" multiple filterable allow-create placeholder="Adicione os valores do filtro">
            <el-option v-for="item in values" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Ícone">
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
            <div slot="tip" class="el-upload__tip">Arquivo PNG com fundo transparente, nas dimensões 40px por 40px com um tamanho de até 2MB.</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Ordem">
          <el-input-number v-model="form.order" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-button type="success" @click="save" :disabled="saving">Salvar</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  'name': 'filters-create',
  data () {
    return {
      file: null,
      imageUrl: '',
      saving: false,
      upload: {
        data: {},
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
      form: {
        title: '',
        description: '',
        type: 'select',
        values: [],
        icon: '',
        order: 0
      },
      values: [],
      types: [{
        value: 'select',
        label: 'Select'
      }]
    }
  },
  methods: {
    save () {
      this.$store.dispatch('createFilter', this.form).then((response) => {
        this.saving = true
        if (response.ok) {
          if (this.file) {
            let photoData = new FormData()
            photoData.append('photo', this.file)
            let params = {
              id: response.body.id,
              data: photoData
            }
            this.$store.dispatch('createFilterPhoto', params).then((response) => {
              if (response.ok) {
                this.$router.push({ name: 'filters.index' })
              }
            }, (error) => {
              console.log(error)
            })
          } else {
            this.$router.push({ name: 'filters.index' })
          }
        }
      }, (error) => {
        console.log(error)
        this.$message({
          showClose: true,
          message: 'Oops, não foi possível salvar! Por favor, preencha todos os campos e tente novamente.',
          type: 'error'
        })
      })
    },
    deletePhoto () {
      if (Number.isInteger(this.file.id)) {
        this.$store.dispatch('deletePhoto', this.file.id).then((response) => {
          if (response.ok) {
            this.file = ''
            this.imageUrl = ''
          }
        }, (error) => {
          console.log(error)
        })
      } else {
        this.file = ''
        this.imageUrl = ''
      }
    },
    onChange (file, fileList) {
      this.file = file.raw
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
  border: 1px solid #ccc;
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
