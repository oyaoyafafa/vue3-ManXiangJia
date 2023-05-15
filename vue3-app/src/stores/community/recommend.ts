import { ref, computed } from 'vue'
import { recommendFallApi } from '@/api/community'
import { defineStore } from 'pinia'

export const communityRecommendStore = defineStore('communityRecommend', () => {
  const recommendList = ref([])
  const loading = ref(false)
  const finished = ref(false)
  const refreshing = ref(false)
  const getRecommendFallList = () => {
    recommendFallApi().then((res: any) => {
      if (refreshing.value) {
        recommendList.value = []
        refreshing.value = false
      }
      // followList.value = res.data.data.list
      // followList.value.push(res.data.data.list)
      // addList(res.data.data.list)
      recommendList.value = [...recommendList.value, ...res.data.data.list]
      loading.value = false

      if (recommendList.value.length >= 80) {
        finished.value = true
      }
    })
  }
  // function addList(data: any) {
  //   followList.value = [...followList.value, ...data]
  // }
  return { refreshing, finished, loading, recommendList, getRecommendFallList }
})
