import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';

import './main.css';

import AppContainer from './components/AppContainer.vue';

import ToastService from 'primevue/toastservice';

import PrimeVue from 'primevue/config';

import Ripple from 'primevue/ripple';

import { createApp } from 'vue';

createApp(AppContainer)
    .use(ToastService)
    .use(PrimeVue, { ripple: true })
    .directive('ripple', Ripple)
    .mount('#app');