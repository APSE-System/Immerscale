import { createWebHistory, createRouter } from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import InfoPage from '../components/InfoPage.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: LandingPage },
  { path: '/info', component: InfoPage},
]

// This makes the URL work "normal" so you can just type in an URL and you are routed
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router