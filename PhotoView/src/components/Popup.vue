<!-- Popup -->

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

//references
let image;

//! this function will not be necessary in the future (maybe)
function downloadPicture() {
  var link = document.createElement("a");
  link.download = "immerscale-picture";
  //ink.href = canvas.value.toDataURL(); //
  image = document.getElementById("my-image");
  link.href = image.src;
  link.click();
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

// this function posts the image to the backend
async function sendPicture() {
  image = document.getElementById("my-image");

  const backendUrl =
    "http://" + import.meta.env.VITE_BACKEND_IP + "/photoView/photo";

  // // get the base64 part of the image and remove the prefix "data:image/jpeg;base64," with split
  // the try catch is there just in the case some 'funny' things happen
  try {
    var imageAsBase64 = image.attributes.src.value.split(",")[1];
  } catch (error) {
    console.log(error);
    return;
  }

  // for debuging
  // TODO comment the console.log
  console.log(imageAsBase64);

  // this is is actually sending the picture using the axios library
  fetch("http://" + import.meta.env.VITE_BACKEND_IP + "/photoView/photo", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photo: imageAsBase64 }),
  })
    .then((response) => {
      if (response.ok) {
        // Handle success response
        alert(response);
      } else {
        // Handle error response
        alert(response);
      }
    })
    
}
</script>

<template>
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
      <button @click="sendPicture">Absenden</button>
      <button @click="closeModal" data-model-close>Verwerfen</button>
    </div>
  </div>
  <div id="overlay"></div>
</template>
