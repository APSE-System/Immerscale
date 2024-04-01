<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Camera from './components/Camera.vue';
import Popup from './components/Popup.vue';

const alpha = ref(0); // Rotation around the z-axis
const beta = ref(0);  // Rotation around the x-axis
const gamma = ref(0); // Rotation around the y-axis

// Function to handle the device orientation event
const handleOrientation = (event) => {
  alpha.value = event.alpha;
  beta.value = event.beta;
  gamma.value = event.gamma;
};

onMounted(() => {
  // Request permission for iOS 13+
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    }).catch(console.error);
  } else {
    // Automatically start listening on devices that don't require permission
    window.addEventListener('deviceorientation', handleOrientation, true);
  }
});

onUnmounted(() => {
  window.removeEventListener('deviceorientation', handleOrientation, true);
});
</script>


<template>
  <h2>Benis</h2>
  <div>
    <Camera/>
    <Popup/>
    <div class="orientation-overlay">
      X: {{ beta }}<br>
      Y: {{ gamma }}<br>
      Z: {{ alpha }}
    </div>
  </div>
</template>

<style>
.orientation-overlay {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
}
</style>
