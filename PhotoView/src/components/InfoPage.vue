<!-- Info Page -->

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import Button from "primevue/button";
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';

// variables
const route = useRoute();
const router = useRouter();

const sentences = [
  "Bevor Sie das Bild an den Handwerker schicken, bitte lesen Sie die Informationen sorgfältig durch.",
  "Erstellen Sie das Bild parallel zur Messfläche. Es ist wichtig, ein Maß als Referenz zu haben, um das Bild auszumessen. Dafür gibt es zwei Möglichkeiten:",
  "Möglichkeit 1: Benutzen Sie einen Meterstab. Der Meterstab sollte gut sichtbar und in der Mitte platziert werden, damit der Abstand abgelesen werden kann.",
  "Möglichkeit 2: Alternativ können Sie ein DIN A4 Blatt genau in der Mitte des zu vermessenden Objekts platzieren. Stellen Sie sicher, dass das Handy gerade gehalten wird.",
  "Vielen Dank, dass Sie sich die Zeit genommen haben und aufmerksam die Hinweise gelesen haben. Jetzt können Sie loslegen."
];

let currentIndex = ref(0);

function goToMain() {
  router.push({ path: '/main', query: {token: route.query.token} });
}

</script>

<template>
    <h2 class="header">Info</h2>

    <div class="card flex justify-content-center main">
      <Stepper orientation="vertical" linear :activeIndex="currentIndex">
        <!-- stepper header -->
        <StepperPanel v-for="(sentence, index) in sentences" :key="index" :header="'Schritt ' + (index + 1)">
          <!-- content -->
          <template #content="{ nextCallback, prevCallback }">
            <div class="flex flex-column h-12rem text-container">
              <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">{{ sentence }}</div>
            </div>
            <div class="flex pt-4 justify-content-between button-container">
              <!-- back -->
              <Button v-if="index > 0" label="Zurück" severity="secondary" icon="pi pi-arrow-left" class="my-button left" @click="prevCallback" />
              <!-- forward -->
              <Button v-if="index < sentences.length - 1" label="Weiter" icon="pi pi-arrow-right" class="my-button right" iconPos="right" @click="nextCallback" />
              <!-- to the main Page if you have read the info -->
              <Button v-if="index === sentences.length - 1" @click="goToMain" class="my-button right" label="Weiter zur PhotoView"></Button>
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </div>
</template>


<style scoped>
.p-stepper {
  flex-basis: 50rem;
}

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
    border-radius: 5px;
    margin-bottom: 10px ;
}

.button-container{
    height: 45px;
    margin-top: 5px;
    margin-bottom: 10px ;   
    display: flex; 
    min-width: 0;
    min-height: 0;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
}

.right{
  margin-left: auto;
}

.left{
    float: left;
}

.header{
    padding: 0;
    margin: 0;
}

/* don't let the buttons collide */
@media screen and (max-width: 500px) {
  .my-button {
    font-size: 0.85rem;
    padding: 0.5rem;
  }
}

@media screen and (max-width: 400px) {
  .my-button {
    font-size: 0.7rem;
    padding: 0.5rem;
  }
}

@media screen and (max-width: 355px) {
  .my-button {
    font-size: 0.6rem;
    padding: 0.5rem;
  }
}
</style>