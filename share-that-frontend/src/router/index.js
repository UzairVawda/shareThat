import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DisplayAllCurricula from '../views/DisplayAllCurricula.vue'
import DisplaySelectedCurricula from '../views/DisplaySelectedCurricula.vue'
import CreateCurriculum from '../views/CreateCurriculum.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/curricula',
    name: 'curricula',
    component: DisplayAllCurricula
  },
  {
    path: '/curricula/:id',
    name: 'curriculum',
    component: DisplaySelectedCurricula
  },
  {
    path: '/curriculum/create',
    name: 'create',
    component: CreateCurriculum
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
