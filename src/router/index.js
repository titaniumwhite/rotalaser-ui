import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Clienti from '../views/Clienti.vue'
import Fabbriche from '../views/Fabbriche.vue'
import Fustelle from '../views/Fustelle.vue'
import Fustella from '../views/Fustella.vue'
import Inserisci from '../views/Inserisci.vue'
import VueSessionStorage from "vue-sessionstorage";

Vue.use(VueSessionStorage);
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/clienti',
    name: 'clienti',
    component: Clienti
  },
  {
    path: '/fabbriche',
    name: 'fabbriche',
    component: Fabbriche
  },
  {
    path: '/inserisci',
    name: 'inserisci',
    component: Inserisci
  },
  {
    path: '/fustelle/:id',
    name: 'fustelle',
    component: Fustelle
  },
  {
    path: '/fustella/:id',
    name: 'fustella',
    component: Fustella
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router