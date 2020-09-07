<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
            <router-link :to="{ name: 'home' }"><a class="navbar-brand">PRACA INŻYNIERSKA
                    <font-awesome-icon class="univeristy-icon" icon="university" size="lg" /></a></router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-if="$store.state.users.isUserLoggedIn" class="nav-link">
                    <router-link :to="{ name: 'profile' }"><a class="nav-link">
                            <font-awesome-icon class="icon" icon="id-card" size="lg" />MÓJ PROFIL</a></router-link>
                </b-nav-item>
                <b-nav-item v-if="$store.state.users.isUserLoggedIn" class="nav-link">
                    <router-link :to="{ name: 'products' }"><a class="nav-link">
                            <font-awesome-icon class="icon" icon="warehouse" size="lg" />PRODUKTY</a></router-link>
                </b-nav-item>
                <b-nav-item v-if="$store.state.users.isManagerLoggedIn" class="nav-link">
                    <router-link :to="{ name: 'addProduct' }"><a class="nav-link">
                            <font-awesome-icon class="icon" icon="search-plus" size="lg" />DODAJ PRODUKT</a></router-link>
                </b-nav-item>
                <b-nav-item v-if="$store.state.users.isAdmin" class="nav-link">
                    <router-link :to="{ name: 'register' }"><a class="nav-link">
                            <font-awesome-icon class="icon" icon="user-plus" size="lg" />REJESTRACJA PRACOWNIKÓW</a></router-link>
                </b-nav-item>
                <b-nav-item v-if="$store.state.users.isManagerLoggedIn" class="nav-link">
                    <router-link :to="{ name: 'userList' }"><a class="nav-link">
                            <font-awesome-icon class="icon" icon="users" size="lg" />WSZYSCY PRACOWNICY</a></router-link>
                </b-nav-item>
                <b-nav-item v-if="$store.state.users.isManagerLoggedIn" class="nav-link">
                    <router-link :to="{ name: 'supplierContact' }"><a class="nav-link">
                            <font-awesome-icon class="icon" icon="globe" size="lg" />KONTAKT Z DOSTAWCĄ</a></router-link>
                </b-nav-item>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <router-link v-if="$store.state.users.isSellerLoggedIn" :to="{ name: 'basket' }"><a class="nav-link">
                        <font-awesome-icon icon="shopping-basket" size="lg" class="basket-icon" /><sup v-if="allProductsInBasket.length != 0">{{allProductsInBasket.length}}</sup></a></router-link>
                <router-link :to="{ name: 'login' }"><button class="btn btn-secondary" v-if="!$store.state.users.isUserLoggedIn">ZALOGUJ SIĘ</button></router-link>
                <button class="btn btn-outline-danger" v-if="$store.state.users.isUserLoggedIn" @click="logOut">WYLOGUJ SIĘ</button>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
import {
    mapGetters,
} from 'vuex'
export default {
    methods: {
        logOut() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'login'
            })
        },
    },
    computed: mapGetters(['allProductsInBasket']),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lalezar&display=swap');
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&display=swap');

.navbar-brand {
    font-family: 'Lalezar', cursive;
    font-size: 1.2rem;
    color: #00aaff !important;
}

nav {
    background-color: #292929 !important;
    border-bottom: #111111 solid 2px;
    
}

.nav-link {
    font-family: 'Quicksand', sans-serif;
    text-align: center;
    font-size: 0.8rem;
    padding: 0px;
    color: white !important;
    margin-right: 10px;
}

.univeristy-icon {
    margin-left: 5px;
    opacity: 0.8;
}

.icon {
    margin-right: 10px;
    color: #00aaff;
    text-decoration: none;
}

.basket-icon {
    margin-right: 4px;
    color: #00aaff;
    text-decoration: none;
    margin-top: 1rem;
}


@media (max-width:900px) {
    .nav-link{
        padding: 5px;
        width: 100%;
        font-size: 0.8rem;
    }
     button{
        font-size: 0.8rem;
    }
}

@media screen and (max-width:1300px) and (min-width:900px) {
    .nav-link{
        padding: 0px;
        width: 100%;
        font-size: 0.6rem;
        margin-right: 0px;
    }
    button{
        font-size: 0.6rem;
    }
}



</style>
