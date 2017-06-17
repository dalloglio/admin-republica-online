import Vue from 'vue'

export default {
    state: {
        userList: [],
        userView: {}
    },
    mutations: {
        updateUserList (state, data) {
            state.userList = data
        },
        updateUserView (state, data) {
            state.userView = data
        }
    },
    actions: {
        getUsers (context) {
            Vue.http.get('api/users').then(response => {
                context.commit('updateUserList', response.data)
            })
        },
        getUser (context, id) {
            Vue.http.get('api/users/' + id).then(response => {
                context.commit('updateUserView', response.data)
            })
        },
        newUser (context, data) {
            Vue.http.post('api/users', data)
        },
        updateUser (context, params) {
            Vue.http.put('api/users/' + params.id, params.data)
        },
        removeUser (context, id) {
            Vue.http.delete('api/users/' + id)
        }
    }
}
