<script lang="ts">
import ItemCard from '@/components/Community/ItemCard.vue'

import { savePosition } from '@/js/pageBarScrollTop.js'
import { communityRecommendStore } from '@/stores/community/recommend'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const communityRecommendFall = communityRecommendStore()
    const { recommendList, loading, finished, refreshing } = storeToRefs(communityRecommendFall)
    const { getRecommendFallList } = communityRecommendFall

    const onLoad = () => {
      console.log(222)

      getRecommendFallList()
    }
    const onRefresh = () => {
      // 清空列表数据
      finished.value = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true
      onLoad()
    }

    // 控制首页五个页面的滚动高度------------------------------------------------------------
    savePosition()
    return {
      recommendList,
      loading,
      finished,
      refreshing,
      onRefresh,
      onLoad,
      savePosition
    }
  }
}
</script>

<template>
  <div class="recommend" style="height: 100vh; overflow: auto">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-masonry transition-duration="false" item-selector=".item" class="pets" gutter="5">
          <ItemCard
            v-masonry-tile
            v-for="item in recommendList"
            :key="item.id"
            :item="item"
            class="item"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="less" scoped>
// .pets {
//   // margin: 0 auto;
// }
</style>
