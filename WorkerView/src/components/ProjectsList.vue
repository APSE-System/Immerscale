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

onMounted(async () => {
  let password 
  if(!checkCookie('WorkerCookie') ) {
    password = await prompt("Insert Password")



    fetch("http://" + import.meta.env.VITE_BACKEND_IP + "/auth/cookie/worker?credential=" + password, {credentials: "include"})
    .then((response) => {
      if (response.ok) {
        fetchProjects()
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    })
  }
})


function checkCookie(cookieName) {
  // Get all cookies from document.cookie
  const cookies = document.cookie.split(';');

  // Iterate through cookies to find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if the cookie starts with the specified name
    if (cookie.startsWith(cookieName + '=')) {
      return true; // Cookie exists
    }
  }

  return false; // Cookie does not exist
}

</script>

<template>
  <h1 id="headline">Immerscale</h1>
  <h1 class="headline">Projects</h1>
  <div class="ProjectButton">
    <AddNewProject @fetchProjects="fetchProjects"/>
  </div>
  <Divider />
  <div class="ProjectList">
    <ProjectWidget v-for="project in projects" :id="project.project_id" :name="project.name"/>
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
