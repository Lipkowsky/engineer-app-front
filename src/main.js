import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import 'bootswatch/dist/flatly/bootstrap.css';
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBasket, faUniversity, faIdCard, faGlobe, faUsers, faUserPlus, faSearchPlus, faBarcode} from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import { faUserTie} from '@fortawesome/free-solid-svg-icons'
import { faWarehouse} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faShoppingBasket, faUniversity, faIdCard, faGlobe, faUsers, faUserPlus, faSearchPlus, faWarehouse, faBarcode)
library.add(faMoneyBill)
library.add(faUserTie)


Vue.component('font-awesome-icon', FontAwesomeIcon)


const moment = require('moment')
require('moment/locale/pl')
 
Vue.use(require('vue-moment'), {
    moment
})
 


Vue.use(BootstrapVue)
Vue.config.productionTip = false


sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
