<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
var images = ref([]);
var zoom = ref(null);

// TODO remove the extra fetch
// When the component is mounted the images which refer to this component should be fetched from the backend.
onMounted(() => {
  fetch(
    "http://" +
      import.meta.env.VITE_BACKEND_IP +
      "/workerView/images?id=" +
      route.params.id
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

// original code from: https://blog.stackfindover.com/zoom-image-point-with-mouse-wheel
var scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = { x: 0, y: 0 };

function setTransform() {
  zoom.style.transform =
    "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

// locial for the image zoom
onMounted(() => {
  zoom = document.getElementById("zoom");

  // dragging the image
  zoom.onmousedown = function (e) {
    // check if the mouse wheel button is pressed
    if (e.button == 1) {
      e.preventDefault();
      start = { x: e.clientX - pointX, y: e.clientY - pointY };
      panning = true;
      // TODO at the moment you cant use the outer-zoom-box to move around
      // TODO if you scroll and go outside of the zoom-box the panning is not set to false (maybe change this)
    }
  };

  // stop the dragging
  zoom.onmouseup = function (e) {
    panning = false;
  };

  // if the mouse-wheel-button is pressed you can move your mouse to move around in the image
  zoom.onmousemove = function (e) {
    e.preventDefault();
    if (!panning) {
      return;
    }
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;
    setTransform();
  };

  // zoom into the picture
  zoom.onwheel = function (e) {
    e.preventDefault();
    panning = false;

    var xs = (e.clientX - pointX) / scale,
      ys = (e.clientY - pointY) / scale,
      delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

    delta > 0 ? (scale *= 1.1) : (scale /= 1.1);

    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;
    setTransform();
  };
});
</script>

<template>
  <div id="zoom-outer">
    <div ref="zoom" class="zoom" id="zoom">
      <div @wheel="onWheel" v-if="images.length > 0">
        <img id="our-image" :src="images[$route.params.index]" alt="image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#zoom-outer {
  background: #000;
  overflow: hidden;
}

#zoom {
  width: 100%;
  height: 100%;
  transform-origin: 0px 0px;
  transform: scale(1) translate(0px, 0px);
  cursor: grab;
}
#our-image {
  width: 100%;
  height: auto;
}
</style>
