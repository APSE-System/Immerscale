<script setup>
import Sidebar from 'primevue/sidebar';
import Button from "primevue/button";

import { ref } from "vue";

const visibleRight = ref(false);
</script>

<template>
    <div class="card flex justify-content-center">
        <Sidebar v-model:visible="visibleRight" header="How to use the Editor" position="right">
            <p>Benis Message</p>
        </Sidebar>
    </div>
    <Button icon="pi pi-question-circle" @click="visibleRight = true" />
</template>