<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import Button from "primevue/button";

const route = useRoute();

const sentences = [
  "Bevor Sie ein Bild an den Handwerker schicken, nehmen Sie sich bitte noch kurz Zeit und lesen Sie sich die Infos durch.",
  // "Um tolle Fotos zu erstellen, hier sind noch ein paar Hinweise:",
  "Erstellen Sie das Bild parallel zur Messenebene.",
  "Es ist wichtig, ein Referenzmaß zu haben, um das Bild auszumessen. Dafür gibt es zwei Möglichkeiten:",
  "Möglichkeit 1: Verwenden Sie einen Meterstab.",
  "Der Meterstab sollte gut sichtbar und mittig platziert werden, sodass der Abstand abgelesen werden kann.",
  "Möglichkeit 2: Alternativ kann ein DIN A4 Blatt vollständig mittig auf dem zu vermessenden Objekt platziert werden.",
  "Achten Sie darauf, dass das Handy gerade gehalten wird.",
  "Vielen Dank, dass Sie sich die Zeit genommen haben und aufmerksam die Hinweise gelesen haben. Jetzt können Sie loslegen.",
];

let currentIndex = ref(0);
let showText = true;
let currentText = ref(sentences[currentIndex.value]);

const nextSentence = () => {
  if (currentIndex.value < sentences.length - 1) {
    currentIndex.value++;
    updateContent();
  }
};

const prevSentence = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    updateContent();
  }
};

const updateContent = () => {
  currentText.value = sentences[currentIndex.value];
};
</script>

<template>
  <div>
    <h2 class="header">Info</h2>
    <div class="text-container" v-if="showText">
      <p>{{ currentText }}</p>
    </div>
    <div class="button-container">
      <Button @click="prevSentence" v-show="currentIndex > 0" class="my-button left">Zurück</Button>
      <Button @click="nextSentence" v-show="currentIndex < sentences.length - 1" class="my-button right"> Weiter </Button>
    </div>
    <!-- display the link only when you have read the infos -->
    <router-link v-if="currentIndex === sentences.length - 1" :to="{ path: '/', query: { token: route.query.token } }">
      Weiter zur PhotoView
    </router-link>
  </div>
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

.text-container{
    height: 40vh;
    border: 3px solid black;
    border-radius: 5px;
    margin-bottom: 10px ;
}

.button-container{
    height: 45px;
    margin-bottom: 10px ;    
}

.right{
    float: right;
}

.left{
    float: left;
}

.header{
    padding: 0;
    margin: 0;
}

</style>