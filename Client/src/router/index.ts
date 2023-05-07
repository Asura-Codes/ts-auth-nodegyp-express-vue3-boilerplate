import { createRouter, createWebHistory } from 'vue-router'
import GetView from '../views/GetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GetView',
      component: GetView
    },
    {
      path: '/set',
      name: 'PostView',
      // lazy-loaded form passing data to server
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // lazy-loaded "about" about project
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
