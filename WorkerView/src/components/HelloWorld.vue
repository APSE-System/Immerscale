<script setup>
import { ref } from 'vue'
import Button from 'primevue/button';

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
  </div>
  <Button label="Success" severity="success" />  


  <p>
    Check out
    <a href="https://immersight.com/" target="_blank"
      >Immersight</a
    >, the official sponsor of this project
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
