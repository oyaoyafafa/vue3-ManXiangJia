import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'


<<<<<<< HEAD
import { List, PullRefresh, Image as VanImage, Lazyload ,Icon ,Tab, Tabs, IndexBar, IndexAnchor,Loading, Swipe, SwipeItem,Search, Checkbox, CheckboxGroup   } from 'vant';
=======
import { List, PullRefresh, Image as VanImage, Lazyload ,Icon ,Tab, Tabs, IndexBar, IndexAnchor,Loading, Swipe, SwipeItem,Search  ,Sticky  } from 'vant';
>>>>>>> dev-lzs
import { VueMasonryPlugin } from 'vue-masonry';
import 'swiper/dist/css/swiper.min.css';


const app = createApp(App)
app.use(VueMasonryPlugin)

app.use(createPinia())
app.use(router)
// app.use(LazyImg).use(Waterfall)

// app.use(waterfall)
app.mount('#app')


// vant组件引入
<<<<<<< HEAD
app.use(List).use(PullRefresh).use(VanImage).use(Icon ).use(Tab ).use(Tabs ).use(IndexBar ).use(IndexAnchor ).use(Loading ).use(Swipe ).use(SwipeItem ).use(Search ).use(Checkbox).use(CheckboxGroup);
=======
app.use(List).use(PullRefresh).use(VanImage).use(Icon ).use(Tab ).use(Tabs ).use(IndexBar ).use(IndexAnchor ).use(Loading ).use(Swipe ).use(SwipeItem ).use(Search ).use(Sticky )
>>>>>>> dev-lzs
app.use(Lazyload, {
    lazyComponent: true,
});