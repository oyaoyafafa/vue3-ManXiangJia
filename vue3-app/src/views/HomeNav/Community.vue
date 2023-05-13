<template>
  <div class="all">
    <div class="top_nav">
      <!-- 
        <van-tabs v-model:active="active"  >
          <van-tab title="关注"  to="/community/follow" />
          <van-tab title="推荐"  to="/community" />
          <van-tab title="部落"  to="/community/club" />
          <van-tab title="情报"  to="/community/information" />
        </van-tabs> 
    -->
      <main>
        <van-tabs v-model:active="active" animated>
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

      <van-icon name="search" @click="$router.push('/communitysearch')" />
    </div>
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
watch(
  $route,
  (newroute) => {
    active.value = newroute.path.replace('/community', '') || '/'
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.all {
  padding-bottom: 70rem;
  // .top_nav {
  //   background-color: #fff;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   position: sticky;
  //   top: -1rem;
  //   z-index: 101;
  //   /deep/ .van-tabs {
  //     margin-bottom: 15rem;
  //     width: 100%;

  //     span {
  //       font-size: 14rem;
  //       color: #808080;
  //       font-weight: bold;
  //     }

  //     .van-tab--active span {
  //       font-size: 16rem;
  //       color: black;
  //       font-weight: bolder;
  //     }

  //     .van-tabs__nav--line {
  //       padding-bottom: 15rem;
  //     }

  //     .van-tabs__line {
  //       bottom: 15rem;
  //       background: #1c2431;
  //       width: 25rem;
  //     }
  //   }

  //   .van-icon {
  //     font-size: 24rem;
  //     padding-right: 8rem;
  //     font-weight: bolder;
  //     margin-top: -13rem;
  //   }
  // }
}
/deep/ .van-tabs {
  .van-tabs__wrap {
    position: sticky;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 1;
  }
  .van-tab__panel > div {
    height: calc(100vh - 44rem - 60rem);
    overflow: scroll;
  }

}
</style>
