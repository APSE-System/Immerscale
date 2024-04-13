<script setup>
import {defineProps} from 'vue';

// The properties of this component consist of a list of labels that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasLabels: Array,
  width: Number,
  height: Number
});

// This function draws the given area on the given canvas.
function drawLabel(canvas, label) {
  console.log(label.length)
  const ctx = canvas.getContext('2d');
  // Setting line width
  //ctx.lineWidth = 5;
  // Setting line color
  //ctx.strokeStyle = "#" + area.color;

  //var rgbColor = hexToRgb("#" + area.color)
  // Set fill color to red
  //ctx.fillStyle = 'rgba('+ rgbColor.r +', '+ rgbColor.g +', '+ rgbColor.b +', 0.1)';
  // Begin drawing the polygon
  //ctx.beginPath();
  //ctx.moveTo(area.points[0][0], area.points[0][1]);

  // Iterate to the point list of the area and connect them one after each other.
  //for(let i = 1; i < area.points.length; i++) {
  //  ctx.lineTo(area.points[i][0], area.points[i][1]);
  //}

  // TODO change this later
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Close the path
  //ctx.closePath();
  // Fill the polygon with the specified color
  //ctx.fill();
  // draws the outline
  //ctx.stroke();   
  // display the size
  displaySize(label.length, ctx, label);
}

// This checks if the canvas even exists before giving the according area to the drawing function.
function setCanvasRef(canvas, index) {
  console.log('index ' + index + ' ' + props.canvasLabels[index].length)
  console.log(props.canvasLabels[index].x)
  console.log(props.canvasLabels[index].y)
  if (canvas === null)
    return
  drawLabel(canvas, props.canvasLabels[index]); // changed to 0
}

function displaySize(value, ctx, label) {
    if(value === 0) return;
    console.log(value)
          
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
      
    // Center the text horizontally and vertically
    const textWidth = ctx.measureText(value).width;
    
    value += " cm"

    ctx.fillText(value, label.x - textWidth / 2, label.y + 30);
}

</script>

<template>
    <!-- This loop goes over all the labels that exist and draws them on a canvas each. -->
    <div v-for="(label, index) in canvasLabels" :key="index" class="AddLabelCanvasWrapperDiv" style="position: absolute">
        <canvas v-if="index === canvasLabels.length - 1" :ref="el => {setCanvasRef(el, index)} "  :width=width :height=height class="AddLabelCanvas"></canvas>
  </div>

</template>

<style scoped>
.AddLabelCanvasWrapperDiv {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
}

.AddLabelCanvas {
    width: 100%;
    height: auto;
    left: 0;
    right: 0;
}
</style>