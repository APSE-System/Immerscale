<script setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import Camera from "./Camera.vue"
import Popup from "./Popup.vue"

const route = useRoute();
const router = useRouter();

// this is false for the first visit
let redirected = localStorage.getItem('redirected') === 'true';

onMounted(() => {
    if(redirected) {
      router.push({ path: '/main', query: {token: route.query.token} });
      return;
    }

    localStorage.setItem('redirected', 'true');
    router.push({ path: '/info', query: {token: route.query.token} });
})
</script>

<template>

</template>
