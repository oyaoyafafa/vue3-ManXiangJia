<script setup lang="ts">
import { clubArtcleApi } from '@/api/community'
import ItemCard from '@/components/Community/ItemCard.vue'

import { ref } from 'vue'
console.log(111);

defineProps<{
  needId: any
  active: Number
}>()
const list = ref<
  Array<{
    id: Number

  }>
>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = (needId: any, active: any, n: number) => {
  clubArtcleApi(needId, active, n).then((res: any) => {
    // console.log(res);
    // fallList.value = ;
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }
    console.log(res);

    list.value = res.data.data.list
    loading.value = false

    console.log(list)

    if (list.value.length >= 1) {
      finished.value = true
    }
  })
}
const onRefresh = (needId: any, active: any, n: number) => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad(needId, active, n)
}
const fallList = (index1: any) => {

  return list.value.filter((item, index) => index % 2 == index1)

  // console.log( this.left_list);
}
// 控制首页五个页面的滚动高度------------------------------------------------------------
</script>

<template>
  <div class="new">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh(needId, active, 1)">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad(needId, active, 1)">
        <div class="fall_list">
          <div class="fall_left">
            <div>
              <ItemCard v-for="item in fallList(0)" :item="item" />
            </div>
          </div>
          <div class="fall_right">
            <div>
              <ItemCard v-for="item in fallList(1)" :item="item" />
            </div>
          </div>

        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.new{
  .fall_list {
    padding: 0 10rem;
    display: flex;
    justify-content: space-between;
    &>div {
      width: 49%;
    }
  }
}

</style>
