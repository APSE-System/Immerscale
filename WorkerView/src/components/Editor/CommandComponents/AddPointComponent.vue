<script setup>
import {defineProps, watch} from 'vue';

// The properties of this component consist of a list of points that should be displayed, and the width and the length of the canvas.
// current Mouse Position is for the preview and activPointPreview says whether the preview is rendered or not
// draw First Point tells the Preview to connect the first point
const props = defineProps({
  canvasPoints: Array,
  width: Number,
  height: Number,
  currentMousePosition: Array,
  activePointPreview: Boolean,
  drawFirstPoint: Boolean,
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

function drawLinePreview(canvas, points) {

let point = points[props.canvasPoints.length-1];

if(!props.activePointPreview) return;

if((props.currentMousePosition[0] === 0) 
 || (point == null) ) {
  return;
}

const ctx = canvas.getContext('2d');
// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Setting line width for preview
ctx.lineWidth = 5;

// Setting line color for preview
ctx.strokeStyle = "#ff8800";

// draw line from last point to mouse position
ctx.beginPath();

ctx.moveTo(point.x, point.y)
ctx.lineTo(props.currentMousePosition[0], props.currentMousePosition[1]);

// Render the path for preview
ctx.stroke();

// optional: also draw a line to the very first point
if(!props.drawFirstPoint) return;

ctx.moveTo(points[0].x, points[0].y);
ctx.lineTo(props.currentMousePosition[0], props.currentMousePosition[1]);

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

  // Draw preview line based on current mouse position
  drawLinePreview(canvas, props.canvasPoints); 
}

// watch for deactivated preview
watch(() => props.activePointPreview, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    clearPreview();
  }
});

// watch if mouse is 0
watch(() => props.currentMousePosition, (newValue, oldValue) => {
  if (newValue[0] === 0) {
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
  <!-- this is the preview canvas -->
  <canvas :ref="el => {setPreviewCanvasRef(el)}" :width=width :height=height class="AddPointPreviewCanvas" ></canvas>

  <!-- This loop goes over all the points that exist and draws them on a canvas each. -->
  <div v-for="(point, index) in canvasPoints" :key="index" class="AddPointCanvasWrapperDiv">
    <canvas :ref="el => {setCanvasRef(el, index)} "  :width=width :height=height class="AddPointCanvas"></canvas>
  </div>
</template>


<style scoped>

.AddPointPreviewCanvas{
  position: absolute;
}

.AddPointCanvasWrapperDiv{
  position: absolute;
}

.AddPointCanvas {
  width: 100%;
  height: auto;
}

canvas {
  image-rendering: crisp-edges;
}


</style>