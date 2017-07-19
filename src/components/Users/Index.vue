<template lang="html">
  <div class="users index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Usuários</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>Usuários</h1>

    <el-table :data="users" :default-sort="{ prop: 'name', order: 'ascending' }" border stripe fit>
      <el-table-column prop="name" label="Nome" sortable></el-table-column>
      <el-table-column prop="email" label="E-mail" :formatter="formatter"></el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="Ações"
        width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="info" size="small">Editar</el-button>
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
  data () {
    return {
      users: [{
        name: 'Usuário A',
        email: 'user@email.com'
      }, {
        name: 'Usuário B',
        email: 'user@email.com'
      }, {
        name: 'Usuário C',
        email: 'user@email.com'
      }, {
        name: 'Usuário D',
        email: 'user@email.com'
      }]
    }
  }
}
</script>

<style lang="css">
</style>
