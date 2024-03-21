<!-- The Camera component holds the information for the entire structure at the moment -->

<script setup>
import { ref, onMounted } from "vue";

//references
const canvas = ref(null);
const video = ref(null);
const ctx = ref(null); //context
let image;

// const constraints = ref({
//   audio: false,
//   video: true,
// });

// width and heigt for landscape wih a 4:3 ratio
// TODO look if 16:9 ratio alos needs to be supported
const HEIGHT = 1530;
const WIDTH = 2040;

const constraints = ref({ audio: false, video: { facingMode: "environment" } });

// The onMounted lifecycle hook is used to run an async function when the component is mounted.
// Inside this function, it checks if both the video and canvas elements are available.
// If they are, it gets the 2D rendering context of the canvas element.
onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext("2d");

    // get the webcam information
    // If successful, it calls the SetStream function passing in the stream.
    await navigator.mediaDevices
      .getUserMedia(constraints.value)
      .then((stream) => {
        // TODO the code below does not work as intended (640 x 480)
        // the code below should scale the canvas based on the camera
        // let canvas = document.getElementById("canvas");
        // const track = stream.getVideoTracks()[0];
        // const settings = track.getSettings();

        // // setting the width and heigth on the size of the camera
        // canvas.width = settings.width;
        // canvas.height = settings.height;

        setStream(stream);
      })
      .catch((e) => {
        console.error(e);
      });
  }
});

// sets stream parameter as the source object for the video element,
// plays the video, and calls the Draw function using requestAnimationFrame.
function setStream(stream) {
  video.value.srcObject = stream;
  video.value.play();
  requestAnimationFrame(draw);
}

// The Draw function continuously draws frames from the video onto the canvas using its 2D rendering context.
// It then calls itself recursively using requestAnimationFrame to create an animation effect.
function draw() {
  if (canvas == null) return;
  ctx.value.drawImage(
    video.value,
    0,
    0,
    canvas.value.width,
    canvas.value.height
  );
  requestAnimationFrame(draw);
}

//! this function will not be necessary in the future (maybe)
function downloadPicture() {
  var link = document.createElement("a");
  link.download = "immerscale-picture";
  //ink.href = canvas.value.toDataURL(); //
  image = document.getElementById("my-image");
  link.href = image.src;
  link.click();
}

//this function will open the popup which displays the taken Picture
function openModal() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  if (modal == null) return;

  //the active tag transforms the scale from 0->1 (see style.css)
  modal.classList.add("active");
  overlay.classList.add("active");

  //the current picture of the camera is displayed in the body of the popup
  let canvas = document.getElementById("canvas");
  image = canvas.toDataURL("image/jpeg");
  let myImage = document.getElementById("my-image");
  myImage.src = image;
}

//this will close the popup
function closeModal() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  if (modal == null) return;

  //by removing active the scale of will
  //be transformed from 1->0
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// check orientation
let portrait = window.matchMedia("(orientation: portrait)");

// initial orientation check 
// TODO make the code orientation code look better
window.addEventListener("load", function (e) {
  let canvas = document.getElementById("canvas");

  if (e.matches) {
    // portrait
    canvas.width = HEIGHT;
    canvas.height = WIDTH;
  } else {
    // landscape
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
  }
});

// on orientation change, change the canvas width and height
portrait.addEventListener("change", function (e) {
  let canvas = document.getElementById("canvas");

  if (e.matches) {
    // portrait
    canvas.width = HEIGHT;
    canvas.height = WIDTH;
  } else {
    // landscape
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
  }
});
</script>

<template>
  <!-- the main contianer contains the camera view and the 'Bild erstellen'-button -->
  <div class="main-container">
    <div>
      <video
        class="video"
        ref="video"
        autoplay
        playsinlie
        webkit-playsinline
        muted
        hidden
      ></video>
      <!-- the canvas with and height are dynamically adjusted -->
      <!-- the size of width and heigt determine the dimension of the picture taken -->
      <canvas id="canvas" ref="canvas" class="video-mask"></canvas>
    </div>

    <div>
      <!-- Will open the Popup -->
      <button
        @click="openModal"
        data-modal-target="#modal"
        class="take-picture-button"
      >
        Bild erstellen
      </button>
    </div>
  </div>

  <!-- Popup -->
  <div class="modal" id="modal">
    <div class="modal-header">
      Senden?
      <button @click="closeModal" class="close">
        <!-- this is a x -->
        &times;
      </button>
    </div>
    <div class="modal-body">
      <img id="my-image" src="" alt="" />
    </div>
    <div class="modal-footer">
      <!-- TODO implement the 'send'-function -->
      <button @click="downloadPicture">Absenden</button>
      <button @click="closeModal" data-model-close>Verwerfen</button>
    </div>
  </div>
  <div id="overlay"></div>
</template>