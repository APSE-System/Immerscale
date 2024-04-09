<script setup>
</script>

<!-- TODO fix Project name -->

<template>
    <div id="outer-sidebar">
        <div class="sidebar">
            <slot name="back"></slot>
            <h2 class="headline">Project {{ projectName }}</h2>
            <div class="button-box card flex justify-content-left">
                <slot name="main"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
#app{
    width: 100%;
}
#outer-sidebar{
    height: 100vh;
    width: 250px;
}
.button-box{
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: #37404c; */
    border-radius: 10px;
    padding: 10px;
    height: 150px;
    z-index: 1; 
    top: 50%;
    transform: translateY(-50%);
    left : 10px;
    width: 200px;
}
/* TODO make it flex with burger menu (maybe with primevue sidebar?)*/
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  background-color: lightgrey;
  z-index: 1;
}
@media (prefers-color-scheme: dark) {
    .sidebar{
        background-color: #23282e;
        /* background-color: transparent; */
    }
  }
</style>