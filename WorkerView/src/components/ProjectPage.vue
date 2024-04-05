<script setup>
import { useRoute} from 'vue-router'
import {onMounted, ref } from 'vue';
import TabBar from './TabBar.vue';

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

</script>


<template>
  <h2>Project {{ projectName }}</h2>
  <div class="projectPage">
    <!-- shows the tab bar and then the selected tab using nested routes -->
    <TabBar/>
    <RouterView/>
  </div>
</template>


<style scoped>
  .projectPage{
    display: flex;
    justify-content: left;
  }

</style>
