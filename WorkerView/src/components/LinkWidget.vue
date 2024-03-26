<script setup>

//define properties for the project items
const props = defineProps({
    url: String,
    name: String,
    activation: Date,
    expiration: Date,
})


</script>


<template>
  <!-- TODO: Fix this more elegantly. Empty Div workaround to show project Items -->
  <div></div>
  <div class="LinkItem">
    <!-- Values taken from properties -->
    <div class urlItemInfos>
      <p>{{ url }}</p>
    </div>
    <div class="CreationInfos">

      <p>Name: {{ name }}</p>
      <p>Created at: {{ activation }}</p>
      <p>Expires at: {{ expiration }}</p>
    </div>
  </div>
</template>


<style scoped>
.LinkItem {
  background-color: #7a7d92;
  padding: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 100%;
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
