import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';

import './main.css';

import App from './components/App.vue';

import PrimeVue from 'primevue/config';

import Ripple from 'primevue/ripple';

import { createApp } from 'vue';

createApp(App)
    .use(PrimeVue, { ripple: true })
    .directive('ripple', Ripple)
    .mount('#app');