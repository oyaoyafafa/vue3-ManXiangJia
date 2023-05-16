import { ref, computed, reactive } from 'vue'
import { userInfoApi, userSupportApi, userLikeDetailtApi } from '@/api/user'
import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfo', () => {
  // 用户详情
  const userInfo: any = ref({
    backgroundImage: String,
    nickName: String,
    homesickId: Number,
    signature: String
  })
  const infoLoading = ref(false)
  // 用户获赞
  const userSupport = ref({
    supportCount: Number,
    fansCount: Number,
    attentionCount: Number,
    tribeCount: Number
  })
  const getuserInfoStore = (id: any) => {
    Promise.all([userInfoApi(id), userSupportApi(id)]).then(([res1, res2]) => {
      userInfo.value = res1.data.data.tbAppUserDetail
      userSupport.value = res2.data.data
      infoLoading.value = true
    })
  }

  // 用户喜欢列表等
  const userLikeDetail = ref({})
  const getuserLikeList = (id: any) => {
    userLikeDetailtApi(id).then((res: any) => {
      console.log(res)

      userLikeDetail.value = res.data.data.list
    })
  }

  return { userInfo, infoLoading, userSupport, getuserInfoStore, userLikeDetail, getuserLikeList }
})
