<template>
  <el-card class="box-card">
    <el-form-item label="Nome completo" prop="name">
      <el-input v-model="model.name" type="text" placeholder="Informe o nome completo" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Nome" prop="first_name">
      <el-input v-model="model.first_name" type="text" placeholder="Informe o nome" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Sobrenome" prop="last_name">
      <el-input v-model="model.last_name" type="text" placeholder="Informe o sobrenome" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Aniversário" prop="birthday">
      <el-date-picker v-model="model.birthday" type="date" placeholder="Informe a data de nascimento" format="dd/MM/yyyy" v-mask="'##/##/####'"></el-date-picker>
    </el-form-item>

    <el-form-item label="E-mail" prop="email">
      <el-input v-model="model.email" type="email" placeholder="Informe o e-mail" :minlength="3" :maxlength="200"></el-input>
    </el-form-item>

    <el-form-item label="Senha" prop="password">
      <el-input v-model="model.password" type="password" placeholder="Informe a senha" :minlength="6" :maxlength="20"></el-input>
    </el-form-item>

    <el-form-item label="Sexo" prop="gender">
      <el-radio-group v-model="model.gender">
        <el-radio label="Male">Masculino</el-radio>
        <el-radio label="Female">Feminino</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Ativo" prop="status">
      <el-switch v-model="model.status" on-color="#13ce66" off-color="#ff4949" :on-value="true" :off-value="false" on-text="Sim" off-text="Não"></el-switch>
    </el-form-item>

    <app-upload-simple
    label="Imagem"
    info="Arquivos JPEG, PNG ou GIF com um tamanho de até 2MB."
    :model="model"
    :upload="upload"></app-upload-simple>
  </el-card>
</template>

<script>
  import { mask } from 'vue-the-mask'
  import AppUploadSimple from '@/components/Shared/AppUploadSimple'
  export default {
    name: 'users-form-user',
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    directives: { mask },
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
