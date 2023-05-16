import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'HomeNav',
      path: '/',
      redirect: '/home',
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
          }
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
              component: () => import('@/views/Community/Follow.vue'),
              meta: {
                keepAlive: true
              }
            },
            {
              name: 'Recommend',
              path: '/community',
              component: () => import('@/views/Community/Recommend.vue'),
              meta: {
                keepAlive: true
              }
            },
            {
              name: 'Club',
              path: '/community/club',
              component: () => import('@/views/Community/Club.vue'),
              meta: {
                keepAlive: true
              }
            },
            {
              name: 'Information',
              path: '/community/information',
              component: () => import('@/views/Community/Information.vue'),
              meta: {
                keepAlive: true
              }
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
            savedPosition: 0
          }
        },
        {
          //我的
          name: 'About',
          path: 'about',
          component: () => import('@/views/HomeNav/About.vue'),
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {

      // 社区搜索
      path:'/communitysearch',
      name:'CommunitySearch',
      component: () => import( '@/views/Community/Search.vue'),
    },
    {
      // 社区卡片详情
      path:'/communitygoodsdetail',
      name:'GoodsDetail',
      component: () => import('@/views/Community/GoodsDetail.vue'),
    },
    {
      // 社区部落详情
      path:'/clubdetail',
      name:'ClubDetail',
      component: () => import('@/views/Community/ClubDetail.vue'),
    },
    {
      // 社区情报详情
      path:'/infoDetail',
      name:'InfoDetail',
      component: () => import('@/views/Community/InfoDetail.vue'),
    },
    {
      // 用户详情
      path:'/uerinfo',
      name:'UserInfo',
      component: () => import('@/views/Community/UserInfo.vue'),
    }
    ,{
      //商品详情
      name: 'Commodity',
      path: '/commodity',
      component: () => import('@/views/Commodity/CommodityDetails.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/homesearch',
      name: 'HomeSearch',
      component: () => import('@/views/other/HomeSearch.vue')
    }
  ]
})

// 需要触发登录的页面的fullPath在pathArr添加
const pathArr = []
router.beforeEach((to, from, next) => {
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          f: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
