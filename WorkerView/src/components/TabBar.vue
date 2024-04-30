<script setup>
</script>

<!-- The sidebar component is used to display the tab bar and the selected tab. -->
<template>
  <div id="outer-sidebar">
    <div class="sidebar">
      <slot name="back"></slot>
      <div class="button-box card flex justify-content-left">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
}
#outer-sidebar {
  height: 100vh;
  width: 250px;
}
.button-box {
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
  height: 150px;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  width: 200px;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  background-color: lightgray;
  z-index: 1;
}
@media (prefers-color-scheme: dark) {
  .sidebar {
    background-color: #23282e;
  }
}
</style>
