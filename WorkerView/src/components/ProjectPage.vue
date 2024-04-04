<script setup>
import { useRouter, useRoute } from "vue-router";
import TabBar from "./TabBar.vue";
import Button from "primevue/button";

const router = useRouter();
const route = useRoute();
</script>

<template>
  <div class="flex justify-content-left">
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

  /* could be used later to contain the back button and burger menu */
  /* .navigate-box {
    position: absolute;
    top: 5px;
    z-index: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
  } */
</style>
