import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

import Fustella_live_dash from '../views/Fustella_live_dash.vue'
import PageNotFound from '../views/PageNotFound.vue'
import WaitRoom from '../views/WaitRoom.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/fustella/live/dash/:id',
    name: 'fustella_live_dash',
    component: Fustella_live_dash
  },
  {
    path: '/wait',
    name: 'wait',
    component: WaitRoom
  },
  { path: "*", 
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router