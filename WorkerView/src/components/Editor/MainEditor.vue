<script setup>
import {onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import Button from "primevue/button";
import ToolLists from "./ToolLists.vue";
import Model from "./Logic/Model/Model.js";
import Controller from "./Logic/Controller.js";
import AddPointComponent from "./CommandComponents/AddPointComponent.vue";
import RectangleReferenceTool from "./Logic/Tools/RectangleReferenceTool.js";
import AddLineComponent from "./CommandComponents/AddLineComponent.vue";
import NumberInputPopup from "./Logic/Commands/NumberInputPopup.vue";

const router = useRouter();
const route = useRoute();
const image = ref([]);
var zoom_inner = ref(null);

let pos = {x: 0, y: 0};
let target = {x: 0, y: 0};
let pointer = {x: 0, y: 0};
let scale = 1;
const speed = 0.1;
// if true you can move around in the canvas
var dragging = false;
var start = {x: 0, y: 0};

// References to the measuring model, controller and tool list
let model = ref(new Model())
let controller = new Controller(model.value)
let toolsList = ref([])

let imgWidth = ref(0)
let imgHeight = ref(0)

//initialize tools
onMounted(()=>{
  // Create the rools and add them tot the list. THe callback is necessary so a tool can be selected correctly.
  let rectangleReferenceTool = new RectangleReferenceTool(model.value)
  rectangleReferenceTool.callback = controller.addTool(rectangleReferenceTool)
  toolsList.value.push(rectangleReferenceTool)
})

// fetch to get the images of the project
onMounted(() => {

  document.addEventListener('keydown', canvasBack);


  fetch(
      "http://" +
      import.meta.env.VITE_BACKEND_IP +
      "/workerView/image?id=" +
      route.params.id + "&index=" + route.params.index,
      {credentials: "include"}
  )
      .then((resp) => resp.json())
      .then((data) => {
        // extract the base64 images from the response and store them as dataURLs
        image.value = "data:image/png;base64," + data.image;

        drawImage();
      })
      .catch(function () {
        alert("Backend ist nicht errreichbar");
      });
});

// this will draw the image into the canvas
function drawImage() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  var img = new Image();
  img.src = image.value;

  img.onload = function () {
    // Adjust canvas size to image size
    canvas.width = img.width;
    canvas.height = img.height;

    imgWidth.value = img.width
    imgHeight.value = img.height

    ctx.drawImage(img, 0, 0);

  };
}

// original code from: https://blog.stackfindover.com/zoom-image-point-with-mouse-wheel
// mixed with: https://stackoverflow.com/questions/60190965/zoom-scale-at-mouse-position

// transforms the image
function setTransform() {
  zoom_inner.style.transform =
      "translate(" + pos.x + "px, " + pos.y + "px) scale(" + scale + ")";
  // zoom_inner.style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale},${scale})`;
}

onMounted(() => {
  zoom_inner = document.getElementById("zoom");
  var zoom_outer = document.getElementById("zoom-outer");

  // enabeling dragging the image
  zoom_outer.onmousedown = enableMovement;

  // this will enable the ability to move the picture inside of
  // the padding when the middle mouse button is pressed
  function enableMovement(e) {
    // check if the mouse wheel button is pressed
    if (e.button == 1) {
      e.preventDefault();
      start = {x: e.clientX - pos.x, y: e.clientY - pos.y};
      dragging = true;
    }
  }

  // stop the dragging if mouseUp
  zoom_outer.onmouseup = function (e) {
    dragging = false;
  };

  // also cancel the panning (grab of the picture)
  // if you are not in the inside the padding
  document.addEventListener("mousemove", function (e) {
    if (!zoom_outer.contains(e.target)) {
      dragging = false;
    }
  });

  // if the mouse-wheel-button is pressed
  // you can move your mouse to move around in the image
  zoom_outer.onmousemove = moveImage;

  // while panning is true mouse movement will move the picture
  function moveImage(e) {
    e.preventDefault();
    if (!dragging) {
      return;
    }
    pos.x = e.clientX - start.x;
    pos.y = e.clientY - start.y;
    setTransform();
  }

  // zoom into the picture
  zoom_outer.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();

        pointer.x = event.pageX - zoom_outer.offsetLeft;
        pointer.y = event.pageY - zoom_outer.offsetTop;
        target.x = (pointer.x - pos.x) / scale;
        target.y = (pointer.y - pos.y) / scale;

        scale += -1 * Math.max(-1, Math.min(1, event.deltaY)) * speed * scale;

        pos.x = -target.x * scale + pointer.x;
        pos.y = -target.y * scale + pointer.y;

        setTransform();
      },
      {passive: false}
  );
});


// When the canvas is clicked, the coordinates of the click have to be calculated. 
// As we are dealing with a zoom here, we must map the screen coordinates to the image coordinates again.
function canvasClicked(event) {
  // These coordinates are relative to the canvas size.
  const rect = event.target.getBoundingClientRect()
  const x_canv = event.clientX - rect.left
  const y_canv = event.clientY - rect.top

  var img = new Image();
  img.src = image.value;

  // By taking the ratio between the relative coordinates and the canvas, we can map them to the image size.
  const x = (x_canv / rect.width) * img.width;
  const y = (y_canv / rect.height) * img.height;

  // The controller will redirect the click to the according tool.
  controller.onClick(x,y);
}

// This function handles the undo and redo keyboard events and delegates them to the controller.
function canvasBack(event){
  if (event.ctrlKey && (event.key === 'z' || event.keyCode === 'Z')) {
    controller.undo()
  }
  else if(event.ctrlKey && (event.key === 'y' || event.key === 'Y')){
    controller.redo()
  }

}

</script>

<template>
  <div class="editor">
    <div class="flex justify-content-left left-bar">
      <Button
          @click="router.push('/project/' + route.params.id + '/images')"
          label="← Images"
          id="back-button"
      />
      <ToolLists :tools="toolsList" class="toolList"/>
    </div>


    <div id="zoom-outer">
      <div ref="zoom_inner" class="zoom" id="zoom">
        <canvas v-if="imgWidth > 0 && imgHeight > 0" id="clickListenerCanvas" @click="canvasClicked($event)"  :width="imgWidth" :height="imgHeight"></canvas>
        <!-- Component which displayes all the points in the model -->
        <AddPointComponent v-if="imgWidth > 0 && imgHeight > 0 " :canvas-points="model.canvasPoints" :width="imgWidth" :height="imgHeight"></AddPointComponent>
        <!-- Component which displayes all the lines in the model -->
        <AddLineComponent v-if="imgWidth > 0 && imgHeight > 0 " :canvasLines="model.canvasLines" :width="imgWidth" :height="imgHeight"></AddLineComponent>
        <canvas ref="canvas" id="canvas" ></canvas>
      </div>
    </div>

    <!-- This component can open a popup to retreive user input -->
    <NumberInputPopup :popup="model.popup" @callback="model.popup.callback"/>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
}

.left-bar {
  position: absolute;
  left: 2%;
  width: 15%;
}


#zoom-outer {
  width: 40%;
  height: auto;
  background: #3a3838;
  overflow: hidden;
  margin: auto;
}

#zoom {
  width: 100%;
  height: auto;
  transform-origin: 0 0;
  transform: scale(1) translate(0px, 0px);
  /* margin: auto; */
}

#our-image {
  width: 100%;
  height: auto;
}

#canvas {
  width: 100%;
  height: auto;
}

#clickListenerCanvas{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 42069;
}

#back-button {
  position: absolute;
  top: 5px;
}

.toolList{
  position: absolute;
  top: 100px;
}
</style>
