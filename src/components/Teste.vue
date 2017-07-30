<template>
  <div class="teste">

    <el-card class="box-card">
      <h2>Fotos</h2>
      <app-upload :data-files="files" :params="params" :max-files="maxFiles" @upload-remove='uploadRemove' @upload-complete="uploadComplete"></app-upload>
    </el-card>

    <el-button @click="save">Salvar</el-button>

  </div>
</template>

<script>
import AppUpload from '@/components/Shared/AppUpload'
export default {
  name: 'teste',
  components: {
    AppUpload
  },
  data () {
    return {
      files: [],
      maxFiles: 4,
      params: {
        id: 0,
        input: 'photo',
        action: 'createAdPhoto'
      }
    }
  },
  methods: {
    save () {
      setTimeout(() => {
        this.params.id = 46
        window.events.$emit('upload-start')
      }, 2000)
    },
    uploadRemove (file) {
      this.$message.success('O arquivo ' + file.name + ' foi removido com sucesso...')
    },
    uploadComplete () {
      this.$message.success('Os arquivos foram enviados com sucesso.')
      // this.$router.push({ name: 'ads.index' })
    }
  }
}
</script>
