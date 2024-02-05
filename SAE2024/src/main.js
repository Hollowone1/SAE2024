
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { LMap, LTileLayer, LMarker } from 'leaflet';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('l-map', LMap);
app.component('l-tile-layer', LTileLayer);
app.component('l-marker', LMarker);


app.use(createPinia())
app.use(router)

app.mount('#app')
