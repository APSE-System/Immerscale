<script setup>
import {defineProps} from 'vue';

// The properties of this component consist of a list of lines that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasLines: Array,
  width: Number,
  height: Number
});

// This function draws the given line on the given canvas.
function drawLine(canvas, line) {

  const ctx = canvas.getContext('2d');
  // Setting line width
  ctx.lineWidth = 5;
  // Setting line color
  ctx.strokeStyle = "#" + line.color;
  // Start drawing by moving the context to the first point
  ctx.beginPath();
  ctx.moveTo(line.points[0][0], line.points[0][1]);

  // Iterate to the point list of the line and connect them one after each other.
  for(let i = 1; i < line.points.length; i++) {
    ctx.lineTo(line.points[i][0], line.points[i][1]);
  }

  // Render the path
  ctx.stroke();
}

// This checks if the canvas even exists before giving the according line to the drawing function.
function setCanvasRef(canvas, index) {
  if (canvas === null) return;

  drawLine(canvas, props.canvasLines[index]);
}

</script>

<template>
  <!-- This loop goes over all the lines that exist and draws them on a canvas each. -->
  <div v-for="(line, index) in canvasLines" :key="index" class="AddLineCanvasWrapperDiv">
    <canvas :ref="el => {setCanvasRef(el, index)} " :width=width :height=height class="AddLineCanvas"></canvas>
  </div>
  
</template>


<style scoped>

.AddLineCanvas {
  max-width: 100%;
  max-height: 100vh;
}

.AddLineCanvasWrapperDiv{
  position: absolute;
  height: 100%;
}

canvas {
  image-rendering: crisp-edges;
}

</style>