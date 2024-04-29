<script setup>

import {defineProps} from 'vue';

// The properties of this component consist of a list of points that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasGrid: Array,
  gridTool: Object,
  gridWidth: Number,
  gridHeight: Number,
  width: Number,
  height: Number
});

// This function draws the vertical lines of the grid
function drawVerticalLines(canvas, point, index) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // setting the color of the point
  ctx.strokeStyle = "#" + point.color
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  // Connects the current point with the according point on the opposite side of the grid
  ctx.lineTo(props.canvasGrid[index + props.gridWidth * (props.gridWidth + 1) - (props.gridWidth - 1) * (props.gridWidth - 1)].x, props.canvasGrid[index + props.gridWidth * (props.gridWidth + 1) - (props.gridWidth - 1) * (props.gridWidth - 1)].y);

  ctx.stroke()
}

// This function draws the horizontal lines of the grid
function drawHorizontalLines(canvas, point, index) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // setting the color of the point
  ctx.strokeStyle = "#" + point.color
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  // Connects the point with the according point on the opposite side of the grid. Check the AddGridCommand for the logic how the grid points are calculated.
  if (index === 0) {
    ctx.lineTo(props.canvasGrid[index + props.gridWidth].x, props.canvasGrid[index + props.gridWidth].y);
  } else if(index === props.canvasGrid.length - 1) {
    ctx.lineTo(props.canvasGrid[props.canvasGrid.length+ - props.gridWidth].x, props.canvasGrid[props.canvasGrid.length - props.gridWidth].y);
  }
  else
  {
    ctx.lineTo(props.canvasGrid[index - 1].x, props.canvasGrid[index - 1].y);
  }
  ctx.stroke()

  // Draw Center Point (which is used to drag and drop the grid)
  ctx.fillStyle = "#00FF00";
  ctx.beginPath();
  // Drawing a circle at the coordinates of the point.
  ctx.arc(props.gridTool._xPos, props.gridTool._yPos, 20, 0, 2 * Math.PI);
  ctx.fill();
}

// This function checks if the canvas even exists before handing the according point to the drawing function.
function setCanvasRefVert(canvas, index) {
  if (canvas === null)
    return

  if (index < props.gridWidth + 1) {
    drawVerticalLines(canvas, props.canvasGrid[index], index);
  }
}


// This function checks if the canvas even exists before handing the according point to the drawing function.
function setCanvasRefHor(canvas, index) {
  if (canvas === null)
    return

  if (index === 0) {
    drawHorizontalLines(canvas, props.canvasGrid[index], index);
  }else if (index=== props.canvasGrid.length - 1) {
    drawHorizontalLines(canvas, props.canvasGrid[index], index);
  } else if (index <= props.canvasGrid.length - props.gridWidth && (index - props.gridWidth) % 2 === 0) {
    drawHorizontalLines(canvas, props.canvasGrid[index], index);
  }
}

</script>

<template>
  <!-- This loop goes over all the points that exist and draws them on a canvas each. -->
  <div v-for="(point, index) in canvasGrid" :key="index" class="AddGridCanvasWrapperDiv">
    <canvas :ref="el => {setCanvasRefVert(el, index)} " :width=width :height=height class="AddGridCanvas"></canvas>
  </div><div v-for="(point, index) in canvasGrid" :key="index" class="AddGridCanvasWrapperDiv" >
    <canvas :ref="el => {setCanvasRefHor(el, index)} " :width=width :height=height class="AddGridCanvas"></canvas>
  </div>

</template>


<style scoped>

.AddGridCanvasWrapperDiv{
  position: absolute;
  height: 100%;
}

.AddGridCanvas {
  max-width: 100%;
  max-height: 100vh;
}

canvas {
  /* filter: blur(100); */
  image-rendering: crisp-edges;
}

</style>