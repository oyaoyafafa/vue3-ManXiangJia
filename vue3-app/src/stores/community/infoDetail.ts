import { ref, computed } from 'vue'
import {
  informationDetailApi,
  informationBannerApi,
  communityInfoCommentApi
} from '@/api/community'

import { defineStore } from 'pinia'

export const infoDetailStore = defineStore('infoDetail', () => {
  const loading = ref(true)
  const detail: any = ref(null)
  const bannerList = ref<
    Array<{
      topImage: any
      id: Number
    }>
  >([])
  const comments = ref<
    Array<{
      tbAppUserDetail: any
      createTime: Number
      supportNum: Number
      content: string
    }>
  >([])
  const getInfoDetail = (id:any) => {
    loading.value = true
    Promise.all([
      informationBannerApi(),
      informationDetailApi(id),
      communityInfoCommentApi(id)
    ])
      .then(([res, res1, res2]) => {
        // console.log( "rec",res,res1);
        bannerList.value = res.data.data
        detail.value = res1.data.data
        comments.value = res2.data.data.list
        loading.value = false
      })
      
  }

  return { detail, bannerList, loading, comments, getInfoDetail }
})
