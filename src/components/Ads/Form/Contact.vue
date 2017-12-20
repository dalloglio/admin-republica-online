<template>
  <el-card class="box-card">
    <h2>Contatos</h2>
    <el-form-item label="Nome" prop="contact.name">
      <el-input v-model="model.contact.name" type="text" placeholder="Informe o nome" :minlength="1" :maxlength="200"></el-input>
    </el-form-item>
    <el-form-item label="Celular" prop="contact.cellphone">
      <el-input v-model="model.contact.cellphone" type="text" placeholder="Informe o celular" :minlength="15" :maxlength="15"></el-input>
    </el-form-item>
    <el-form-item label="WhatsApp" prop="contact.whatsapp">
      <el-input v-model="model.contact.whatsapp" type="text" placeholder="Informe o whatsapp" :minlength="15" :maxlength="15"></el-input>
    </el-form-item>
  </el-card>
</template>

<script>
  export default {
    name: 'ads-form-contact',
    props: {
      model: {
        type: Object,
        required: true
      }
    }
  }
</script>
