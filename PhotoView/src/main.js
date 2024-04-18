import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import ToastService from 'primevue/toastservice';

createApp(App).use(PrimeVue).use(ToastService).mount('#app')

