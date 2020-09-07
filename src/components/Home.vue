<template>
<div>
    <div class="jumbotron">
        <h1 class="display-3">Witaj w aplikacji</h1>
        
        <hr class="my-4">
        <p class="lead">Praca inżynierska poświęcona implementacji aplikacji do  zarządzania systemem magazynowania</p>
        <p v-if="!$store.state.users.isUserLoggedIn" class="lead"><router-link :to="{ name: 'login' }"><button class="btn btn-secondary">ZALOGUJ SIĘ</button></router-link>  aby uzyskać dostęp do swojego profilu</p>
        
    </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.jumbotron {
    background-color: #EBEFF2;
    color: black;
}
</style>
