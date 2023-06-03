import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt';
 
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'popper.js/dist/popper.js';

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(store).use(router).mount('#app');
