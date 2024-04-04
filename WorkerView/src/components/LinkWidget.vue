<script setup>
import Panel from 'primevue/panel';
//define properties for the link items
const props = defineProps({
    url: String,
    name: String,
    activation: Date,
    expiration: Date,
})
//fullHeader = props.name +": https://localhost:8888/?token_id=" + props.url
</script>


<template>
    <!-- Panel with a header that can be toggled TODO: fix DOM issues to show url or name in header-->
  <Panel :header=url toggleable="true" collapsed="false">
  <div class="LinkItem">
    <!-- Values taken from properties -->
    <div class="ItemInfos">
      <p>Name: {{ name }}</p>
      <p>Link: https://localhost:8888/?token_id={{ url }}</p>
      <p>Created at: {{ activation }}</p>
      <p>Expires at: {{ expiration }}</p>
    </div>
  </div>
  </Panel>
</template>


<style scoped>


.LinkItem {
  background-color: #d2d4dd;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  transition: transform 0.3s ease;
  position: relative;
  display: block;
  gap: 0.5rem;
  width: 100%;
  min-width: 300px;
  height: 20%;
}

.LinkItem:hover {
  transform: scale(1.03);
}

.ItemInfos {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: top;
  text-align: left;
  gap: 0rem;
  padding-top: 0px;
}
</style>
