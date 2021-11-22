import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Clienti from '../views/Clienti.vue'
import Fabbriche from '../views/Fabbriche.vue'
import Fustelle from '../views/Fustelle.vue'
import Fustella_post from '../views/Fustella_post.vue'
import Fustella_live from '../views/Fustella_live.vue'

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
    path: '/fustelle/c/:id',
    name: 'fustelle_c',
    component: Fustelle
  },
  {
    path: '/fustelle/f/:id',
    name: 'fustelle_f',
    component: Fustelle
  },
  {
    path: '/fustella/postanalisi/:id',
    name: 'fustella_post',
    component: Fustella_post
  },
  {
    path: '/fustella/live/:id',
    name: 'fustella_live',
    component: Fustella_live
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router