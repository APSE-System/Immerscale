<script setup>
import {defineProps, watch} from 'vue';

// The properties of this component consist of a list of areas that should be displayed, and the width and the length of the canvas.
// current Mouse Position is for the preview and activeAreaPreview says whether the preview is rendered or not
const props = defineProps({
  canvasAreas: Array,
  width: Number,
  height: Number,
  currentMousePosition: Array,
  activeAreaPreview: Boolean,
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

function drawAreaPreview(canvas, area) {

  if(!props.activeAreaPreview) return;
    
  if((props.currentMousePosition[0] === 0) || (area == null) ){  
    return;
  }
  
  const ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Setting line width
  ctx.lineWidth = 5;

  // Setting line color for preview
  ctx.strokeStyle = "#ff8800";

  // Begin drawing the polygon
  ctx.beginPath();
  ctx.moveTo(area.points[0][0], area.points[0][1]);

  // Iterate to the point list of the area and connect them one after each other.
  for(let i = 1; i < area.points.length; i++) {
    ctx.lineTo(area.points[i][0], area.points[i][1]);
  }

  // connect to mouse
  ctx.lineTo(props.currentMousePosition[0], props.currentMousePosition[1]);

  // draws the outline
  ctx.stroke();   

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
  if (canvas === null)
    return
  drawArea(canvas, props.canvasAreas[index]); 
}

let previewCanvas;

function setPreviewCanvasRef(canvas) {
  if (canvas === null || props.canvasAreas == null) return;

  previewCanvas = canvas;
  
  // Draw preview line based on current mouse position
  drawAreaPreview(canvas, props.canvasAreas[props.canvasAreas.length-1]); 
}

// watch for deactivated preview
watch(() => props.activeAreaPreview, (newValue, oldValue) => {
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


  function displaySize(value, ctx, area) {
    if(value === 0) return;
      
    // Display the number in the center of the polygon
    const centerX = area.points.reduce((sum, point) => sum + point[0], 0) / area.points.length;
    const centerY = area.points.reduce((sum, point) => sum + point[1], 0) / area.points.length;
      
    ctx.fillStyle = 'white';
    ctx.font = '80px Arial';

    // add suffix
    value += " cm²"
      
    // Center the text horizontally and vertically
    const textWidth = ctx.measureText(value).width;
      
    ctx.fillText(value, centerX - textWidth / 2, centerY + 10);
  }
</script>


<template>
  <!-- this is the preview canvas -->
  <canvas :ref="el => {setPreviewCanvasRef(el)}" :width=width :height=height class="AddAreaPreviewCanvas"></canvas>

  <!-- Only draw the canvas for the last canvasArea (so the color within does not overlap) -->
  <!-- And for canvasAreas which have a following CanvasArea with the size of 0 (so multiple polygons can be displayed) -->
  <div v-for="(area, index) in canvasAreas" :key="index" class="AddAreaCanvasWrapperDiv">
  <canvas v-if="index === canvasAreas.length - 1 || (index < canvasAreas.length - 1 && canvasAreas[index + 1].size === 0)" 
          :ref="el => {setCanvasRef(el, index)} " 
          :width=width 
          :height=height 
          class="AddAreaCanvas">
  </canvas>
</div>
</template>


<style scoped>

.AddAreaCanvasWrapperDiv{
  position: absolute;
}

canvas {
  /* filter: blur(100); */
  image-rendering: crisp-edges;
}

</style>