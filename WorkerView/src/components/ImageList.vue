<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import TabBar from "./TabBar.vue";

// get the router for routing to the project pages
const router = useRouter();

const route = useRoute();

var images = ref([]);

// When the component is mounted the images which refer to this component should be fetched from the backend.
onMounted(() => {
  fetch(

      import.meta.env.VITE_BACKEND_IP +
      "/api/workerView/images?id=" +
      route.params.id, {credentials: "include"}
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      // extract the base64 images from the response and store them as dataURLs
      for (var key in data) {
        images.value.push("data:image/png;base64," + data[key].image);
      }
      console.log(images.value);
    })
    .catch(function () {
      alert("Backend ist nicht errreichbar");
    });
});

//call this when the user clicks a project to view its details
function clickedImage(index) {
  // Redirects to the Project page listing the according image.
  router.push("/project/" + route.params.id + "/image/" + index);
}
</script>

<template>
  <div class="content">
    <!-- Depending wether there were images fetched from the backend they are displayed or not. -->
    <div class="grid-box" v-if="images.length > 0">
      <!-- Iterating through the image list and displaying them. -->
      <div v-for="(image, index) in images" :key="index">
        <div class="square">
          <img
            @click="clickedImage(index)"
            :src="image"
            alt="Image {{ index + 1 }}"
          />
        </div>
      </div>
    </div>
    <div v-if="images.length == 0">
      <h3>No images in this project</h3>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
}

.grid-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 90%;
  padding: 20px;
}
/* this is not a square */
.square {
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}

img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
  cursor: pointer;
}

img:hover {
  transform: scale(1.1);
}
</style>