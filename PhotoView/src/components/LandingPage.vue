<!-- LandingPage -->

<script setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";

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
  <!-- this site only redirects you to the appropriate page (main or info) -->
</template>
