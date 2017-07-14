<template>
  <v-app :dark="false" :light="true" standalone>

    <v-navigation-drawer
      v-model="drawer"
      :permanent="false"
      :persistent="true"
      :temporary="false"
      :clipped="true"
      :floating="false"
      :mini-variant="false"
      absolute
      overflow
      enable-resize-watcher
    >
      <v-list class="pa-0">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list two-line subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Anúncios</v-list-tile-title>
            <v-list-tile-sub-title>Gerenciar anúncios</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Categorias</v-list-tile-title>
            <v-list-tile-sub-title>Gerenciar categorias</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Parceiros</v-list-tile-title>
            <v-list-tile-sub-title>Gerenciar parceiros</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Repúblicas</v-list-tile-title>
            <v-list-tile-sub-title>Gerenciar repúblicas</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Usuários</v-list-tile-title>
            <v-list-tile-sub-title>Gerenciar usuários</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

    <main>
      <v-container fluid grid-list-md>
        <router-view></router-view>
      </v-container>
    </main>

    <v-footer fixed>
      <v-spacer></v-spacer>
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'República Online',
      drawer: true
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
