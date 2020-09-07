import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import products from './modules/products'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [
      createPersistedState()
    ],
    modules: {
      users,
      products
    }
})