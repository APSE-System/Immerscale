<script setup>
import 'primeicons/primeicons.css'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

// get the router for routing to the project pages
const router = useRouter()

//define properties for the project items
const props = defineProps({
  id: Number,
  name: String,
  active: Boolean,
})

//call this when the user clicks a project to view its details
function clickedProject() {
  // Redirects to the Project page listing the according images.
  router.push('/project/'+ props.id +'/images')
}

var images = ref([])

onMounted(() => {
  fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/images?id=' + props.id, {credentials: "include"})
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
  <div></div>
  <div class="ProjectItem" @click="clickedProject">
    <!-- Icon on the left side TODO: make it possible to load an image here if no files are loaded in the project-->
    <div v-if="images.length>0">
      <img :src="images[0]" alt="Image 1">
    </div>
    <div v-if="images.length==0">
      <div class="pi pi-images" style="color: darkgray" ></div>
    </div>
    <!-- Values taken from properties -->
    <div class="ItemInfos">
      <b> {{ name }}</b>
      <p>Max MusterMann</p>
    </div>
  </div>
</template>


<style scoped>
.ProjectItem {
  background-color: #d2d4dd;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 3rem;
  width: 37%;
  min-width: 300px;
  color: black;
}

.ProjectItem:hover {
  transform: scale(1.04);
}

.ItemInfos {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  gap: 0rem;
  padding-top: 0px;
}

.pi-images{
  font-size: 6rem;
}
img {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 15%;
}
</style>
