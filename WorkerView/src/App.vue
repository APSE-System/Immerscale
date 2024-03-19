<script setup>
import ProjectComponent from './components/ProjectComponent.vue'
import AddNewProjectComponent from './components/AddNewProjectComponent.vue'
import { ref } from 'vue'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'

// Define some bogus data for the projects until an actual backend call is implemented here
const Projects = ref([
  { id: 1, mail: 'MaxMustermann@xyz.com', active: true },
  { id: 2, mail: 'ErikaMustermann@xyz.com', active: false },
  { id: 3, mail: 'HansPeter@xyz.com', active: true },
  { id: 4, mail: 'GustavGans@xyz.com', active: false },
  { id: 5, mail: 'DagobertDuck@xyz.com', active: true },
]);
</script>

<template>
  <h1>Projects</h1>
  <div class="ProjectButton">
    <AddNewProjectComponent/>
  </div>
  <div class="ProjectList">
    <ProjectComponent v-for="project in Projects" :id="project.id" :mail="project.mail", :active="project.active"/>
  </div>
</template>

<style scoped>
.ProjectList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
