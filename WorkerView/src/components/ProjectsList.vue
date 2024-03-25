<script setup>
import ProjectWidget from './ProjectWidget.vue'
import AddNewProject from './AddNewProject.vue'
import { onMounted, onUpdated, ref } from 'vue'

// Define some bogus data for the projects until an actual backend call is implemented here
const projects = ref([
  /*{ id: 1, name: 'Max Mustermann', active: true },
  { id: 2, name: 'Erika Mustermann', active: false },
  { id: 3, name: 'Hans Peter', active: true },
  { id: 4, name: 'Gustav Gans', active: false },
  { id: 5, name: 'Dagobert Duck', active: true },*/
]);

// Fetches all the projects from the backend and adds them to the project list.
function fetchProjects() {
  projects.value = []
    fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/projects')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        for (var key in data){
          projects.value.push(data[key])
        }
      })
      .catch(function(){
        alert("Backend ist nicht errreichbar")
      })
    }

onMounted(() => {
  fetchProjects()
})

</script>

<template>
  <h1>Projects</h1>
  <div class="ProjectButton">
    <AddNewProject @fetchProjects="fetchProjects"/>
  </div>
  <div class="ProjectList">
    <ProjectWidget v-for="project in projects" :id="project.project_id" :name="project.name", :active="true"/>
  </div>
</template>

<style scoped>
.ProjectList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>./components/ProjectWidget.vue
