<script setup>
import {onMounted, ref, watch} from "vue";
import { defineProps } from 'vue';
import ReferenceTool from "./Logic/ReferenceTool.js";
import MeasurementTool from "./Logic/MeasurementTool.js"
import PanelMenu from 'primevue/panelmenu';
import LordImmerScaler from "./Logic/LordImmerScaler.js";

const props = defineProps({
  tools: Array
})

const toolTree = ref([
  {
    key: '0',
    icon:"pi pi-sliders-h",
    label: 'Reference Tools',
    items: []
  },
  {
    key: '1',
    icon:"pi pi-pencil",
    label: 'Measuring Tools',
    disabled: true,
    items: []
  }
])

const expandedKeys = ref({})

//push tools into the tree structure with for loop
function fillToolTree() {
  console.log("Adding tools to the tree")
  for (let i = 0; i < props.tools.length; i++) {
    if (props.tools[i] instanceof ReferenceTool) {
      console.log("ReferenceTool added to tree")
      toolTree.value[0].items.push({
        label: props.tools[i]._name,
        command: props.tools[i].callback,
        icon: props.tools[i]._icon
      })
    } else if (props.tools[i] instanceof MeasurementTool) {
      console.log("MeasurementTool added to tree")
      toolTree.value[1].items.push({
        label: props.tools[i]._name,
        command: props.tools[i].callback,
        icon: props.tools[i]._icon
      })
    }
  }
}

//use this function to enable a tool in the tree
function enableTool(index) {
  toolTree.value[index].disabled = false
}

//use this function to collapse a tool in the sidebar tree
function collapseTool(key) {
  expandedKeys.value = {[key]: false};
}

//use this function to expand a tool in the sidebar tree
function expandTool(key) {
  expandedKeys.value = {[key]: true};
}

//call this function to enable and automatically expand the measurement tools while collapsing the reference tools
function referenceSelected() {
  enableTool(1);
  collapseTool(0);
  expandTool(1);
}

document.addEventListener("referenceSet", function (e) {
  console.log("Event Listener hier")
  if(e.detail)
    referenceSelected();
});

onMounted(() => {
  fillToolTree()
})

</script>


    
<template>
    <div class="card flex justify-content-center">
        <PanelMenu :model="toolTree" v-model:expandedKeys="expandedKeys" class="w-full md:w-20rem" />
    </div>
</template>

<style scoped>



</style>