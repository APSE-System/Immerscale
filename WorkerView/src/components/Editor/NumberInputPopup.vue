<script setup>
import {onMounted, ref, defineProps} from "vue";
import InputNumber from 'primevue/inputnumber';
import Dialog from "primevue/dialog";
import Button from "primevue/button";


const visible = ref(true);

const props = defineProps({
  header: String,
  description: String,
  valueName: String
})


</script>

<template>
  <div class="card flex justify-content-center">

    <Dialog v-model:visible="visible" modal :header="header" :closable="false" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-3">{{ description }}</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="name" class="font-semibold w-6rem">{{ valueName }}</label>
        <InputNumber id="name" class="flex-auto" autocomplete="off" locale="de-DE" mode="decimal" :minFractionDigits="2" :useGrouping="false" />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Save" @click="visible = false; console.log('value set'); "></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>

