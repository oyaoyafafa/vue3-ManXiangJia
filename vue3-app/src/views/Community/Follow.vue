<script lang="ts">
import { followListApi } from '../../api/community'
import { savePosition } from '@/js/pageBarScrollTop.js'
import ItemCard from '@/components/Community/ItemCard.vue'
import { ref } from 'vue'
export default {
  
  setup() {
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)

    
    const onLoad = () => {
      
      followListApi().then((res: any) => {
        // console.log(res);
        // fallList.value = ;

        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }
        list.value = res.data.data.list
        loading.value = false
        console.log(list)

        if (list.value.length >= 10) {
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
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      savePosition
    }
  },
  
}
</script>

<template>
  <div class="follow">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
      >
        <div
          v-masonry
          transition-duration="false"
          item-selector=".item"
          class="pets"
          gutter="8"
        >
          <ItemCard v-masonry-tile v-for="item in list" :key="item.id" :item="item" class="item" />
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
