<script setup>
import { useRouter, useRoute } from "vue-router";
import {onMounted, ref } from 'vue';
import TabBar from './TabBar.vue';
import TabButtons from "./TabButtons.vue";
import Button from "primevue/button";

const route = useRoute()
const projectName = ref("")

// Fetches the project name from the backend since it is not stored in the frontend and can't be passed as a prop here
async function getName(){
fetch( import.meta.env.VITE_BACKEND_IP + '/api/workerView/projectName?id=' + route.params.id, {credentials: "include"})
  .then(async (resp) => {
    projectName.value = await resp.text()}
  )
  .catch(function(){
    alert("Backend ist nicht errreichbar")
  })
}

onMounted(() => {
  getName()
})

const router = useRouter();
</script>

<template>
  <div class="projectPage">
    <!-- shows the tab bar and then the selected tab using nested routes -->
    <TabBar>
      <template #back>
        <Button @click="router.push('/')" label="← Projects" id="back-button" />
        <h3 class="headline">{{ projectName }}</h3>
      </template>
      <template #main>
        <TabButtons/>
      </template>
    </TabBar>
    <RouterView/>
  </div>
</template>


<style scoped>
  .projectPage{
    display: flex;
    justify-content: left;
  }

  .p-button{
    color: black;
    background-color: transparent;
}
@media (prefers-color-scheme: dark) {
    .p-button{
      color: white;
    }
  }

.p-button:hover{
    color: rgb(35, 115, 210);
}

#back-button {
    top: 5px;
    z-index: 2;
    background-color: transparent;
    color: black;
  }
  @media (prefers-color-scheme: dark) {
    #back-button{
      color: white;
    }
  }
  #back-button:hover {
    color: rgb(35, 115, 210);
  }

.headline {
  margin-left: 1rem;
  margin-right: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 650;
  color: black;
}

@media (prefers-color-scheme: dark) {
  .headline{
    color: rgba(102, 94, 94, 0.87);
  }
}
</style>
