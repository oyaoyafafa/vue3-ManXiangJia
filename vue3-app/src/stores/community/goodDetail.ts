import { ref, computed } from 'vue'
import { communityGoodsCommentApi, communityGoodsDetailApi } from '@/api/community'

import { defineStore } from 'pinia'

export const goodsDetailStore = defineStore('goodsDetail', () => {
  const loading = ref(false)
  const detail: any = ref(null)
  const comments = ref<
    Array<{
      tbAppUserDetail: any
      createTime: Number
      supportNum: Number
      content: string
    }>
  >([])
  const getGoodsDetail = (id:any) => {
    loading.value = true
    Promise.all([
        communityGoodsCommentApi(id),
        communityGoodsDetailApi(id)
    ])
      .then(([res, res1]) => {
        comments.value =  res.data.data.list
        detail.value = res1.data.data
        loading.value = false
      })
      
  }

  return { detail, loading, comments, getGoodsDetail }
})
