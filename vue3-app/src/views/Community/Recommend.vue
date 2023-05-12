<script lang="ts">
import { recommendFallApi } from '@/api/community'
import ItemCard from '@/components/Community/ItemCard.vue'

import { ref } from 'vue'
import { savePosition } from '@/js/pageBarScrollTop.js'

export default {
  setup() {
    const list = ref<
      Array<{
        id: Number
      }>
    >([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)

    // const fallList = (index1: any) => {
    //   console.log(list.value.filter((item, index) => index % 2 == index1))

    //   return list.value.filter((item, index) => index % 2 == index1)

    //   // console.log( this.left_list);
    // }

    const onLoad = () => {
      console.log(111)

      recommendFallApi().then((res: any) => {
        // console.log(res);
        // fallList.value = ;
        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }
        list.value = res.data.data.list
        loading.value = false

        console.log(list)

        if (list.value.length >= 20) {
          finished.value = true
        }
      })
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
      list,
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
        <div
          v-masonry
          transition-duration="0s"
          item-selector=".item"
          class="pets"
          gutter="8"
          destroy-delay="0"
        >
          <!-- fit-width="true" -->
          <!-- origin-left="false" -->
          <ItemCard v-masonry-tile v-for="item in list" :key="item.id" :item="item" class="item" />
        </div>

        <!-- <div class="fall_list">
          <div class="fall_left">
            <lazy-component>
              <ItemCard v-for="item in fallList(0)" :item="item" />
            </lazy-component>
          </div>
          <div class="fall_right">
            <lazy-component>
              <ItemCard v-for="item in fallList(1)" :item="item" />
            </lazy-component>
          </div>
        </div> -->
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
// .pets {
//   // margin: 0 auto;
// }
.item {
  width: 49%;
}
</style>
