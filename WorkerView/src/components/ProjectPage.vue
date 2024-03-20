<script setup>
import { onMounted } from 'vue'
import { BACKEND_IP } from '../env.js';

// When the component is mounted the images which refer to this component should be fetched from the backend.
onMounted(() => {
  fetch('http://' + BACKEND_IP + '/api/image')
    .then(function() {
      console.log(`Received Images`)
    })
    .catch(function(){
      alert("Backend ist nicht errreichbar")
    })
})
</script>


<template>
  <div>
    <!-- This will be updated as soon as the backend endpoints are implemented -->
    Project {{ $route.params.id }}
  </div>
</template>


<style scoped>
</style>../env.js
