<script setup>
import { onMounted } from 'vue';
import Toast from 'primevue/toast';



onMounted( () => {
  fetch("http://" + import.meta.env.VITE_BACKEND_IP + "/auth/cookie/worker?credential=" + 'sooos', {credentials: "include"})
  .then((response) => {
    console.log(response)
    if (response.ok) {
      // Handle success response
      console.log("Success");
    } else {
      // Handle error response
      console.log("Unauthorized");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

})

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
