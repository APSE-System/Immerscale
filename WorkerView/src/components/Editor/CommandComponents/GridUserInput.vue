<script setup>
import Knob from 'primevue/knob';
import Button from 'primevue/button';
import { onMounted, reactive, watch, defineProps, ref} from "vue";

let xRot = ref(0)
let yRot = ref(0)
let zRot = ref(0)


let rotMin = ref(-90)
let rotMax = ref(90)


const props = defineProps({
  controller: Object
});

let visible = ref(false);

document.addEventListener("GridToolSelected", function (e) {
  visible.value = true;
});
document.addEventListener("GridToolUnselected", function (e) {
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

function setInput(){
  props.controller.setInput();
}

</script>



<template>
  <div v-if="visible" class="controls" >
    <h3>X-Rotation:</h3>
    <Knob v-model="xRot" v-on:change="xRotChanged" :size="100" :min="rotMin" :max="rotMax" />
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="xRot++; xRotChanged();" :disabled="xRot >= rotMax" />
      <Button icon="pi pi-minus" @click="xRot--; xRotChanged();" :disabled="xRot <= rotMin" />
    </div>

    <h3>Y-Rotation:</h3>
    <Knob v-model="yRot" v-on:change="yRotChanged" :size="100" :min="rotMin" :max="rotMax" />
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="yRot++; yRotChanged();" :disabled="yRot >= rotMax" />
      <Button icon="pi pi-minus" @click="yRot--; yRotChanged();" :disabled="yRot <= rotMin" />
    </div>

    <h3>Z-Rotation:</h3>
    <Knob v-model="zRot" v-on:change="zRotChanged" :size="100" :min="rotMin" :max="rotMax" />
    <div class="flex gap-2">
      <Button icon="pi pi-plus" @click="zRot++; zRotChanged();" :disabled="zRot >= rotMax" />
      <Button icon="pi pi-minus" @click="zRot--; zRotChanged();" :disabled="zRot <= rotMin" />
    </div>

    <Button label="Ebene Setzen" @click="setInput" severity="primary" />

  </div>
</template>

<style scoped>

.controls{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
}

</style>