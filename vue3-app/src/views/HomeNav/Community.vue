<template>
  <div class="all">
    <div class="top_nav">
      <main>
        <van-tabs v-model:active="active" animated lazy-render swipeable>
          <van-tab title="关注" name="/follow" to="/community/follow">
            <Follow />
          </van-tab>
          <van-tab title="推荐" name="/" to="/community">
            <Recommend />
          </van-tab>
          <van-tab title="部落" name="/club" to="/community/club">
            <Club />
          </van-tab>
          <van-tab title="情报" name="/information" to="/community/information">
            <Information />
          </van-tab>
        </van-tabs>
      </main>
    </div>
    <van-icon v-show="toSearch" name="search" class="search_btn" @click.native="$router.push('/communitysearch')" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Club from '@/views/Community/Club.vue'
import Follow from '@/views/Community/Follow.vue'
import Information from '@/views/Community/Information.vue'
import Recommend from '@/views/Community/Recommend.vue'

// 路由切换配合Vant tab标签页切换
const $route = useRoute()
const active = ref('/')
const toSearch = ref(true)
console.log( );

watch(
  $route,
  (newroute) => {
    active.value = newroute.path.replace('/community', '') || '/'
    if( active.value === "/club"||active.value ==="/information"){
      toSearch.value = false
    }else{
      toSearch.value = true
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.all {
  padding-bottom: 70rem;
  // box-sizing: border-box;
}
.search_btn {
  position: fixed;
  font-size: 24rem;
  top: 10rem;
  right: 15rem;
  z-index: 99;
}
/deep/ .van-tabs {
  .van-tabs__wrap {
    position: sticky;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 1;
    margin-bottom: 20rem;
  }
  .van-tabs__nav {
    width: 50%;
  }
  .van-tab__panel > div {
    height: calc(100vh - 44rem - 60rem);
    overflow: scroll;
    padding: 10rem;
  }
  .van-tabs__line {
    background-color: #1e1e1e;
    width: 25rem;
  }
}
/deep/ .van-tab--active {
  span {
    font-weight: bolder;
    margin-top: -3rem;
  }
  font-size: 15rem;
}
</style>
