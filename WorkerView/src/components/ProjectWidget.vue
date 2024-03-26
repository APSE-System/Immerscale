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
  router.push('/project/'+ props.id)
}
</script>


<template>
  <!-- TODO: Fix this more elegantly. Empty Div workaround to show project Items -->
  <div></div>
  <div class="ProjectItem" @click="clickedProject">
    <!-- Icon on the left side colored depending on whether the project is active or not -->
    <div class="pi pi-building"  v-if="active" style="color: lightgreen" ></div>
    <div class="pi pi-building"  v-if="!active" style="color: darkgrey" ></div>  
    <!-- Values taken from properties -->
    <div class="ItemInfos">
      <p>{{ name }}</p>
      <p>Project id: {{ id }}</p>
      <p>Activity status: {{ active }}</p>
    </div>
  </div>
</template>


<style scoped>
.ProjectItem {
  background-color: #697dff;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 7px;
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
}

.ProjectItem:hover {
  transform: scale(1.04);
}

.ItemInfos {
  display: block;
  gap: 0rem;
}

.pi-building{
  font-size: 8rem;
}
</style>
