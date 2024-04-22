<script setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import Camera from "./Camera.vue"
import Popup from "./Popup.vue"

const route = useRoute();
const projectName = ref("");
</script>

<template>
  <Camera />
  <Popup />
</template>
