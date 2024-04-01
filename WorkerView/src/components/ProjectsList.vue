<script setup>
import ProjectWidget from './ProjectWidget.vue'
import AddNewProject from './AddNewProject.vue'
import Divider from 'primevue/divider';
import { onMounted, ref } from 'vue'

const projects = ref([
]);

// Fetches all the projects from the backend and adds them to the project list.
function fetchProjects() {
  


  projects.value = []
    fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/projects', {
      credentials: "include"
    })
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
  <Divider />
  <div class="ProjectList">
    <ProjectWidget v-for="project in projects" :id="project.project_id" :name="project.name", :active="true"/>
  </div>
</template>

<style scoped>
.ProjectList {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
</style>./components/ProjectWidget.vue
