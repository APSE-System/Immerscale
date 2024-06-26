import { createWebHistory, createRouter } from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import InfoPage from '../components/InfoPage.vue'
import MainPage from '../components/MainPage.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: LandingPage },
  { path: '/info', component: InfoPage},
  { path: '/main', component: MainPage},
  { path: '/:pathMatch(.*)*', component: MainPage}
]

// This makes the URL work "normal" so you can just type in an URL and you are routed
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router