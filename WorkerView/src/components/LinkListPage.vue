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
    fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/tokens?id=' + route.params.id, {credentials: "include"})
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
  <div class="content">
    <div class="LinkButton">
      <GenerateNewLink @fetchLinks="fetchLinks"/>
    </div>
    <Divider />
    <div class="LinkList">
      <LinkWidget v-for="link in links" :url="link.url_token" :name="link.name" :creation="link.creation_date" :expiration="link.expiration_date"/>
    </div>
  </div>
</template>

<style scoped>
.content{
  width: 100%;
}
.LinkList {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>