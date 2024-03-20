<script setup>
import ProjectComponent from './components/ProjectComponent.vue'
import AddNewProject from './components/AddNewProject.vue'
import { ref } from 'vue'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'

// Define some bogus data for the projects until an actual backend call is implemented here
const Projects = ref([
  { id: 1, name: 'Max Mustermann', active: true },
  { id: 2, name: 'Erika Mustermann', active: false },
  { id: 3, name: 'Hans Peter', active: true },
  { id: 4, name: 'Gustav Gans', active: false },
  { id: 5, name: 'Dagobert Duck', active: true },
]);

//preliminary function to add a new project. TODO: Implement backend call
function addProject(projectName) {
  Projects.value.push({ id: Projects.value.length + 1, projectName: 'New Project', active: true });
  //can not be properly tested as of now since the array gets reset every time the page is reloaded, but also requires a reload to show the new project
  alert("Project " + projectName + " added");
}
</script>

<template>
  <h1>Projects</h1>
  <div class="ProjectButton">
    <AddNewProject/>
  </div>
  <div class="ProjectList">
    <ProjectComponent v-for="project in Projects" :id="project.id" :name="project.name", :active="project.active"/>
  </div>
</template>

<style scoped>
.ProjectList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
