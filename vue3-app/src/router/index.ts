import { createRouter, createWebHistory } from 'vue-router'

import Follow from '@/views/Community/Follow.vue'
import Club from '@/views/Community/Club.vue'
import Information from '@/views/Community/Information.vue'
import Recommend from '@/views/Community/Recommend.vue'
import CommunitySearch from '@/views/Community/Search.vue'




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
          meta:{
            keepAlive: true
          },
          children:[
            {
              path:'/community/follow',
              component:Follow
            },
            {
              path:'/community',
              component:Recommend
            },
            {
              path:'/community/club',
              component:Club
            },
            {
              path:'/community/information',
              component:Information
            },
          ]
        },
        {
          //积分商城
          path:'pointShopping',
          component: () => import('@/views/HomeNav/PointShopping.vue'),
          meta:{
            keepAlive: true
          },


        },
        {
          //购物袋
          path:'shoppingCart',
          component: () => import('@/views/HomeNav/ShoppingCart.vue'),
          meta:{
            keepAlive: true
          },
        },
        {
          //我的
          path:'about',
          component: () => import('@/views/HomeNav/About.vue'),
        },
       
      ]
    },
    {
      path:'/communitysearch',
      name:'CommunitySearch',
      component:CommunitySearch
    }
    
  ]
})

export default router
