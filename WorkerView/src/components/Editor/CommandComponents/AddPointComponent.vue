<script setup>
import {defineProps} from 'vue';
import {ref} from "vue";
import NumberInputPopup from "../NumberInputPopup.vue";

const props = defineProps({
  canvasPoints: Array,
  width: Number,
  height: Number
});


function drawPoint(canvas, point) {
  const ctx = canvas.getContext('2d');
  // Assuming CanvasPoint has x, y properties
  // set ctx color from hex
  ctx.fillStyle = "#" + point.color;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw a circle to represent the point
  ctx.fill();
}

function setCanvasRef(canvas, index) {
  if (canvas === null)
    return
  drawPoint(canvas, props.canvasPoints[index]);
}


</script>


<template>
  <div v-for="(point, index) in canvasPoints" :key="index" class="AddPointCanvasWrapperDiv" style="position: absolute">
    <canvas :ref="el => {setCanvasRef(el, index)} "  :width=width :height=height class="AddPointCanvas"></canvas>


    <NumberInputPopup :popupVisible="point.popup" :header="point.header" :description="point.description" :value-name="point.value" @callback="point.callback"/>
  </div>

</template>



<style scoped>

.AddPointCanvasWrapperDiv {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.AddPointCanvas {
  width: 100%;
  height: auto;
  left: 0;
  right: 0;
}


</style>