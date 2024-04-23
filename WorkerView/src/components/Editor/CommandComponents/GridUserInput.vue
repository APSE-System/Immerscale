<script setup>
import Knob from 'primevue/knob';
import Button from 'primevue/button';
import { defineProps, ref} from "vue";

let xRot = ref(0)
let yRot = ref(0)
let zRot = ref(0)


let rotMin = ref(-90)
let rotMax = ref(90)


const props = defineProps({
  controller: Object
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



</script>



<template>
  <div class="controls">
    <h2>X-Rotation:</h2>
    <Knob v-model="xRot" v-on:change="xRotChanged" :size="150" :min="rotMin" :max="rotMax" />
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="xRot++; xRotChanged();" :disabled="xRot >= rotMax" />
      <Button icon="pi pi-minus" @click="xRot--; xRotChanged();" :disabled="xRot <= rotMin" />
    </div>

    <h2>Y-Rotation:</h2>
    <Knob v-model="yRot" v-on:change="yRotChanged" :size="150" :min="rotMin" :max="rotMax" />
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="yRot++; yRotChanged();" :disabled="yRot >= rotMax" />
      <Button icon="pi pi-minus" @click="yRot--; yRotChanged();" :disabled="yRot <= rotMin" />
    </div>

    <h2>Z-Rotation:</h2>
    <Knob v-model="zRot" v-on:change="zRotChanged" :size="150" :min="rotMin" :max="rotMax" />
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="zRot++; zRotChanged();" :disabled="zRot >= rotMax" />
      <Button icon="pi pi-minus" @click="zRot--; zRotChanged();" :disabled="zRot <= rotMin" />
    </div>
  </div>

</template>

<style scoped>

.controls{
  display: block;
}

</style>