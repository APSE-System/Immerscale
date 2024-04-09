<script setup>
import {defineProps} from 'vue';

var lastIndex = -1;

const props = defineProps({
  canvasPoints: Array,
  width: Number,
  height: Number
});


function drawLine(canvas, point1, point2) {
  const ctx = canvas.getContext('2d');
  // Assuming CanvasPoint has x, y properties
  // set ctx color from hex

  ctx.lineWidth = 5;
  ctx.strokeStyle = "#" + point2.color;
  ctx.beginPath();
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);

  ctx.stroke(); // Render the path
}

function setCanvasRef(canvas, index) {
  if (canvas === null)
    return

  if (props.canvasPoints.length === 1 && index === 0) {
    lastIndex++;
  } else if (index > lastIndex) {
    drawLine(canvas, props.canvasPoints[lastIndex], props.canvasPoints[index]);
    lastIndex++;
  }
}


</script>


<template>
  <div v-for="(point, index) in canvasPoints" :key="index" class="AddLineCanvasWrapperDiv" style="position: absolute">
    <canvas :ref="el => {setCanvasRef(el, index)} " :width=width :height=height class="AddLineCanvas"></canvas>
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