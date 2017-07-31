<template>
  <div class="users create">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'users.index' }">Usuários</el-breadcrumb-item>
      <el-breadcrumb-item>Criar</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Criar usuário
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'users.index' })">Voltar</el-button>
      </el-button-group>
    </h1>

    <el-alert :closable="false" title="Atenção" description="Todos os campos devem ser preenchidos." type="warning" show-icon></el-alert>

    <el-form label-position="top" :model="form">
      <el-card class="box-card">
        <el-card class="box-card">
        <el-form-item label="Nome completo">
          <el-input v-model="form.name" type="text" placeholder="Informe o nome completo" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Nome">
          <el-input v-model="form.first_name" type="text" placeholder="Informe o nome" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Sobrenome">
          <el-input v-model="form.last_name" type="text" placeholder="Informe o sobrenome" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Aniversário">
          <el-date-picker v-model="form.birthday" type="date" placeholder="Informe a data de nascimento" format="dd/MM/yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item label="E-mail">
          <el-input v-model="form.email" type="email" placeholder="Informe o e-mail" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Senha">
          <el-input v-model="form.password" type="password" placeholder="Informe a senha" :minlength="6" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Sexo">
          <el-radio-group v-model="form.gender">
            <el-radio-button label="Male">Masculino</el-radio-button>
            <el-radio-button label="Female">Feminino</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Ativo">
          <el-switch v-model="form.status" on-color="#13ce66" off-color="#ff4949" :on-value="true" :off-value="false" on-text="Sim" off-text="Não"></el-switch>
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
      </el-card>

      <el-card class="box-card">
        <h2>Endereço</h2>
        <el-form-item label="Cep">
          <el-input v-model="form.address.zip_code" type="text" placeholder="Informe o cep" :minlength="8" :maxlength="9" @blur="pesquisarCep"></el-input>
        </el-form-item>
        <el-form-item label="Estado">
          <el-input v-model="form.address.state" type="text" placeholder="Informe o estado" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Cidade">
          <el-input v-model="form.address.city" type="text" placeholder="Informe a cidade" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Bairro">
          <el-input v-model="form.address.neighborhood" type="text" placeholder="Informe o bairro" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Rua">
          <el-input v-model="form.address.street" type="text" placeholder="Informe a rua" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="Número">
          <el-input v-model="form.address.number" type="text" placeholder="Informe o número" :minlength="3" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Complemento">
          <el-input v-model="form.address.sub_address" type="text" placeholder="Informe o complemento" :minlength="3" :maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="No mapa">
          <el-radio-group v-model="form.address.show_on_map">
            <el-radio label="0">Não mostrar</el-radio>
            <el-radio label="1">Mostrar a localização aproximada</el-radio>
            <el-radio label="2">Mostrar a localização exata</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-card>

      <el-button type="success" @click="save" :disabled="saving">Salvar</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  'name': 'users-create',
  data () {
    return {
      imageUrl: '',
      saving: false,
      file: null,
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
      form: {
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        gender: '',
        birthday: '',
        status: '',
        address: {
          zip_code: '',
          street: '',
          number: '',
          sub_address: '',
          neighborhood: '',
          country: 'Brasil',
          state: '',
          city: '',
          show_on_map: '0'
        }
      }
    }
  },
  methods: {
    save () {
      this.form.birthday = this.date.toDate(this.form.birthday)
      this.$store.dispatch('createUser', this.form).then((response) => {
        if (response.ok) {
          if (this.file) {
            let photoData = new FormData()
            photoData.append('photo', this.file)
            let params = {
              id: response.body.id,
              data: photoData
            }
            this.$store.dispatch('createUserPhoto', params).then((response) => {
              if (response.ok) {
                this.$router.push({ name: 'users.index' })
              }
            }, (error) => {
              console.log(error)
            })
          } else {
            this.$router.push({ name: 'users.index' })
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
      console.log('onChange...')
      this.file = file.raw
      this.imageUrl = file.url
    },
    pesquisarCep () {
      if (this.form.address.zip_code !== '') {
        this.cep.pesquisar(this.form.address.zip_code, this.form.address)
      }
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

