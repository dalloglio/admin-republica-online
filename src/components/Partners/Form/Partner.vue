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

    <app-upload-simple
    label="Image"
    info="Arquivos JPEG, PNG ou GIF com um tamanho de até 2MB."
    :model="model"
    :upload="upload"></app-upload-simple>
  </el-card>
</template>

<script>
  import AppUploadSimple from '@/components/Shared/AppUploadSimple'
  export default {
    name: 'partners-form-partner',
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    components: {
      AppUploadSimple
    },
    data () {
      return {
        upload: {
          name: 'photo',
          action: '',
          show_file_list: false,
          list_type: 'text',
          multiple: false,
          accept: 'image/*',
          auto: false,
          disabled: true
        }
      }
    }
  }
</script>
