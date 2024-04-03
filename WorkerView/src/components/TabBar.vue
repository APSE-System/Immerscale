<script setup>
    import { onMounted, ref } from "vue";
    import Button from 'primevue/button';
    // import Sidebar from 'primevue/sidebar';
    import { useRouter, useRoute } from 'vue-router'

    // get the router for routing to the project sub pages
    const router = useRouter()
    const route = useRoute()

    // this value is used to determine which button should be highlighted. This depends on which tab is selected.
    const primary = ref(0); 

    // As the tabs can be accessed directly via the URL, the path has to be checked which tab is selected to highlight the according button.
    onMounted(()=>{
        const pathSegments = route.path.split('/')
        switch (pathSegments[pathSegments.length - 1]) {
            case 'images': 
                primary.value = 1;
                break;
            case 'access': 
                primary.value = 2;
                break;
            case 'settings': 
                primary.value = 3;
                break;
        }
    })

</script>


<template>
    <div class="sidebar-box">
        <div class="sidebar card flex justify-content-left">
            <Button label="Bilder" @click="router.push('images'); primary = 1;" :class="['p-button-' + ((primary === 1) ? 'primary' : 'secondary')]"/>
            <Button label="Zugriffe" @click="router.push('access'); primary = 2;" :class="['p-button-' + ((primary === 2) ? 'primary' : 'secondary')]"/>
            <Button label="Projekteinstellungen" @click="router.push('settings'); primary = 3;" :class="['p-button-' + ((primary === 3) ? 'primary' : 'secondary')]"/>
        </div>
    </div>
</template>

<style scoped>
#app{
    width: 100%;
}

.sidebar{
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
.sidebar-box {
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: 230px;
  background-color: white;
  z-index: 1;
}
/* TODO make the sidebar-box span over the whole screen height */
@media (prefers-color-scheme: dark) {
    .sidebar-box{
        /* background-color: #23282e; */
        background-color: transparent;
    }
  }
.p-button{
    color: black;
    background-color: transparent;
}
@media (prefers-color-scheme: dark) {
    .p-button{
      color: white;
    }
  }

.p-button:hover{
    color: rgb(35, 115, 210);
}
</style>