<script setup>
import { useRoute } from 'vue-router'
import TabBar from './TabBar.vue';

const route = useRoute()

</script>


<template>
  <h2>Project {{ $route.params.id }}</h2>
  <div class="projectPage">
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
