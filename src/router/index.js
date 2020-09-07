import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Products from '../components/Products.vue'
import AdminPanel from '../components/AdminPanel.vue'
import AddProduct from '../components/AddProduct.vue'
import Basket from '../components/Basket.vue'
import Profile from '../components/Profile.vue'
import UsersList from '../components/UsersList.vue'
import SupplierContact from '../components/SupplierContact.vue'
import store from '@/store/store'

Vue.use(VueRouter)



function isLoggedIn(to, from, next){
  if(store.state.users.isUserLoggedIn){
      next();
  }else{
    next('/login');
  }
}

function isAdminLoggedIn(to, from, next){
  if(store.state.users.isAdmin){
      next();
  }else{
    next('/login');
  }
}

function isSellerLoggedIn(to, from, next){
  if(store.state.users.user.dutyId == 1){
      next();
  }else{
    next('/login');
  }
}

function isManagerLoggedIn(to, from, next){
  if(store.state.users.user.dutyId == 2){
      next();
  }else{
    next('/login');
  }
}




const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: isAdminLoggedIn,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    beforeEnter: isAdminLoggedIn,
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: AddProduct,
    beforeEnter: isManagerLoggedIn,
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket,
    beforeEnter: isSellerLoggedIn,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: isLoggedIn,
  },

  {
    path: '/usersList',
    name: 'userList',
    component: UsersList,
    beforeEnter: isManagerLoggedIn,
  },
  {
    path: '/supplierContact',
    name: 'supplierContact',
    component: SupplierContact,
    beforeEnter: isManagerLoggedIn,
  },
]

const router = new VueRouter({
  routes
})

export default router
