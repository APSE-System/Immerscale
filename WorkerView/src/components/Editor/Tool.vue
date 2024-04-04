<script>
  import Button from 'primevue/button';
  const props = defineProps({
    toolName: String,
    iconName: String
  })

</script>

<template>
  <Button :label=toolName :icon=iconName rounded/>
</template>

<style scoped>

</style>