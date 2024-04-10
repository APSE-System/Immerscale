<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import {onMounted, ref} from "vue";
import { defineProps } from 'vue';
import ReferenceTool from "./Logic/ReferenceTool.js";
import MeasurementTool from "./Logic/MeasurementTool.js"
import PanelMenu from 'primevue/panelmenu';

const props = defineProps({
  tools: Array
})

const toolTree = ref([
  {
    icon:"pi pi-sliders-h",
    label: 'Reference Tools',
    items: []
  },
  {
    icon:"pi pi-pencil",
    label: 'Measuring Tools',
    items: []
  }
])


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

onMounted(() => {
  fillToolTree()
})

</script>


    
<template>
    <div class="card flex justify-content-center">
        <PanelMenu :model="toolTree" class="w-full md:w-20rem" />
    </div>
</template>

<style scoped>



</style>