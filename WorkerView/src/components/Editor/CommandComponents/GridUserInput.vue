<script setup>
import Knob from 'primevue/knob';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import {defineProps, ref} from "vue";
import Toast from "../../../App.vue";
import {useToast} from 'primevue/usetoast';

let xRot = ref(0)
let yRot = ref(0)
let zRot = ref(0)


let rotMin = ref(-90)
let rotMax = ref(90)

let scale = ref(100)


const toast = useToast();


const props = defineProps({
  controller: Object
});

let visible = ref(false);

document.addEventListener("GridToolSelected", function (e) {
  visible.value = true;
});
document.addEventListener("GridToolUnselected", function (e) {
  toast.add({severity:'info', summary:'Länge auswählen', detail:'Ebene ist gesetzt, wählen Sie nun eine Referenz-Länge.', life: 20000});
  visible.value = false;
});

function xRotChanged() {
  props.controller.setXRotation(xRot.value);
}

function yRotChanged() {
  props.controller.setYRotation(yRot.value);
}

function zRotChanged() {
  props.controller.setZRotation(zRot.value);
}

function scaleChanged(){
  props.controller.setScale(scale.value);
}

function setInput() {
  props.controller.setInput();
}

</script>


<template>
  <Toast/>

  <div v-if="visible" class="controls">
    <h3>X-Rotation:</h3>
    <Knob v-model="xRot" v-on:change="xRotChanged" :size="100" :step="0.5" :min="rotMin" :max="rotMax"/>
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="xRot+=0.5; xRotChanged();" :disabled="xRot >= rotMax"/>
      <Button icon="pi pi-minus" @click="xRot-=0.5; xRotChanged();" :disabled="xRot <= rotMin"/>
    </div>

    <h3>Y-Rotation:</h3>
    <Knob v-model="yRot" v-on:change="yRotChanged" :size="100" :step="0.5" :min="rotMin" :max="rotMax"/>
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="yRot+=0.5; yRotChanged();" :disabled="yRot >= rotMax"/>
      <Button icon="pi pi-minus" @click="yRot-=0.5; yRotChanged();" :disabled="yRot <= rotMin"/>
    </div>

    <h3>Z-Rotation:</h3>
    <Knob v-model="zRot" v-on:change="zRotChanged" :size="100" :step="0.5" :min="rotMin" :max="rotMax"/>
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="zRot+=0.5; zRotChanged();" :disabled="zRot >= rotMax"/>
      <Button icon="pi pi-minus" @click="zRot-=0.5; zRotChanged();" :disabled="zRot <= rotMin"/>
    </div>

    <h3>Skalierung (in %):</h3>
    <InputNumber v-model="scale" showButtons buttonLayout="vertical" @update:modelValue="scaleChanged" style="width: 4rem" :min="0">
      <template #incrementbuttonicon>
        <span class="pi pi-plus"/>
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus"/>
      </template>
    </InputNumber>

    <Button class="setButton" label="Ebene Setzen" @click="setInput" severity="primary"/>

  </div>
</template>

<style scoped>

.controls {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
}

.setButton{
  margin-top: 10px;
}


</style>