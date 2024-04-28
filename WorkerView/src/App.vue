<script setup>
import Toast from 'primevue/toast';

</script>

<template>
  <!-- This part will be dynamically changed by the routed according to the current page-->
  <main>
    <RouterView />
  </main>
  <Toast position="bottom-right"/>
</template>

<style scoped>
</style>
