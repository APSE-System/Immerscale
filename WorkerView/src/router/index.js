import { createWebHistory, createRouter } from 'vue-router'

import ProjectsList from '../components/ProjectsList.vue'
import ProjectPage from '../components/ProjectPage.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: ProjectsList },
  { path: '/project/:id', component: ProjectPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router