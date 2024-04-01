<!-- Camera -->

<script setup>
import { ref, onMounted } from "vue";

//references
const canvas = ref(null);
const video = ref(null);
const ctx = ref(null); //context
let image;

// based on the ideal width and height a different camera is used
const constraints = ref({
  audio: false,
  video: { facingMode: "environment" },
  // video: {
  //  width: { ideal: 1280 },
  //  height: { ideal: 720 },
  // },
});

let HEIGHT;
let WIDTH;

// get cookie from backend
onMounted(() => {
  const currentUrl = window.location.href;
  console.log("get request: ")

  fetch("http://" + import.meta.env.VITE_BACKEND_IP + "/auth/cookie/enduser?token_id=" + 'sooos', {
   // credentials: 'include'
  })
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

        // Returns a sequence of MediaStreamTrack objects
        // representing the video tracks in the stream
        let settings = stream.getVideoTracks()[0].getSettings();

        // set the size of the camera resolution
        WIDTH = settings.width;
        HEIGHT = settings.height;

        // initialise the live-view parameters
        let canvas = document.getElementById("canvas");

        if (window.innerHeight > window.innerWidth) {
          //landscape
          canvas.width = HEIGHT;
          canvas.height = WIDTH;
        } else {
          //  portrait
          canvas.width = WIDTH;
          canvas.height = HEIGHT;
        }
        
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

// check orientation
let portrait = window.matchMedia("(orientation: portrait)");

// initial orientation check now done in onMounted
// window.addEventListener("load", updateView);

// on orientation change, change the canvas width and height
portrait.addEventListener("change", updateView);

function updateView(e) {
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
}
</script>

<template>
  <!-- the main contianer contains the camera view and the 'Bild erstellen'-button -->
  <div class="main-container">
    <div>
      <video
        class="video"
        id="video"
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
</template>
