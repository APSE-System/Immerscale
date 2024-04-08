<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { ref } from "vue";
import { defineProps } from 'vue';
import ReferenceTool from "./Logic/ReferenceTool.js";
import MeasurementTool from "./Logic/MeasurementTool.js"

const props = defineProps({
  tools: Array
})




</script>


    
<template>
    <div class="card">
        <Accordion :activeIndex="0">
            <AccordionTab header="Reference Tools">
                <p class="m-0" v-for="element in tools.filter(tool => tool instanceof ReferenceTool)">
                  <button @click="element.callback"> {{element._name}}</button>
                </p>
            </AccordionTab>
            <AccordionTab header="Measuring Tools">
              <p class="m-0" v-for="element in tools.filter(tool => tool instanceof MeasurementTool)">
                <button @click="element.callback"> {{element._name}}</button>
              </p>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<style scoped>



</style>