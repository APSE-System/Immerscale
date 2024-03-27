<script setup>
import Panel from 'primevue/panel';
//define properties for the link items
const props = defineProps({
    url: String,
    name: String,
    activation: Date,
    expiration: Date,
})


</script>


<template>
    <!-- Panel with a header that can be toggled TODO: fix DOM issues to show url or name in header-->
  <Panel header="Header" toggleable="true" collapsed="false">
  <div class="LinkItem">
    <!-- Values taken from properties -->
    <div class="ItemInfos">
      <p>{{ url }}</p>
      <p>Name: {{ name }}</p>
      <p>Created at: {{ activation }}</p>
      <p>Expires at: {{ expiration }}</p>
    </div>
  </div>
  </Panel>
</template>


<style scoped>
.LinkItem {
  background-color: #7a7d92;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.LinkItem:hover {
  transform: scale(1.03);
}

.ItemInfos {
  display: flex;
  flex-direction: column;
  gap: 0rem;
}
</style>
