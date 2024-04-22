<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
    <h2> Info </h2>
    <router-link :to="{ path: '/', query: { token: route.query.token } }">Go to Home</router-link>
</template>