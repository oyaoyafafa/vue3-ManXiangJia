<script setup lang="ts">
import { clubArtcleApi } from '@/api/community'
import ItemCard from '@/components/Community/ItemCard.vue'

import { ref } from 'vue'
import { savePosition } from '@/js/pageBarScrollTop.js'
console.log(111);

defineProps<{
  needId: any
  active:Number
}>()
const list = ref<
  Array<{
    id: Number
  
  }>
>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = (needId: any,active:any) => {
  clubArtcleApi(needId, active).then((res: any) => {
    // console.log(res);
    // fallList.value = ;
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }
    list.value = res.data.data.list
    loading.value = false

    console.log(list)

    if (list.value.length >= 1) {
      finished.value = true
    }
  })
}
const onRefresh = (needId: any,active:any) => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad(needId,active)
}

// 控制首页五个页面的滚动高度------------------------------------------------------------
savePosition()
</script>

<template>
  <div class="new" style="height: 100vh; overflow: auto">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh(needId,active)">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad(needId,active)"
      >
        <div v-masonry transition-duration="false" item-selector=".item" class="pets" gutter="5">
          <ItemCard v-masonry-tile v-for="item in list" :key="item.id" :item="item" class="item" />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
// .pets {
//   // margin: 0 auto;
// }
</style>
