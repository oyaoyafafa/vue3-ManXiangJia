<script lang="ts">
console.log('recom')

import { recommendFallApi } from '@/api/community'
import ItemCard from '@/components/Community/ItemCard.vue'
import { ref } from 'vue'
import { savePosition } from '@/js/pageBarScrollTop.js'

export default {
  setup() {
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)

    const onLoad = () => {
      recommendFallApi().then((res: any) => {
        // console.log(res);
        // fallList.value = ;

        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }
        list.value = res.data.data.list
        loading.value = false

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
    savePosition();
    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      savePosition
    }
  }
}
</script>

<template>
  <div class="recommend">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-masonry
          item-selector=".item"
          fit-width="2"
          horizontal-order="true"
          column-width=".item"
          gutter="8"
        >
          <!-- column-width="100"
          gutter="10" -->
          <lazy-component>
            <ItemCard v-for="item in list" :item="item" />
          </lazy-component>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped></style>
