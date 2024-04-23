<script setup>

import {defineProps} from 'vue';

// The properties of this component consist of a list of points that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasGrid: Array,
  gridWidht: Number,
  gridHeight: Number,
  width: Number,
  height: Number
});

// This function draws the given point on the given canvas.
function drawPoint(canvas, point, index) {

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // setting the color of the point
  ctx.fillStyle = "#" + "FF0000"
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(props.canvasGrid[index+10*11-81].x, props.canvasGrid[index+10*11-81].y);

  ctx.stroke()


  // Drawing a circle at the coordinates of the point.
  //ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
  //ctx.fill();
}

// This function checks if the canvas even exists before handing the according point to the drawing function.
function setCanvasRef(canvas, index) {
  if (canvas === null)
    return

  if(index < 10){
    drawPoint(canvas, props.canvasGrid[index], index);
  }
}

</script>

<template>
  <!-- This loop goes over all the points that exist and draws them on a canvas each. -->
  <div v-for="(point, index) in canvasGrid" :key="index" class="AddGridCanvasWrapperDiv" style="position: absolute">
    <canvas :ref="el => {setCanvasRef(el, index)} "  :width=width :height=height class="AddGridCanvas"></canvas>
  </div>

</template>



<style scoped>

  .AddGridCanvasWrapperDiv {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .AddGridCanvas {
    width: 100%;
    height: auto;
    left: 0;
    right: 0;
  }

  canvas {
    /* filter: blur(100); */
    image-rendering: crisp-edges;
  }

</style>