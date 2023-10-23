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
import App from "./components/App.vue";
import FileUpload from "primevue/fileupload";
import Listbox from "primevue/listbox";
import Divider from "primevue/divider";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
import ProgressBar from "primevue/progressbar";

const app = createApp(App);
app.use(PrimeVue)
app.use(ToastService)
app.component('FileUpload',FileUpload)
app.component('ListBox', Listbox)
app.component('Divider', Divider)
app.component('Button', Button)
app.component('SelectButton', SelectButton)
app.component('ProgressBar', ProgressBar)
app.mount('#app')
/*
createApp(AppContainer)
    .use(ToastService)
    .use(PrimeVue, { ripple: true })
    .directive('ripple', Ripple)
    .mount('#app');*/
