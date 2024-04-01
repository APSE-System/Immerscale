import { createWebHistory, createRouter } from 'vue-router'

import ProjectsList from '../components/ProjectsList.vue'
import ProjectPage from '../components/ProjectPage.vue'
import LinkListPage from '../components/LinkListPage.vue'
import ImageList from '../components/ImageList.vue'
import ProjectSettings from '../components/ProjectSettings.vue'

// Define the routes for the application here
const routes = [
  { path: '/', component: ProjectsList },
  { 
    path: '/project/:id', 
    component: ProjectPage,
    children: [ // these are nested routes which means they are appended to the project path and are rendered inside the project page.
      {
        path: "images",
        component: ImageList
      },
      {
        path: "access",
        component: LinkListPage
      },
      {
        path: "settings",
        component: ProjectSettings
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