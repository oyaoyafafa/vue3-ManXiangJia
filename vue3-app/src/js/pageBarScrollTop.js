// 控制首页五个页面的滚动高度------------------------------------------------------------
import { onActivated, ref } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
export function savePosition() {
  const scrollTop = ref(0)
  let $route = useRoute()
  // 离开本页面结束监听滚动事件
  onBeforeRouteLeave((to, from) => {
    $route = {
      ...$route,
      ...{
        meta: {
          keepAlive: true,
          savedPosition: scrollTop.value
        }
      }
    }
    window.removeEventListener('scroll', pageScroll)
    return true
  })
  // 激活本页面开始监听滚动事件
  onActivated(() => {
    
    document.documentElement.scrollTop = $route.meta.savedPosition || 0
    console.log($route.meta.savedPosition);
    window.addEventListener('scroll', pageScroll)
  })
  // 每次滚动保存滚动值
  function pageScroll() {

    scrollTop.value =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  }
}
