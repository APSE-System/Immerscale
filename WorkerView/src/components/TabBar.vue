<script setup>
    import Button from 'primevue/button';
    import { useRouter } from 'vue-router'

    // get the router for routing to the project sub pages
    const router = useRouter()

</script>


<template>
    <div class="sidebar card flex justify-content-left">
        <Button label="Bilder" @click="router.push('images')"/>
        <Button label="Zugriffe" @click="router.push('access')"/>
        <Button label="Projekteinstellungen" @click="router.push('settings')"/>
    </div>
</template>

<style scoped>
#app{
    width: 100%;
}

.sidebar{
    flex-direction: column;
    justify-content: space-between;
    background-color: #37404c;
    border-radius: 10px;
    padding: 10px;
    height: 150px;
}
</style>