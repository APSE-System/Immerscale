<!-- MainPage -->

<script setup>
import Camera from "./Camera.vue"
import Popup from "./Popup.vue"
import Toast from 'primevue/toast';

</script>

<template>
  <h2 class="header">PhotoView</h2>

  <Camera/>
  <Popup/>
  
  <Toast/>
</template>

<style scoped>
  .header {
  padding: 0;
  margin: 0;
  }
</style>
