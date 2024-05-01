<script setup>
import {onMounted, ref} from 'vue';


  // get authentication
   onMounted(() => {

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');


  console.log("get request: " + token)


  fetch(import.meta.env.VITE_BACKEND_IP + "/api/auth/cookie/enduser?token_id=" + token, {credentials: "include"})
  .then((response) => {
    // console.log(response)
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
});

</script>

<template>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>