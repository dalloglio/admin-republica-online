<template>
    <section class="users container">
        <h1>Usuários</h1>

        <p>
            <router-link :to="{ name: 'home' }" class="btn btn-default">Voltar</router-link>
        </p>

        <div class="panel panel-default">
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users.data">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'users',
        methods: {},
        computed: {
            users () {
                return this.$store.state.user.userList
            }
        },
        created () {
            this.$store.dispatch('getUsers')
        }
    }
</script>
