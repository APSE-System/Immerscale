<script setup>
import LinkWidget from './LinkWidget.vue'
import GenerateNewLink from './GenerateNewLink.vue'
import Divider from 'primevue/divider';
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = ref([
]);

// Fetches all the projects from the backend and adds them to the project list.
function fetchLinks() {
  links.value = []
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
  fetchLinks()
})

</script>

<template>
  <h1>Project Links</h1>
  <div class="LinkButton">
    <GenerateNewLink @fetchLinks="fetchLinks"/>
  </div>
  <Divider />
  <div class="LinkList">
    <LinkWidget v-for="link in links" :url="link.url_token" :name="link.name" :activation="link.activation_date" :expiration="link.expiration_date"/>
  </div>
</template>

<style scoped>
.LinkList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>