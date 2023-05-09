import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeNav/HomeNav.vue'),
      children:[
        {
          //漫想家
          path:'',
          component: () => import('@/views/HomeNav/ManXiangJia.vue'),
        },
        {
          //社区
          path:'community',
          component: () => import('@/views/HomeNav/Community.vue'),
        },
        {
          //积分商城
          path:'pointShopping',
          component: () => import('@/views/HomeNav/PointShopping.vue'),
        },
        {
          //购物袋
          path:'shoppingCart',
          component: () => import('@/views/HomeNav/ShoppingCart.vue'),
        },
        {
          //我的
          path:'about',
          component: () => import('@/views/HomeNav/About.vue'),
        },
       
      ]
    },
    
  ]
})

export default router
