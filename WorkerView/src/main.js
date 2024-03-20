import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import '/node_modules/primeflex/primeflex.css'

//import 'primevue/resources/primevue.min.css'

const app = createApp(App)
app.mount('#app')
app.use(PrimeVue);