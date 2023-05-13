import { createRouter, createWebHashHistory } from 'vue-router'

import Follow from '@/views/Community/Follow.vue'
import Club from '@/views/Community/Club.vue'
import Information from '@/views/Community/Information.vue'
import Recommend from '@/views/Community/Recommend.vue'
import CommunitySearch from '@/views/Community/Search.vue'



const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'HomeNav',
      path: '/',
      redirect:'/home',
      component: () => import('@/views/HomeNav/HomeNav.vue'),
      meta: {
        keepAlive: true
      },
      children: [
        {
          //漫想家
          name: 'ManXiangJia',
          path: 'home',
          component: () => import('@/views/HomeNav/ManXiangJia.vue'),
          meta: {
            keepAlive: true 
          },
        },
        {
          //社区
          name: 'Community',
          path: 'community',
          component: () => import('@/views/HomeNav/Community.vue'),
          // meta: {
          //   keepAlive: true
          // },
          children: [
            {
              name: 'Follow',
              path: '/community/follow',
              component: Follow,
              meta: {
                keepAlive: true
              },
            },
            {
              name: 'Recommend',
              path: '/community',
              component: Recommend,
              meta: {
                keepAlive: true
              },
            },
            {
              name: 'Club',
              path: '/community/club',
              component: Club,
              meta: {
                keepAlive: true
              },
            },
            {
              name: 'Information',
              path: '/community/information',
              component: Information,
              meta: {
                keepAlive: true
              },
            }
          ]
        },
        {
          //积分商城
          name: 'PointShopping',
          path: 'pointShopping',
          component: () => import('@/views/HomeNav/PointShopping.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          //购物袋
          name: 'ShoppingCart',

          path: 'shoppingCart',
          component: () => import('@/views/HomeNav/ShoppingCart.vue'),
          meta: {
            keepAlive: true,
            savedPosition:0
          }
        },
        {
          //我的
          name: 'About',
          path: 'about',
          component: () => import('@/views/HomeNav/About.vue'),
          meta: {
            keepAlive: true
          },
        }
      ]
    },
    {
      path:'/communitysearch',
      name:'CommunitySearch',
      component:CommunitySearch
    }
    ,{
      //商品详情
      name: 'Commodity',
      path: '/commodity',
      component: () => import('@/views/Commodity/CommodityDetails.vue'),
      meta: {
        keepAlive: true
      },
    }
    


  ],
  // 仅当通过浏览器前进/后退 savedPosition 才有效
  // scrollBehavior (to, from, savedPosition) {
  //   console.log('scrollBehavior启动了',savedPosition);
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return {top:0}
  //   }
  // }
})


export default router
