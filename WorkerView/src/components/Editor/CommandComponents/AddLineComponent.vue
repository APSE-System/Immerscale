<script setup>
import {defineProps} from 'vue';
import NumberInputPopup from "../NumberInputPopup.vue";

const props = defineProps({
  canvasLines: Array,
  width: Number,
  height: Number
});


function drawLine(canvas, line) {
  const ctx = canvas.getContext('2d');
  // Assuming CanvasPoint has x, y properties
  // set ctx color from hex

  console.log(line)

  ctx.lineWidth = 5;
  ctx.strokeStyle = "#" + line.color;
  ctx.beginPath();
  ctx.moveTo(line.startPoint.x, line.startPoint.y);
  ctx.lineTo(line.endPoint.x, line.endPoint.y);

  ctx.stroke(); // Render the path
}

function setCanvasRef(canvas, index) {
  if (canvas === null)
    return
  drawLine(canvas, props.canvasLines[index]);
}


</script>


<template>
  <div v-for="(line, index) in canvasLines" :key="index" class="AddLineCanvasWrapperDiv" style="position: absolute">
    <canvas :ref="el => {setCanvasRef(el, index)} " :width=width :height=height class="AddLineCanvas"></canvas>


    <NumberInputPopup :popupVisible="line.popup" :header="line.header" :description="line.description"
                      :value-name="line.value" @callback="line.callback"/>
  </div>

</template>


<style scoped>

.AddLineCanvasWrapperDiv {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.AddLineCanvas {
  width: 100%;
  height: auto;
  left: 0;
  right: 0;
}


</style>