<script setup>
import { useRouter, useRoute } from "vue-router";
import {onMounted, ref } from 'vue';
import Button from "primevue/button";

// get the router for routing to the project sub pages
const route = useRoute()
const router = useRouter();

// this value is used to determine which button should be highlighted. This depends on which tab is selected.
const primary = ref(0); 

// As the tabs can be accessed directly via the URL, the path has to be checked which tab is selected to highlight the according button.
onMounted(()=>{
    const pathSegments = route.path.split('/')
    switch (pathSegments[pathSegments.length - 1]) {
        case 'images': 
            primary.value = 1;
            break;
        case 'access': 
            primary.value = 2;
            break;
        case 'settings': 
            primary.value = 3;
            break;
    }
})
</script>

<template>
    <Button label="Bilder" @click="router.push('images'); primary = 1;" :class="['p-button-' + ((primary === 1) ? 'primary' : 'secondary')]"/>
    <Button label="Zugriffe" @click="router.push('access'); primary = 2;" :class="['p-button-' + ((primary === 2) ? 'primary' : 'secondary')]"/>
    <Button label="Projekteinstellungen" @click="router.push('settings'); primary = 3;" :class="['p-button-' + ((primary === 3) ? 'primary' : 'secondary')]"/>
</template>

<style>
    .p-button{
    color: black;
    background-color: transparent;
}
@media (prefers-color-scheme: dark) {
    .p-button{
      color: white;
    }
  }

.p-button:hover{
    color: rgb(35, 115, 210);
}

#back-button {
    top: 5px;
    z-index: 2;
    background-color: transparent;
    color: black;
  }
  @media (prefers-color-scheme: dark) {
    #back-button{
      color: white;
    }
  }
  #back-button:hover {
    color: rgb(35, 115, 210);
  }
</style>