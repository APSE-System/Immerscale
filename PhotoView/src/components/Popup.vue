<!-- Popup -->

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import ButtonGroup from "primevue/buttongroup"
import Dialog from "primevue/dialog";
import 'primeicons/primeicons.css'
import { useRouter, useRoute } from "vue-router";

// this is the image, which is displayed in the body of the popup
let image; 
// visible displays the visibility of this component
const visible = ref(false);
// used to display an error text
const isImageLoaded = ref(true);
const router = useRouter();
const route = useRoute();

function downloadPicture() {
  var link = document.createElement("a");
  link.download = "immerscale-picture";

  image = document.getElementById("my-image");
  link.href = image.src;
  link.click();
}

// this function posts the image to the backend
async function sendPicture() {
  image = document.getElementById("my-image");

  // get the base64 part of the image and remove the prefix "data:image/jpeg;base64,"
  try {
    var imageAsBase64 = image.attributes.src.value.split(",")[1];
  } catch (error) {
    console.log(error);
    return;
  }

  // display a toast before receiving the response
  showStickyToast(' Sende Bild...');

  // for sending the picture
  fetch(import.meta.env.VITE_BACKEND_IP + "/api/photoView/photo", {

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
        showToast("Erfolgreich gesendet");
      } else {
        // Handle error response
        showToast("Unautorisiert")
      }
    })
    .catch((error) => {
      showToast("Fehler");
      console.error("Error:", error);
    })
  }

 // function will display the toast with the given message also changes color based on msg
 function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.className = "show";
    toast.innerText = msg;

    if(msg === "Erfolgreich gesendet") {
      toast.style.backgroundColor = "green";
    }
    else if(msg === "Unautorisiert" || msg === "Fehler") {
      toast.style.backgroundColor = "red";
    }
    else {
      toast.style.backgroundColor = "#333";
    }

    setTimeout(function() {toast.className = toast.className.replace("show", ""); }, 3000);
}

// this toast won't go away and displays a spinner at the beginning
function showStickyToast(msg) {
  const toast = document.getElementById('toast');
  toast.className = "show";
  toast.innerHTML = `<span class="spinner"></span> ${msg}`;
  toast.style.backgroundColor = "#333";

  // create the style for the spinner
  // for some reason this needs to be done in javascript
  const spinner = document.querySelector('.spinner');
  spinner.style.display = "inline-block";
  spinner.style.border = "2px solid #f3f3f3";
  spinner.style.borderTop = "2px solid #3498db";
  spinner.style.borderRadius = "50%";
  spinner.style.width = "20px";
  spinner.style.height = "20px";
  spinner.style.animation = "spin 2s linear infinite";

  // Move the spinner 2px down
  spinner.style.position = "relative";
  spinner.style.top = "2px";

  // define the spinner animation
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  document.head.appendChild(styleElement);
}

// this loads the image into the Popup
function loadImage() {
  let video = document.getElementById('webcam')

  if(video == null) {
    isImageLoaded.value = false;
    return;
  } 

  let canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  let image = new Image();
  image.src = canvas.toDataURL("image/jpeg");

  // the on load is needed
  image.onload = function() {
    let myImage = document.getElementById("my-image");
    myImage.src = image.src;
    isImageLoaded.value = true;
    }
  }

  // will open the gallery and insert the picture into the popup
function openGallery() {
  // create an input object
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png, image/jpeg';

  // event handler for when a file is selected
  input.onchange = function(e) {
  let file = e.target.files[0];
  let reader = new FileReader();

  // event handler for when the file is read
  reader.onload = function(event) {
    let image = new Image();
    image.src = event.target.result;

    // image is loaded
    image.onload = function() {
      let myImage = document.getElementById("my-image");
      myImage.src = image.src;
      isImageLoaded.value = true;
    }
  }

  reader.readAsDataURL(file);

  }
// simulate a click on the input element to open the file dialog
input.click();
}

function goToInfo() {
  router.push({ path: '/info', query: {token: route.query.token} });
}

</script>

<template>
  <!-- Info Button -->
  <Button class="info-button" icon="pi pi-info-circle" @click="goToInfo"></Button>

  <!-- Toast -->
  <div id="toast"></div>

  <!-- Popup Header -->
  <Dialog v-model:visible="visible" header="Senden" :style="{ width: '25rem', maxHeight: '80vh', overflowY: 'auto' }">
    <!-- Popup Body -->
    <div class="modal-body">
      <img id="my-image" src="" alt="" />
      <p v-if="!isImageLoaded"> Kein Bild </p>
    </div>
    <!-- Popup Footer (Buttons) -->
    <div class="modal-footer">
      <ButtonGroup id="send-and-safe">  
        <Button class="button" @click="visible = false; sendPicture()" label="Absenden"></Button>
        <Button icon="pi pi-download" severity="secondary" @click="downloadPicture"></Button>
      </ButtonGroup>
      <Button class="button" @click="visible = false" data-model-close label="Verwerfen"></Button>
    </div>
  </Dialog>

  <!-- Create-Picture-Button and Open-Gallery-Button -->
  <ButtonGroup>
    <Button class="my-button" @click="visible = true; loadImage();" label="Bild erstellen"></Button>
    <Button class="my-button" icon="pi pi-images" @click="visible = true; openGallery()"></Button>
  </ButtonGroup>

</template>

<style scoped>
.my-button {
  color: black;
  background-color: transparent;
}

@media (prefers-color-scheme: dark) {
  .my-button {
    color: white;
  }
}

.my-button:hover {
  color: rgb(35, 115, 210);
}

/* this is for the popup */
/* the picture will be displayed in the body */
.modal-body {
  padding-top: 5px;
  max-height: 250px;
  overflow: hidden;
  justify-content: center;
  justify-items: center;
  display: flex;
  align-items: center;
}

.modal-body img {
  max-height: 250px;
  min-height: 50px;
  widows: auto;
}

/* this looks nicer in landscape */
@media (orientation: landscape) {
  #my-image {
    max-width: auto; 
    max-height: 30vh;
  }
} 

/* here are the 'absenden' and 'verwerfen' buttons */
.modal-footer {
  min-width: 0;
  min-height: 0;
  padding: 5px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer Button {
  color: black;
}

/* the background color also changes based on the text (Success or Unauthorized) (which is done in the funtion)*/
#toast {
  visibility: hidden;
  min-width: 250px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
  font-size: 17px;
  transition: 1s;
  opacity: 0;
}

#toast.show {
  visibility: visible;
  opacity: 1;
} 

#send-and-safe {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 600px) {
  .button {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

@media screen and (max-height: 600px) {
  .my-button {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

.info-button {
  color: black;
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0%;
  right: 0%;

}

@media (prefers-color-scheme: dark) {
  .info-button {
    color: white;
  }
}
</style>