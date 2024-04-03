<script setup>
import { onMounted } from 'vue';



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
  <!-- This part of the HTML is rendered for all pages -->
    <h1 id="headline">Immerscale</h1>

  <!-- This part will be dynamically changed by the routed according to the current page-->
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  #headline {
    color: gray;
    text-shadow:
    3px 3px 0 #000,
    -3px 3px 0 #000,
    -3px -3px 0 #000,
    3px -3px 0 #000;
  }
</style>
