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

  var rgbColor = hexToRgb("#" + area.color)
  // Set fill color to red
  ctx.fillStyle = 'rgba('+ rgbColor.r +', '+ rgbColor.g +', '+ rgbColor.b +', 0.1)';
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
  
  // display the size
  displaySize(area.size, ctx, area);
}

// Transforms a hex color into a rgb color
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// This checks if the canvas even exists before giving the according area to the drawing function.
function setCanvasRef(canvas, index) {
  console.log('index ' + index)
  if (canvas === null)
    return
  drawArea(canvas, props.canvasAreas[index]); // changed to 0
}


  function displaySize(value, ctx, area) {
    if(value === 0) return;
      
    // Display the number in the center of the polygon
    const centerX = area.points.reduce((sum, point) => sum + point[0], 0) / area.points.length;
    const centerY = area.points.reduce((sum, point) => sum + point[1], 0) / area.points.length;
      
    ctx.fillStyle = 'white';
    ctx.font = '100px Arial';
      
    // Center the text horizontally and vertically
    const textWidth = ctx.measureText(value).width;
      
    // TODO
    value += " cm²"

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