<template>
  <el-card class="box-card">
    <el-form-item label="Título" prop="title">
      <el-input v-model="model.title" type="text" placeholder="Informe o título" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Descrição" prop="description">
      <el-input v-model="model.description" type="text" placeholder="Informe uma descrição" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Tipo" prop="type">
      <el-select v-model="model.type" placeholder="Escolha o tipo">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Valores" prop="values">
      <el-select v-model="model.values" multiple filterable allow-create placeholder="Adicione os valores do filtro">
        <el-option v-for="item in values" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>

    <app-upload-simple
    label="Ícone"
    info="Arquivo PNG com fundo transparente, nas dimensões 40px por 40px com um tamanho de até 2MB."
    :model="model"
    :upload="upload"></app-upload-simple>

    <el-form-item label="Ordem" prop="order">
      <el-input-number v-model="model.order" :min="0" :max="1000"></el-input-number>
    </el-form-item>
  </el-card>
</template>

<script>
  import AppUploadSimple from '@/components/Shared/AppUploadSimple'
  import Filter from '@/utils/domains/filter'
  export default {
    name: 'filters-form-filter',
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
        values: [],
        types: Filter.types(),
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
