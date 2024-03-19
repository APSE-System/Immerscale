<script setup>
import ProjectComponent from './components/ProjectComponent.vue'
import { ref } from 'vue';

// Define some bogus data for the projects until an actual backend call is implemented here
const Projects = ref([
  { id: 1, name: 'Max Mustermann', active: true },
  { id: 2, name: 'Erika Mustermann', active: false },
  { id: 3, name: 'Hans Peter', active: true },
  { id: 4, name: 'Gustav Gans', active: false },
  { id: 5, name: 'Dagobert Duck', active: true },
]);
</script>

<template>
  <h1>Projects</h1>
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
