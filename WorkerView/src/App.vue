<script setup>
import Toast from 'primevue/toast';

</script>

<template>
  <!-- This part will be dynamically changed by the routed according to the current page-->
  <main>
    <RouterView />
  </main>
  <Toast/>
</template>

<style scoped>
</style>
