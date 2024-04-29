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

  displayLength(label.length, ctx, label);
}

// This checks if the canvas even exists before giving the according area to the drawing function.
function setCanvasRef(canvas, index) {
  if (canvas === null)
    return
  console.log('index ' + index + ' ' + props.canvasLabels[index])
  drawLabel(canvas, props.canvasLabels[index]); // changed to 0
}

function displayLength(value, ctx, label) {
    if(value === 0) return;
          
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
      <canvas :ref="el => {setCanvasRef(el, index)} "  :width=width :height=height class="AddLabelCanvas"></canvas>
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