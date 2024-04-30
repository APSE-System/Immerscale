<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits(['fetchLinks'])
const visible = ref(false);

// Variable to store the name of the new link
let newName = ""

// function to add a new link
function generateLink(linkName) {
  fetch( import.meta.env.VITE_BACKEND_IP + '/api/workerView/token?name=' + linkName +'&project_id=' + route.params.id, {credentials: "include", method: "POST"})
    .then((data) => {
      console.log(data)
      // Update the links list so the new link is directly displayed
      emit('fetchLinks')
    })
    .catch(function(){
      alert("Backend ist nicht errreichbar")
    })
    
}
</script>

<template>
    <div class="card flex justify-content-center">
        <Button class="addBtn" icon="pi pi-plus" outlined rounded @click="visible = true" v-tooltip="{ value: 'Neuen Link generieren', showDelay: 400, hideDelay: 200  }"></Button>

        <!-- Dialog for generating a new link, will only show once "Generate new Link" Button is pressed -->
        <Dialog v-model:visible="visible" modal header="Neuen Link generieren" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-3">Neuen Link generieren</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="name" class="font-semibold w-6rem">Name</label>
                <InputText id="name" class="flex-auto" autocomplete="off" v-model="newName"/>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button class="in-box" type="button" label="Abbrechen" severity="secondary" @click="visible = false"></Button>
                <Button class="in-box" type="button" label="Speichern" @click="visible = false; generateLink(newName); "></Button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
.Button {
    margin: 0.5rem;
    width: 100%;
    width: 10rem; 
    height: 5rem; 
    background-color: #697dff;
}
.Dialog {
    background-color: #697dff;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    border-radius: 7px;
    transition: transform 0.3s ease;
    width: 100%;
    max-width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
}

.addBtn:hover{
    transform: scale(1.1);
}
.addBtn{
    border-radius:28px!important;
    border: 1px solid #697dff;
}
@media (prefers-color-scheme: dark) {
    .in-box{
      color: black;
    }
    .in-box:hover{
      color: rgb(35, 115, 210);
    }
}
</style>