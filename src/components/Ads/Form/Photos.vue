<template>
  <el-card class="box-card">
    <h2>Fotos</h2>
    <app-upload
    :data-files="files"
    :max-files="maxFiles"
    @upload-remove="uploadRemove"
    @upload-complete="uploadComplete"></app-upload>
  </el-card>
</template>

<script>
  import AppUpload from '@/components/Shared/AppUpload'
  export default {
    name: 'ads-form-photos',
    components: {
      AppUpload
    },
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        files: [],
        maxFiles: 8
      }
    },
    methods: {
      uploadRemove (file) {
        this.$message.success('O arquivo ' + file.name + ' foi removido com sucesso...')
      },
      uploadComplete () {
        this.$router.push({ name: 'ads.index' })
      }
    }
  }
</script>
