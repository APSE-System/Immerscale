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
    <!-- Depending on whether images were retrieved from the backend, they are displayed or not. -->
    <div class="masonry-layout" v-if="images.length > 0">
      <!-- Iterating through the image list and displaying them. -->
      <div v-for="(image, index) in images" :key="index" class="masonry-item">
        <div class="square" v-tooltip="{ value: 'Bild in Editor öffnen', showDelay: 600, hideDelay: 200  }">
          <img
            @click="clickedImage(index)"
            :src="image"
            alt="Image {{ index + 1 }}"
          />
        </div>
      </div>
    </div>
    <!-- If no images are available, a message is displayed. -->
    <div v-if="images.length == 0">
      <h3>Keine Bilder in diesem Projekt</h3>
    </div>
  </div>
</template>

<style scoped>
.content {
  /* if the width is higher than 65% it can lead to a bug,
  where the images are not balanced anymore */
  width: 65%;
  position: relative;
}

.masonry-layout {
  column-count: 4;
  column-gap: 10px;
  column-fill: balance;
}

.masonry-item {
  display: inline-block;
  margin-bottom: 10px;
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
  height: auto;
  object-fit: cover;
  transition: 0.5s;
  cursor: pointer;
}

img:hover {
  transform: scale(1.1);
}
</style>