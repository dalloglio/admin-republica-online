<template>
    <div id="app">
        <header>
            <navbar></navbar>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import Navbar from './components/Shared/Navbar.vue'

export default {
    name: 'app',
    components: {
        Navbar
    },
    styles: [
        require('bootstrap/dist/css/bootstrap.min.css')
    ]
}
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 51px;
}
</style>
