<script setup>
import {defineProps} from 'vue';

// The properties of this component consist of a list of areas that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasAreas: Array,
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
  ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
  // Begin drawing the polygon
  ctx.beginPath();
  ctx.moveTo(area.points[0][0], area.points[0][1]);

  // Iterate to the point list of the area and connect them one after each other.
  for(let i = 1; i < area.points.length; i++) {
    ctx.lineTo(area.points[i][0], area.points[i][1]);
  }

  // TODO change this later
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Close the path
  ctx.closePath();

  // Fill the polygon with the specified color
  ctx.fill();

  // draws the outline
  ctx.stroke();   
  
  // measure shape
  measureShape(ctx, area);
}

// This checks if the canvas even exists before giving the according area to the drawing function.
function setCanvasRef(canvas, index) {
  console.log('index ' + index)
  if (canvas === null)
    return
  drawArea(canvas, props.canvasAreas[index]); // changed to 0
}

// Formel von: https://mathe-vital.de/LinAlg1/18-4.html
function measureShape(ctx, area) {
  if(area.points.length <= 0) return;
      
  let result = 0;
      
  for(let i = 0; i < area.points.length - 1; i++) {
    result += det(area.points[i], area.points[i+1])
  }
      
  result += det(area.points[area.points.length - 1], area.points[0])
      
  result *= 0.5;
  result = Math.abs(Math.round( (result)*100)/100    );
  console.log('the result is: ' + result);
  displayMeasure(result, ctx, area);
      
  }
      
  // this can be done with the math utils?
  function det(p1, p2) {
    return (p1[0] * p2[1]) - (p2[0] * p1[1]);
  }    

  function displayMeasure(value, ctx, area) {
    if(value === 0) return;
      
    // Display the number in the center of the polygon
    const centerX = area.points.reduce((sum, point) => sum + point[0], 0) / area.points.length;
    const centerY = area.points.reduce((sum, point) => sum + point[1], 0) / area.points.length;
      
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
      
    // Center the text horizontally and vertically
    const textWidth = ctx.measureText(value).width;
      
    // TODO
    value += "px²"

    ctx.fillText(value, centerX - textWidth / 2, centerY + 10);
  }
</script>


<template>
  <!-- This loop goes over all the lines that exist and draws them on a canvas each. -->
  <!-- <div v-for="(area, index) in canvasAreas" :key="index" class="AddAreaCanvasWrapperDiv" style="position: absolute">
    <canvas :ref="el => {setCanvasRef(el, index)} " :width=width :height=height class="AddAreaCanvas"></canvas>
  </div> -->

  <!-- Only draw the canvas for the last canvasArea (so the color within does not overlap) -->
  <div v-for="(area, index) in canvasAreas" :key="index" class="AddAreaCanvasWrapperDiv" style="position: absolute">
    <canvas v-if="index === canvasAreas.length - 1" :ref="el => {setCanvasRef(el, index)} " :width=width :height=height class="AddAreaCanvas"></canvas>
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