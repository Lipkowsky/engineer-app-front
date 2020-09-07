<template>
<form>
    <fieldset>
        <legend>Panel logowania</legend>
        <div class="form-group">
            <label for="exampleInputEmail1">Adres e-mail</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Podaj e-email">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Hasło</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Hasło">
        </div>
        <button type="submit" @click="login" class="btn btn-primary">Zaloguj się</button>
        <div>
            <p class="redContent" v-if="error">{{error}}</p>
        </div>
    </fieldset>
</form>
</template>

<script>
import {
    mapActions
} from 'vuex'
import AuthenticationService from '@/services/AuthenticationService'

export default {
    name: 'Register',
    data() {
        return {
            error: '',
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(["setToken", "setUser", 'getUserProfileInfo']),
        async login() {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                })
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                const id = {
                    id: response.data.user.id
                }
                this.getUserProfileInfo(id)

                this.email = ''
                this.password = '',

                    this.$router.push({
                        name: 'home'
                    })

            } catch (error) {
                this.error = 'Bład logowania, spróbuj ponownie'
            }
        }
    }
}
</script>

<style scoped>
.redContent {
    color: red;
    font-weight: bold;
}
form {
    margin: 5% auto;
    width: 20em;
    text-align: center;
    position: relative;
    border: 9px inset #006666;
    border-radius: 35px;
    padding: 20px;
    background-color: #095a5e;
}

label {
    color: white;
}

legend {
    color: white;
}
</style>
