<script setup>

    import Button from 'primevue/button';

</script>


<template>
    <div class="sidebar card flex justify-content-left">
        <Button label="Bilder" />
        <Button label="Zugriffe" />
        <Button label="Projekteinstellungen" />
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