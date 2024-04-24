<script setup>
import {defineProps, watch} from 'vue';

// The properties of this component consist of a list of points that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasPoints: Array,
  width: Number,
  height: Number,
  currentMousePosition: Array,
  activePointPreview: Boolean,
});


// This function draws the given point on the given canvas.
function drawPoint(canvas, point) {
  const ctx = canvas.getContext('2d');
  // setting the color of the point
  ctx.fillStyle = "#" + point.color;
  ctx.beginPath();
  // Drawing a circle at the coordinates of the point.
  ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
  ctx.fill();
}

function drawLinePreview(canvas, point) {

if(!props.activePointPreview) return;

if((props.currentMousePosition[0] === 0 && props.currentMousePosition[1] === 0) 
 || (point == null) ) {
  return;
}

console.log('drawing point')

const ctx = canvas.getContext('2d');
// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Setting line width for preview
ctx.lineWidth = 5;

// Setting line color for preview
ctx.strokeStyle = "#ff8800";

ctx.beginPath();

ctx.moveTo(point.x, point.y)

ctx.lineTo(props.currentMousePosition[0], props.currentMousePosition[1]);

// Render the path for preview
ctx.stroke();
}


// This function checks if the canvas even exists before handing the according point to the drawing function.
function setCanvasRef(canvas, index) {
  if (canvas === null)
    return
  drawPoint(canvas, props.canvasPoints[index]);
}

let previewCanvas;

function setPreviewCanvasRef(canvas) {
  if (canvas === null || props.canvasPoints == null) return;

  previewCanvas = canvas;

  drawLinePreview(canvas, props.canvasPoints[props.canvasPoints.length-1]); // Draw preview line based on current mouse position
}

watch(() => props.activePointPreview, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    clearPreview();
  }
});

function clearPreview() {
  if (previewCanvas == null) return;

  const ctx = previewCanvas.getContext('2d');
  // Clear the canvas
  ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
}

</script>


<template>
  <canvas :ref="el => {setPreviewCanvasRef(el)}" :width=width :height=height class="AddPointCanvas" style="position: absolute; top:0; left:0;"></canvas>
  <!-- This loop goes over all the points that exist and draws them on a canvas each. -->
  <div v-for="(point, index) in canvasPoints" :key="index" class="AddPointCanvasWrapperDiv" style="position: absolute">
    <canvas :ref="el => {setCanvasRef(el, index)} "  :width=width :height=height class="AddPointCanvas"></canvas>
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

canvas {
  /* filter: blur(100); */
  image-rendering: crisp-edges;
}


</style>