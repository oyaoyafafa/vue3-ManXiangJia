import { ref, computed } from 'vue'
import { followListApi } from '@/api/community'
import { defineStore } from 'pinia'

export const communityFollowStore = defineStore('communityFollow', () => {
  const followList = ref([])
  const loading = ref(false)
  const finished = ref(false)
  const refreshing = ref(false)
  const getFollowList = (n: number) => {
    followListApi(n).then((res: any) => {
      if (refreshing.value) {
        followList.value = []
        refreshing.value = false
      }
      followList.value = [...followList.value, ...res.data.data.list]
      loading.value = false

      if (followList.value.length >= 60) {
        finished.value = true
      }
    })
  }
  return { refreshing, finished, loading, followList, getFollowList }
})
