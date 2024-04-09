<script setup>
import { useRouter, useRoute } from "vue-router";
import {onMounted, ref } from 'vue';
import TabBar from './TabBar.vue';
import TabButtons from "./TabButtons.vue";
import Button from "primevue/button";

const route = useRoute()
const projectName = ref("")

async function getName(){
fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/projectName?id=' + route.params.id, {credentials: "include"})
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
  <!-- TODO this h2 is bugged due to merge -->
  <!-- <h2>Project {{ projectName }}</h2> --> 
  <div class="projectPage">
    <!-- shows the tab bar and then the selected tab using nested routes -->
    <TabBar :projectName=projectName>
      <template #back>
        <Button @click="router.push('/')" label="← Projects" id="back-button" />
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

  /* could be used later to contain the back button and burger menu */
  /* .navigate-box {
    position: absolute;
    top: 5px;
    z-index: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
  } */

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
</style>
