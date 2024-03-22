<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
const visible = ref(false);

//preliminary function to add a new project. TODO: Implement backend call
function addProject(projectName) {
  fetch('http://' + import.meta.env.VITE_BACKEND_IP + '/workerView/project?name=' + projectName +'&mail=testmail@mymail.org', {method: "POST"}) 
    .then((data) => {
      console.log(data)
    })
    .catch(function(){
      alert("Backend ist nicht errreichbar")
    })
    
}

</script>


<template>
    <div class="card flex justify-content-center">
        <Button label="Create New Project" @click="visible = true"></Button>

        <!-- Dialog for adding new project, will only show once "Create New Project Button" is pressed -->
        <Dialog v-model:visible="visible" modal header="New Project" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-3">Add new Project</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="name" class="font-semibold w-6rem">Name</label>
                <InputText id="name" class="flex-auto" autocomplete="off" v-model="newName"/>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="visible = false; addProject(newName); "></Button>
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
</style>