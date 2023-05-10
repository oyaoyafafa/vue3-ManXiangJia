import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
// import waterfall from 'vue-waterfall2'

import { List, PullRefresh, Image as VanImage, Lazyload ,Icon ,Tab, Tabs } from 'vant';
import { VueMasonryPlugin } from 'vue-masonry';


const app = createApp(App)
app.use(VueMasonryPlugin)

app.use(createPinia())
app.use(router)
// app.use(waterfall)
app.mount('#app')

// vant组件引入
app.use(List).use(PullRefresh).use(VanImage).use(Icon ).use(Tab ).use(Tabs )
app.use(Lazyload, {
    lazyComponent: true,
});