<script setup>
import {watch, ref, defineProps} from "vue";
import InputNumber from 'primevue/inputnumber';
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const emit = defineEmits(['callback']);

const props = defineProps({
  popup: Object
})


</script>

<template>
  <div class="card flex justify-content-center">

    <Dialog v-model:visible="popup.visible" modal :header="popup.header" :closable="false" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-3">{{ popup.description }}</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="name" class="font-semibold w-6rem">{{ popup.value }}</label>
        <InputNumber id="name" class="flex-auto" autocomplete="off" locale="de-DE" mode="decimal" :minFractionDigits="2" :useGrouping="false" v-model="numberValue"/>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Save" @click="popup.visible = false; emit('callback', numberValue); numberValue=null;"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>

