import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple'

import 'primevue/resources/themes/aura-light-blue/theme.css'
import '/node_modules/primeflex/primeflex.css'

createApp(App).use(router).use(PrimeVue, { ripple: true}).use(ToastService).directive('tooltip', Tooltip).directive('ripple', Ripple).mount('#app');
