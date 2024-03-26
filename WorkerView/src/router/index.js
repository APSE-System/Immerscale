import { createWebHistory, createRouter } from 'vue-router'

import ProjectsList from '../components/ProjectsList.vue'
import ProjectPage from '../components/ProjectPage.vue'
import ImageList from '../components/ImageList.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: ProjectsList },
  { 
    path: '/project/:id', 
    component: ProjectPage,
    children: [
      {
        path: "images",
        component: ImageList
      },
    ]
  },
]

// This makes the URL work "normal" so you can just type in an URL and you are routed
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router