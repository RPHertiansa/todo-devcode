import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../pages/dashboard.vue'
import Activity from '../pages/activity.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/detail/:id',
    name: 'Activity',
    component: Activity
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
