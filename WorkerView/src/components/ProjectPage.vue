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
    <!-- <Button @click="toggleSidebar" label="≡"/> --> <!-- TODO implement burger button if screen size is to small, which opens the sidebar-->
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
    position: fixed;
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

  /* could be used later to contain the back button and burger menu */
  /* .navigate-box {
    position: absolute;
    top: 5px;
    z-index: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
  } */
  /* .headline {
    text-align: left;
    text-shadow:
    1px 1px 0 #000,
    -1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000;
  } */
</style>
