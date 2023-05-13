<script setup lang="ts">
import { informationDetailApi } from '@/api/community'
import { useRouter, useRoute } from 'vue-router'

import { ref } from 'vue'
const loading = ref(true)
const $route = useRoute()
const needId = $route.query.id
const detail: any = ref(null)


informationDetailApi(needId)
  .then((res: any) => {
    detail.value = res.data.data
    // console.log( res)
  })
  .finally(() => {
    loading.value = false
  })

// 控制首页五个页面的滚动高度------------------------------------------------------------
import { savePosition } from '@/js/pageBarScrollTop.js'
savePosition()
</script>

<template>
  <div class="detail">
    <i class="back_btn" @click="$router.back()">
      <svg
        t="1683880458227"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3542"
        width="20rem"
        height="20rem"
        fill="#464646"
      >
        <path
          d="M305.519192 557.640404c-11.636364 0-23.40202-4.39596-32.323232-13.317172-17.842424-17.842424-17.842424-46.674747 0-64.517171L683.830303 69.30101c17.842424-17.842424 46.674747-17.842424 64.517172 0 17.842424 17.842424 17.842424 46.674747 0 64.517172L337.713131 544.323232c-8.921212 8.921212-20.557576 13.317172-32.193939 13.317172z m0 0"
          fill=""
          p-id="3543"
        ></path>
        <path
          d="M715.894949 968.145455c-11.636364 0-23.40202-4.39596-32.323232-13.317172L273.19596 544.323232c-17.842424-17.842424-17.842424-46.674747 0-64.517171 17.842424-17.842424 46.674747-17.842424 64.517171 0l410.505051 410.50505c17.842424 17.842424 17.842424 46.674747 0 64.517172-8.921212 8.921212-20.557576 13.317172-32.323233 13.317172z m0 0"
          fill=""
          p-id="3544"
        ></path>
      </svg>
    </i>
    <div class="top">
      <van-image  width="100rem" height="auto" :src="detail?.topImage" />
      <h1>{{detail?.title  }}</h1>
      <div>
        <p><span>{{ detail?.browseNumber }}</span><span>{{ detail?.supportNumber }}</span></p>
        <span class="c_time">{{detail?.createTime}}</span>
      </div>
    </div>
    <div class="info_detail" v-html="detail?.content"></div>
  </div>
</template>

<style lang="less" scoped>
/deep/ .info_detail{
  width: 100vw;
  p{
    width: 100%;
    span{
      img{
        width: 100%;
      }
    }
  }
}
</style>
