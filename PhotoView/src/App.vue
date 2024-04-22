<script setup>
import Index from './components/Index.vue';
import {onMounted, ref} from 'vue';


  //  #region get auth
   onMounted(() => {

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');


  console.log("get request: " + token)


  fetch("http://" + import.meta.env.VITE_BACKEND_IP + "/auth/cookie/enduser?token_id=" + token, {credentials: "include"})
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
// #endregion

function handleOrientation(event) {
  xrot.value = event.beta;
  yrot.value = event.gamma;
  zrot.value = event.alpha;
}

</script>

<template>

<h2 class="header">PhotoView</h2>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  padding: 0;
  margin: 0;
}
</style>