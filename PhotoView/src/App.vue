<script setup>
import Camera from './components/Camera.vue';
import Popup from './components/Popup.vue';
import {onMounted, ref} from 'vue';


let xrot = ref(0);
let yrot = ref(0);
let zrot = ref(0);


onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');


  console.log("get request: " + token)

  fetch("https://" + import.meta.env.VITE_BACKEND_IP + "/auth/cookie/enduser?token_id=" + token, {credentials: "include"})
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

  window.addEventListener("deviceorientation", handleOrientation, true);

});

function handleOrientation(event) {
  xrot.value = event.beta;
  yrot.value = event.gamma;
  zrot.value = event.alpha;
}

</script>

<template>
  <h2>PhotoView</h2>
  <h4>{{xrot}}</h4>
  <h4>{{yrot}}</h4>
  <h4>{{zrot}}</h4>
  <div>
    <Camera/>
    <Popup/>
  </div>
</template>