<script setup>
import {defineProps} from 'vue';

// The properties of this component consist of a list of labels that should be displayed, and the width and the length of the canvas.
const props = defineProps({
  canvasLabels: Array,
  width: Number,
  height: Number
});

function drawLabel(canvas, label) {
  const ctx = canvas.getContext('2d');
  // setting the color of the label
  ctx.fillStyle = "#" + label.color;
  ctx.font = "30px Arial";
  // Drawing the label at the coordinates of the label.
  ctx.fillText(label.text, label.x, label.y);
}

function setCanvasRef(canvas, index) {
  if (canvas === null)
    return
  drawLabel(canvas, props.canvasLabels[index]);
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