import { createWebHistory, createRouter } from 'vue-router'

import App from '../App.vue'
import Images from '../components/ImagesComponent.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: App },
  { path: '/project/:id', component: Images },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router