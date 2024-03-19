<script setup>
import 'primeicons/primeicons.css'

//define properties for the project items

const props = defineProps({
  id: Number,
  name: String,
  active: Boolean,
})

//call this when the user clicks a project to view its details
function clickedProject() {
  console.log('Project ' + props.id + ' clicked')
  alert('Project ' + props.id + ' clicked')
  //insert backend call here
}
</script>


<template>
  <!-- Empty div to work around weird visibility issue TODO: Fix this more elegantly -->
  <div></div>
  <div class="ProjectItem" @click="clickedProject">
    <!-- Icon on the left side colored depending on whether the project is active or not -->
    <div class="pi pi-user"  v-if="active" style="color: lightgreen" ></div>
    <div class="pi pi-user"  v-if="!active" style="color: darkgrey" ></div>  
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
  width: 100%;
  max-width: 100%;
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

.pi-user{
  font-size: 8rem;
}
</style>
