import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddJobView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditJobView.vue')
  },
  {
    path: ':catchAll(.*)',
    name: 'not-found',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
