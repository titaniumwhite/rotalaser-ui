import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Clienti from '../views/Clienti.vue'
import Fabbriche from '../views/Fabbriche.vue'
import Fustelle from '../views/Fustelle.vue'
import Fustella from '../views/Fustella.vue'


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