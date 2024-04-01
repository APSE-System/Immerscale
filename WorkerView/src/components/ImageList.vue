<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './TabBar.vue';

const route = useRoute()

var images = ref([])

// When the component is mounted the images which refer to this component should be fetched from the backend.
onMounted(() => {
  fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/images?id=' + route.params.id, {credentials: "include"})
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      // extract the base64 images from the response and store them as dataURLs
      for (var key in data){
        images.value.push("data:image/png;base64," + data[key].image)
      }
      console.log(images.value)
    })
    .catch(function(){
      alert("Backend ist nicht errreichbar")
    })
})
</script>


<template>
    <div class="content">
      <!-- Depending wether there were images fetched from the backend they are displayed or not. -->
      <div v-if="images.length>0">
        <!-- Iterating through the image list and displaying them. -->
        <div v-for="(image, index) in images" :key="index">
          <!-- Add the logic here for clicking on an image and opening the measuring editor. -->
          <img :src="image" alt="Image {{ index + 1 }}">
        </div>
      </div>
      <div v-if="images.length==0">
        <h3>No images in this project</h3>
      </div>
    </div>
</template>


<style scoped>
  .content{
    width: 100%;
  }

  img {
    width: 400px; 
    object-fit: cover;
  }
</style>
