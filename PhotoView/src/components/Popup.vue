<!-- Popup -->

<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

//references
let image;
const visible = ref(false);

//! this function will be necessary in the future
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

  // // get the base64 part of the image and remove the prefix "data:image/jpeg;base64," with split
  // the try catch is there just in the case some 'funny' things happen
  try {
    var imageAsBase64 = image.attributes.src.value.split(",")[1];
  } catch (error) {
    console.log(error);
    return;
  }

  // for debuging
  // console.log(imageAsBase64);

  // this is is actually sending the picture
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
        showToast("Success");
      } else {
        // Handle error response
        showToast("Unauthorized")
      }
    })
    .catch((error) => {
      showToast("Error");
      console.error("Error:", error);
    })
  }

 // function will display the toast with the given message also changes color based on msg
 function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.className = "show";
    toast.innerText = msg;

    if(msg === "Success") {
      toast.style.backgroundColor = "green";
    }
    else if(msg === "Unauthorized" || msg === "Error") {
      toast.style.backgroundColor = "red";
    }
    else {
      toast.style.backgroundColor = "#333";
    }

    setTimeout(function() {toast.className = toast.className.replace("show", ""); }, 3000);
}

// this loads the image into the Popup
function loadImage() {
  let video = document.getElementById('webcam')
  let canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  let para = '-width: ' + video.videoWidth + ' -height: ' + video.videoHeight;
  console.log(para);

  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  let image = new Image();
  image.src = canvas.toDataURL("image/jpeg");

  // the on load is needed
  image.onload = function() {
    let myImage = document.getElementById("my-image");
    myImage.src = image.src;
    }
  }

</script>

<template>
  <div id="toast"></div>

  <Dialog v-model:visible="visible" header="Senden" :style="{ width: '25rem' }">
  <div class="modal-body">
    <img id="my-image" src="" alt="" />
  </div>
  <div class="modal-footer">
    <Button class="button" @click="visible = false; sendPicture()" label="Absenden"></Button>
    <Button
      class="button"
      @click="visible = false"
      data-model-close
      label="Verwerfen"
    ></Button>
  </div>
  </Dialog>

  <Button @click="visible = true; loadImage();" label="Bild erstellen"></Button>
</template>

<style scoped>
.p-button {
  color: black;
  background-color: transparent;
}

@media (prefers-color-scheme: dark) {
  .p-button {
    color: white;
  }
}

.p-button:hover {
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
    max-height: 50vh;
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
/* the background color also changes based on the text (Success or Unauthorized) */
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
</style>