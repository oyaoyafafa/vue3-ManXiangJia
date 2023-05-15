<script lang="ts">
import { savePosition } from '@/js/pageBarScrollTop.js'
import ItemCard from '@/components/Community/ItemCard.vue'
import { ref, computed } from 'vue'
import { communityFollowStore } from '@/stores/community/follow'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const num = ref(1)
    const communityFollow = communityFollowStore()
    const { followList, loading, finished, refreshing } = storeToRefs(communityFollow)
    const { getFollowList } = communityFollow

    const onLoad = (n: any) => {
      console.log(111)

      getFollowList(n)
      num.value++
      // n++
      // fallList.value = ;
    }
    const onRefresh = (n:any) => {
      // 清空列表数据
      finished.value = false
      n = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true
      onLoad(n)
    }

    // 控制首页五个页面的滚动高度------------------------------------------------------------
    savePosition()
    return {
      followList,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      savePosition,
      num
    }
  }
}
</script>

<template>
  <div class="follow">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh(num)">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        @load="onLoad(num)"
        finished-text="没有更多了"
      >
        <div v-masonry transition-duration="false" item-selector=".item" class="pets" gutter="8">
          <ItemCard
            v-masonry-tile
            v-for="item in followList"
            :key="item.id"
            :item="item"
            class="item"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<style lang="scss" scoped>
.fall_list {
  display: flex;
  justify-content: space-between;
  & > div {
    width: 49%;
  }
}

.card {
  width: 49%;
}

.item {
  width: 49%;
}
</style>
