<script setup>
import {defineProps, onMounted} from 'vue';

// The properties of this component consist of a list of lines that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasLines: Array,
  width: Number,
  height: Number,
  currentMousePosition: Array,
  firstPoint: Array,
});

let currentPreviewCanvas;

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

// This function draws the preview line on the given canvas
function drawLinePreview(canvas, line) {
  
  currentPreviewCanvas = canvas;
  
  if((props.currentMousePosition[0] === 0 && props.currentMousePosition[1] === 0) 
   || (line == null) && props.firstPoint == null) {
    clearPreviewCanvas();
    return;
  }
  
  const ctx = canvas.getContext('2d');
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Setting line width for preview
  ctx.lineWidth = 5;

  // Setting line color for preview
  ctx.strokeStyle = "#ff8800";

  ctx.beginPath();
  // if((props.firstPoint[0] > 0 && props.firstPoint[1] > 0 )) {
  //   console.log(props.firstPoint[1] + ' ' + props.firstPoint[0])
  //   ctx.moveTo(props.firstPoint[0], props.firstPoint[1]);
  // }
  if(props.firstPoint != null) {
    ctx.moveTo(props.firstPoint[0], props.firstPoint[1]);
  }
  else {
    ctx.moveTo(line.points[line.points.length-1][0], line.points[line.points.length-1][1]);
  }

  ctx.lineTo(props.currentMousePosition[0], props.currentMousePosition[1]);

  // Render the path for preview
  ctx.stroke();
}

function clearPreviewCanvas() {
  if(currentPreviewCanvas == null) return;

  // console.log('cleaning');
  const ctxPreview = currentPreviewCanvas.getContext('2d');

  // Clear the Preview canvas
  ctxPreview.clearRect(0, 0, currentPreviewCanvas.width, currentPreviewCanvas.height);

}

function setPreviewCanvasRef(canvas) {
  if (canvas === null || props.canvasLines == null) return;

  drawLinePreview(canvas, props.canvasLines[props.canvasLines.length-1]); // Draw preview line based on current mouse position
}

// This checks if the canvas even exists before giving the according line to the drawing function.
function setCanvasRef(canvas, index) {
  if (canvas === null) return;

  drawLine(canvas, props.canvasLines[index]);
}


</script>


<template>
  <canvas :ref="el => {setPreviewCanvasRef(el)}" :width=width :height=height class="AddLineCanvas preview" style="position: absolute; top:0; left:0;"></canvas>
  <!-- This loop goes over all the lines that exist and draws them on a canvas each. -->
  <div v-for="(line, index) in canvasLines" :key="index" class="AddLineCanvasWrapperDiv" style="position: absolute">
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

canvas {
  /* filter: blur(100); */
  image-rendering: crisp-edges;
}

</style>