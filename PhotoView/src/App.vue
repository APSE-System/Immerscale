<script setup>
    import Camera from './components/Camera.vue';
    import Popup from './components/Popup.vue';
    import { onMounted } from 'vue';


    onMounted(() => {
  const currentUrl = window.location.href;
  console.log("get request: ")

  fetch("http://" + import.meta.env.VITE_BACKEND_IP + "/auth/cookie/enduser?token_id=" + '7n2ylY2VkocWEvRG', {credentials: "include"})
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
});

</script>

<template>
  <div>
    <Camera/>
    <Popup/>
  </div>
</template>