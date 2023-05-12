<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { communitySearchResApi } from '@/api/search'
import CommunitySearchRes from '@/components/Community/CommunitySearchRes.vue'

const $router = useRouter()
const value = ref('')
const loading = ref(true)
const seachResList = ref([])
const seachHistoryList = ref(JSON.parse(localStorage.getItem('seachHistoryList')) || [])

watch(
  () => seachHistoryList.value,
  (newV) => {
    console.log(newV)
    localStorage.setItem('seachHistoryList', JSON.stringify(newV))
  }
)

const onSearch = (val: any) => {
  // console.log(val)
  communitySearchResApi(val)
    .then((res: any) => {
      seachResList.value = res.data.data.list
    })
    .finally(() => {
      loading.value = false
    })
  seachHistoryList.value = [...seachHistoryList.value, { id: Date.now(), msg: val }]
}
const onCancel = () => {
  if (seachResList.value.length) {
    seachResList.value = []
  } else {
    $router.back()
  }
}
</script>

<template>
  <div class="information">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        autofocus
      />
    </form>
    <!-- <van-loading vertical v-show="!loading ">
      <template #icon>
        <van-icon name="star-o" size="30" />
      </template>
    </van-loading> -->
    <div class="search_res">
      <ul>
        <CommunitySearchRes v-for="seachResItem in seachResList" :seachResItem="seachResItem" />
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
