import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/aura-light-blue/theme.css'
import '/node_modules/primeflex/primeflex.css'

createApp(App).use(router).use(PrimeVue).use(ToastService).directive('tooltip', Tooltip).mount('#app');
