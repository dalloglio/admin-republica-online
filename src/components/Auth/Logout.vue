<template></template>

<script>
import Auth from '../../auth'

export default {
    name: 'auth-logout',
    created () {
        Auth.logout()
    }
}
</script>
