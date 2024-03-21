<!-- Popup -->

<script setup>
import { ref, onMounted } from "vue";

//references
const canvas = ref(null);
const video = ref(null);
const ctx = ref(null); //context
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
      <button @click="downloadPicture">Absenden</button>
      <button @click="closeModal" data-model-close>Verwerfen</button>
    </div>
  </div>
  <div id="overlay"></div>
</template>