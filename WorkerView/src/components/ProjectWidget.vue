<script setup>
import 'primeicons/primeicons.css'
import { useRouter } from 'vue-router'

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
</script>


<template>
  <div></div>
  <div class="ProjectItem" @click="clickedProject">
    <!-- Icon on the left side TODO: make it possible to load an image here if no files are loaded in the project-->
    <div class="pi pi-images" style="color: grey" ></div>  
    <!-- Values taken from properties -->
    <div class="ItemInfos">
      <p>{{ name }}</p>
      <!--<p>Project id: {{ id }}</p>-->
      <p>Customer Name: Max MusterMann</p>
    </div>
  </div>
</template>


<style scoped>
.ProjectItem {
  background-color: #445dff;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  width: 35%;
}

.ProjectItem:hover {
  transform: scale(1.04);
}

.ItemInfos {
  display: block;
  gap: 0rem;
}

.pi-images{
  font-size: 6rem;
}
</style>
