<script setup>
import Panel from 'primevue/panel';
import ToggleButton from 'primevue/togglebutton';
import Toast from 'primevue/toast';
import {useToast} from 'primevue/usetoast';
import { ref } from 'vue';

const checked = ref(false);
const toast = useToast();

//define properties for the link items
const props = defineProps({
    url: String,
    name: String,
    creation: Date,
    expiration: Date
})

function copy() {
    navigator.clipboard.writeText("https://localhost:8888/?token=" + props.url)
    toast.add({severity:'success', summary:'Copied', detail:'Link copied to clipboard', life: 3000});
}

</script>


<template>
  <Toast/>
    <!-- Panel with a header that can be toggled TODO: fix DOM issues to show url or name in header-->
  <Panel :header=url toggleable :collapsed=true>

    <template #header>
      <div class="HeaderClass">
        <span><b>{{ name }}</b>{{": https://localhost:8888/?token=" + url }}</span>
      </div>
    </template>
    <template #icons>
        <ToggleButton class="p-panel-header-icon p-link mr-2" v-on:click="disabled = true" v-model="checked" @click="copy" onIcon="pi pi-check" offIcon="pi pi-copy" onLabel="" offLabel="">
              <span class="pi pi-copy"></span>
        </ToggleButton>
    </template>

    <template #footer>
      <div class="LinkItem">
        <!-- Values taken from properties -->
        <div class="ItemInfos">
          <p>{{"Name: " + name }}</p>
          <p>{{"Link: https://localhost:8888/?token_id=" + url }}</p>
          <!--Dates are given in YYYY-MM-DD, hence why the substring stuff here-->
          <p v-if="creation">{{"Created at: " + creation.substring(8,10)+"."+creation.substring(5,7)+"."+creation.substring(0,4) +" at "+ creation.substring(11,16)}}</p>
          <p v-if="expiration">{{"Expires at: " +expiration.substring(8,10)+"."+expiration.substring(5,7)+"."+expiration.substring(0,4) +" at "+ expiration.substring(11,16)}}</p>
        </div>
      </div>
    </template>
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
  height: fit-content;
}
.HeaderClass {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: top;
  gap: 0.5rem;
  padding-top: 0px;
  width: 600px;
  
}

.Panel {
  width: 300px!important;
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

.pi-check {
  color: green;
}
</style>
