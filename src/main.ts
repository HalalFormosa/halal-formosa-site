import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "@/theme";

import router from './router'
import AOS from 'aos';
import "aos/dist/aos.css"

const app = createApp(App)

app.use(router)

app.mount('#app')

// Re-run AOS after Vue loads components
AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: false,
    offset: 300,  // 👈 Perfect for your layout
    anchorPlacement: 'top-bottom',
});

