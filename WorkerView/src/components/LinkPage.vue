<script setup>
//import LinkWidget from './ProjectWidget.vue'
//import GenerateNewLink from './AddNewProject.vue'
import { onMounted, ref } from 'vue'

const links = ref([
]);

// Fetches all the projects from the backend and adds them to the project list.
function fetchLinks() {
  projects.value = []
    fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/tokens?id=' + route.params.id)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        for (var key in data){
          links.value.push(data[key])
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
  <h1>Project Links</h1>
  <div class="ProjectButton">
    <!--<AddNewProject @fetchLinks="fetchLinks"/>-->
  </div>
  <div class="LinkList">
    <LinkWidget v-for="link in links" :url="links.url_token" :name="links.name" :activation="links.activation_date" :expiration="links.expiration_date"/>
  </div>
</template>

<style scoped>
.LinkList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>