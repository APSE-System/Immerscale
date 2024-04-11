<script setup>
import {defineProps} from 'vue';

// The properties of this component consist of a list of areas that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasArea: Array,
  width: Number,
  height: Number
});


// This function draws the given area on the given canvas.
function drawArea(canvas, area) {
  const ctx = canvas.getContext('2d');
  // Setting line width
  ctx.lineWidth = 5;
  // Setting line color
  ctx.strokeStyle = "#" + area.color;

  // TODO the fill color is hard coded for now change this later
  // Set fill color to red
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  // Begin drawing the polygon
  ctx.beginPath();
  ctx.moveTo(area.points[0][0], area.points[0][1]);

  // Iterate to the point list of the area and connect them one after each other.
  for(let i = 1; i < area.points.length; i++) {
    ctx.lineTo(area.points[i][0], area.points[i][1]);
  }

  // Close the path
  ctx.closePath();

  // Fill the polygon with the specified color
  ctx.fill();

  // draws the outline
  ctx.stroke();          
}

// This checks if the canvas even exists before giving the according line to the drawing function.
function setCanvasRef(canvas, index) {
  if (canvas === null)
    return
  drawArea(canvas, props.canvasArea[index]);
}


</script>


<template>
  <!-- This loop goes over all the lines that exist and draws them on a canvas each. -->
  <div v-for="(area, index) in canvasArea" :key="index" class="AddAreaCanvasWrapperDiv" style="position: absolute">
    <canvas :ref="el => {setCanvasRef(el, index)} " :width=width :height=height class="AddAreaCanvas"></canvas>
  </div>

</template>


<style scoped>

.AddAreaCanvasWrapperDiv {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.AddAreaCanvas {
  width: 100%;
  height: auto;
  left: 0;
  right: 0;
}


</style>


