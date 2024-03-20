<script setup>
import { onMounted } from 'vue'

var Images = []

// When the component is mounted the images which refer to this component should be fetched from the backend.
onMounted(() => {
  fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/api/image')
    .then(function() {
      // set the images array according to the backend response
    })
    .catch(function(){
      alert("Backend ist nicht errreichbar")
    })
})
</script>


<template>
  <div>
    <h2>Projekt {{ $route.params.id }}</h2>
    <!-- Depending wether there were images fetched from the backend they are displayed or not. -->
    <div v-if="Images.length">
      <!-- Iterating through the image list and displaying them. -->
      <div v-for="(image, index) in Images" :key="index">
        <!-- Add the logic here for clicking on an image and opening the measuring editor. -->
        <img :src="image" alt="Image {{ index + 1 }}">
      </div>
    </div>
    <div v-if="!Images.length">
      <h3>In diesem Projekt sind noch keine Bilder.</h3>
    </div>
  </div>
</template>


<style scoped>
  img {
    width: 400px; 
    object-fit: cover;
  }
</style>
