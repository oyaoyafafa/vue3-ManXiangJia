import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'



import { List, PullRefresh, Image as VanImage, Lazyload ,Icon ,Tab, Tabs, IndexBar, IndexAnchor,Loading, Swipe, SwipeItem,Search, Checkbox, CheckboxGroup,Toast,Popup,Collapse, CollapseItem ,Sticky ,Card,Stepper  ,SwipeCell  ,SubmitBar  } from 'vant';

import {BackTop  } from 'vant';
import { VueMasonryPlugin } from 'vue-masonry';
import 'swiper/dist/css/swiper.min.css';


const app = createApp(App)
// vant组件引入
app.use(List).use(PullRefresh).use(VanImage).use(Icon ).use(Tab ).use(Tabs ).use(IndexBar ).use(IndexAnchor ).use(Loading ).use(Swipe ).use(SwipeItem ).use(Search ).use(Checkbox).use(CheckboxGroup).use(Toast).use(Sticky ).use(BackTop).use(Card).use(Stepper ).use(SwipeCell).use(SubmitBar)

app.use(Lazyload, {
    lazyComponent: true,
}).use(Popup).use(Collapse).use(CollapseItem)

app.use(VueMasonryPlugin)

app.use(createPinia())
app.use(router)
// app.use(LazyImg).use(Waterfall)

// app.use(waterfall)
app.mount('#app')


