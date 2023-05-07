import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'

// Axios setting to pass cookie each request (Authorization)
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // What should be done if unauthorized
        alert("Unauthorized access: 401")
    }
    if (error.response.status === 403) {
        // What should be done if forbidden
        alert("Forbidden access: 403")
    }
    return error;
});

import App from './App.vue'
import router from './router'

// Global css
import './assets/main.css'

// Vuetify css
import 'vuetify/styles'
// Material Design Icons css
import '@mdi/font/css/materialdesignicons.css'
// FontAwesome Icons css
import '@fortawesome/fontawesome-free/css/all.css'

// Vuetify Setup
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark'
    },
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
            mdi,
        }
    },
    components,
    directives,
})

// App instance
const app = createApp(App)

// Use Vuetify
app.use(vuetify)

// Use Pinia
app.use(createPinia())

// Use VueRouter
app.use(router)


app.mount('#app')
