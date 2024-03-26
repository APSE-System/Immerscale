import { createWebHistory, createRouter } from 'vue-router'

import ProjectsList from '../components/ProjectsList.vue'
import ProjectPage from '../components/ProjectPage.vue'
import LinkListPage from '../components/LinkListPage.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: ProjectsList },
  { path: '/project/:id', component: ProjectPage },
  //add aroute to dummy linkpage for testing
  { path: '/links/:id', component: LinkListPage },
]

// This makes the URL work "normal" so you can just type in an URL and you are routed
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router