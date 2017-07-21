<template>
  <div class="users index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Usuários</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>
      Usuários
      <el-button-group class="right">
        <el-button type="success" @click="url.go({ name: 'users.create' })">Criar usuário</el-button>
      </el-button-group>
    </h1>

    <el-table :data="users" empty-text="Não há registros..." :default-sort="{ prop: 'name', order: 'ascending' }" border stripe fit>
      <el-table-column prop="name" label="Nome" sortable></el-table-column>
      <el-table-column prop="email" label="E-mail" :formatter="formatter"></el-table-column>
      <el-table-column
        align="center"
        label="Ações"
        width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="info" size="small" @click="url.go({ name: 'users.edit', params: { id: 1 } })">Editar</el-button>
            <el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.$index, users)">Excluir</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'users-index',
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    formatter (row, column) {
      return row.name + ': ' + row.email
    }
  },
  computed: {
    users () {
      return this.$store.dispatch('getUsers').then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style>
</style>
