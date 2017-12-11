<template>
  <div v-if="form.id" class="newsletters index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>{{ form.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>{{ form.title }}</h1>

    <el-table :data="contacts" empty-text="Não há registros..." :default-sort="{ prop: 'name', order: 'ascending' }" border stripe fit>
      <el-table-column prop="name" label="Nome" sortable></el-table-column>
      <el-table-column prop="email" label="E-mail" sortable></el-table-column>
      <el-table-column prop="created_at" label="Recebido em" sortable :formatter="datetimeToBr"></el-table-column>
      <el-table-column
        align="center"
        label="Ações"
        width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="danger" size="small" @click.native.prevent="deleteFormContact(scope.row.id)">Excluir</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'newsletters-index',
  data () {
    return {
      form_id: 2
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
          this.getForm()
        }
      }, (error) => {
        console.log(error)
      })
    },
    getForm () {
      this.$store.dispatch('getForm', this.form_id)
    }
  },
  computed: {
    form () {
      return this.$store.state.form.form
    },
    contacts () {
      return this.form.contacts
    }
  },
  created () {
    this.getForm()
  },
  beforeDestroy () {
    this.$store.commit('setForm', {})
  }
}
</script>
