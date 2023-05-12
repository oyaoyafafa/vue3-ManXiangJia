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

    const fallList = (index1: any) => {
      console.log(list.value.filter((item, index) => index % 2 == index1))

      return list.value.filter((item, index) => index % 2 == index1)

      // console.log( this.left_list);
    }

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
     savePosition();
    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      fallList,
      savePosition

    }
  },
  // deactivated() {
  //   console.log("lkai",this.masonry);
    
  //   // masonry.destroy()
  // }
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

        <!-- column-width="100"

        <div
          v-masonry
          item-selector=".item"
          fit-width="2"
          horizontal-order="true"
          column-width=".item"
          gutter="8"
          
        >
        column-width="100"

          gutter="10" -->
        <div class="fall_list">
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
</style>
