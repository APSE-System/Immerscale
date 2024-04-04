<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { ref } from "vue";
import Tool from "./Tool.vue";

let referenceTools = ref([
  {
    "toolName": "benisSelect",
    "iconName": "ppi pi-check"
  },
  {
    "toolName": "bibibubu",
    "iconName": "ppi pi-check"
  }
])

let measuringTools = ref([
  {
    "toolName": "benisMeasure",
    "iconName": "ppi pi-check"
  },
  {
    "toolName": "schenkel",
    "iconName": "ppi pi-check"
  }
])



</script>


    
<template>
    <div class="card">
        <Accordion :activeIndex="0">
            <AccordionTab header="Reference Tools">
                <p class="m-0" v-for="element in referenceTools">
                  <Tool :tool-name="element.toolName" :icon-name="element.iconName"></Tool>
                </p>
            </AccordionTab>
            <AccordionTab header="Measuring Tools">
                <p class="m-0">
                  <p class="m-0" v-for="element in measuringTools">
                    <Tool :tool-name="element.toolName" :icon-name="element.iconName"></Tool>
                  </p>
                </p>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<style scoped>



</style>