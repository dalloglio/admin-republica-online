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
    }
}
</script>

<style>
body {
    padding-top: 51px;
    padding-bottom: 51px;
    background-color: #eee;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
