<script setup>
    import Camera from './components/Camera.vue';
    import Popup from './components/Popup.vue';
    import { onMounted } from 'vue';

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

</script>

<template>
<h2 class="header">PhotoView</h2>
  <div>
    <Camera/>
    <Popup/>
  </div>
</template>

<style scoped>
.header {
  padding: 0;
  margin: 0;
}
</style>