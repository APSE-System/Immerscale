<script setup>
import { useRouter, useRoute } from "vue-router";
import TabBar from "./TabBar.vue";
import Button from "primevue/button";

const router = useRouter();
const route = useRoute();
</script>

<template>
  <h2 class="headline">Project {{ $route.params.id }}</h2>
  <div class="flex justify-content-left">
    <Button @click="router.push('/')" label="← Projects" id="back-button" />
  </div>
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

  #back-button {
    position: absolute;
    top: 5px;
  }
  /* .headline {
    text-align: left;
    text-shadow:
    1px 1px 0 #000,
    -1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000;
  } */
</style>
