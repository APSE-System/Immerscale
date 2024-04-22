import { createWebHistory, createRouter } from 'vue-router'

import Index from '../components/Index.vue'
import Info from '../components/Info.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: Index },
  { path: '/info', component: Info},
]

// This makes the URL work "normal" so you can just type in an URL and you are routed
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router