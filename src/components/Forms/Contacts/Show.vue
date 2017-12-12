<template>
  <div v-if="form.id" class="contacts show">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'contacts.index' }">{{ form.title }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ contact.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      {{ contact.name }}
      <el-button-group class="right">
        <el-button type="primary" @click="url.go({ name: 'contacts.index' })">Voltar</el-button>
        <el-button type="danger" @click.native.prevent="deleteFormContact(contact.id)">Excluir</el-button>
      </el-button-group>
    </h1>

    <el-card class="box-card">
      <p><strong>Nome:</strong> {{ contact.name }}</p>
      <p><strong>E-mail:</strong> {{ contact.email }}</p>
      <p><strong>Telefone:</strong> {{ contact.phone }}</p>
      <p><strong>Cidade:</strong> {{ contact.city }}</p>
      <p><strong>Estado:</strong> {{ contact.state }}</p>
      <p><strong>Assunto:</strong> {{ contact.subject }}</p>
      <p><strong>Mensagem:</strong> {{ contact.message }}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'contacts-show',
  data () {
    return {
      form_id: 1
    }
  },
  methods: {
    datetimeToBr (row, column, date) {
      return this.date.toDateTimeBr(date)
    },
    deleteFormContact (id) {
      if (!Number.isInteger(id) || !confirm('Você tem certeza que deseja excluir este registro?')) {
        return
      }
      let params = {
        form_id: this.form_id,
        id: id
      }
      this.$store.dispatch('deleteFormContact', params).then((response) => {
        if (response.ok) {
          this.$router.push({ name: 'contacts.index' })
        }
      }, (error) => {
        console.log(error)
      })
    },
    getFormContact () {
      let params = {
        form_id: this.form_id,
        id: this.$route.params.id
      }
      this.$store.dispatch('getFormContact', params).then(() => {
        this.$loader.close()
      })
    }
  },
  computed: {
    form () {
      return this.$store.state.form.form || {}
    },
    contact () {
      return this.$store.state.form.contact || {}
    }
  },
  beforeCreate () {
    this.$loader.open()
  },
  created () {
    this.getFormContact()
  },
  beforeDestroy () {
    this.$store.commit('setForm', {})
    this.$store.commit('setFormContact', {})
  }
}
</script>
