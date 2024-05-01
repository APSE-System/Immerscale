<!-- Camera -->

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';

// original code from: https://codelabs.developers.google.com/codelabs/tensorflowjs-object-detection#6

//references
const video = ref(null);
const isVideoVisible = ref(true);
const toast = useToast();

// The onMounted lifecycle hook is used to run an async function when the component is mounted.
onMounted(() => {
  const video = document.getElementById("webcam");

  // Check if webcam access is supported.
  function getUserMediaSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // If webcam supported enableCam
  if (getUserMediaSupported()) {
    enableCam();
  } else {
    console.warn("getUserMedia() is not supported by your browser");
  }

  // Enable the live webcam view and start classification.
  function enableCam() {
    // 1: getUsermedia parameters to force video but not audio.
    let constraints = {
      audio: false,
      video: {
           width: { ideal: 10000 },
           height: { ideal: 10000 },
           facingMode: "environment"
          },
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      video.srcObject = stream;
    })
    .catch((error) => {
      // the ideal width and height can lead to an error
      // when it does not work a new constraint will be enforced
      console.log("first constraint did not work")

      // 2: try again with different constraint
      let constraints = {
        audio: false,
          video: {
           facingMode: {ideal: "environment"},
        },
      };

      // Activate the webcam stream (2nd try)
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      video.srcObject = stream;
      })
      .catch((error) => {
        console.log('no camera')
        // the camera-access does not work, therefore isVideoVisible is false
        // then the video-element is not shown but a icon instead to notify the user 
        isVideoVisible.value = false;
      })
    })
  }
});

// warn the user if the website is opened with a computer
onMounted(() => {
  // check if the website is opened with mobile or desktop
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('The website is opened with a "phone"');
  } else {
    console.log('The website is opened with a computer');

    // add delay of 3 seconds, then show the toast-warning
    setTimeout(() => {
      toast.add({ severity: 'warning', summary: 'Warnung', 
      detail:'Willkommen auf unserer mobilen optimierten Seite! Bitte beachten Sie, dass die Benutzererfahrung auf einem Desktop-Computer möglicherweise nicht optimal ist. Wir empfehlen die Nutzung eines mobilen Geräts für das bestmögliche Surferlebnis', 
      life: 10000 });
    }, 3000);
  }
})
</script>

<template>
  <!-- the main contianer contains the camera view-->
  <div class="main-container">
    <!-- video-mask for styling -->
    <div class="video-mask">
      <video v-if="isVideoVisible" id="webcam" ref="webcam" autoplay muted></video>
    </div>
    <!-- show this if the camera-access does not work -->
    <i v-if="!isVideoVisible" class="pi pi-eye-slash my-icon" style="font-size: 10rem;" ></i>
    <p v-if="!isVideoVisible">Keine Kamera</p>
  </div>
</template>

<style scoped>
/* this displays the live display */
video {
  margin: 0 auto;
  padding: 5px;
  min-width: 1px;
  max-height: 65vh;
  min-height: 1px;
  width: auto;
  overflow: hidden;
}

/* make video bigger for landscape */
@media (orientation: landscape) {
  video {
    max-height: 90vh;
  }
}

/* this is mainly just to have rounded corners for the live-display */
.video-mask {
  border-radius: 100px;
  overflow: hidden;
}

/* main container contains the live-camera feed */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  overflow: hidden;
  justify-content: center;
}

</style>