import { ref, computed } from 'vue'
import { clubDetailApi, clubArtcleApi } from '@/api/community'
import { defineStore } from 'pinia'

export const communityClubStore = defineStore('communityClub', () => {
  const detail: any = ref({
    notice: Array,
    adminDetail: Object
  })
  
  const getclubDetail  = (id: any) => {
    clubDetailApi(id).then((res:any)=>{
      
      detail.value = res.data.data
    })
  }
//   refreshing, finished, artcleLoading, artcleList, getArtcleList ,
  return {detail,getclubDetail}
})
