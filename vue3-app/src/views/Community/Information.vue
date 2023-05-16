<script setup lang="ts">
import { informationBannerApi, informationListApi } from '@/api/community'
// import InfoBanner from '@/components/Community/InfoBanner.vue'
import InfoItem from '@/components/Community/InfoItem.vue'

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()

const bannerList = ref<
  Array<{
    topImage: any
    id: Number
  }>
>([])
const downList = ref([])
const loading = ref(true)

Promise.all([informationBannerApi(), informationListApi()])
  .then(([res, res1]) => {
    // console.log( "rec",res,res1);
    bannerList.value = res.data.data
    downList.value = res1.data.data.list
  })
  .finally(() => {
    loading.value = false
  })

const toDetail = (id: any) => {
  $router.push({
    path: '/infodetail',
    query: {
      id
    }
  })
}

// 控制首页五个页面的滚动高度------------------------------------------------------------
import { savePosition } from '@/js/pageBarScrollTop.js'
savePosition()
console.log('info')
</script>

<template>
  <div class="information">
  
    <div class="search" @click="$router.push('/communitysearch')">
      <div>
        <p>请输入你要查找的内容</p>
        <van-icon name="search" />
      </div>
    </div>
     
    <div class="banner_list" >
      <van-skeleton v-show="loading">
        <template #template>
          <div :style="{ display: 'flex', width: '100%' }">
            <van-skeleton-image :style="{ flex: '1' }" />
          </div>
        </template>
      </van-skeleton>
      <van-swipe :autoplay="3000" indicator-color="white" lazy-render >
        <van-swipe-item  @click.native="toDetail(bannerItem.id)"
          :style="[
            {
              backgroundImage: `url(${bannerItem.topImage}?imageView=1&type=webp&thumbnail=247x0)`
            }
          ]"
          v-for="bannerItem in bannerList"
        >
          <span class="to_see" >去看看</span>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="down_list">
      <InfoItem
        v-for="downItem in downList"
        :downItem="downItem"
        :loading="loading"
        v-show="!loading"
      />

      <div>
        <van-skeleton v-show="loading">
          <template #template>
            <div :style="{ display: 'flex', width: '100%' }">
              <van-skeleton-image />
              <div :style="{ flex: 1, marginLeft: '16px' }">
                <van-skeleton-paragraph row-width="60%" />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
              </div>
            </div>
          </template>
        </van-skeleton>
        <van-skeleton v-show="loading">
          <template #template>
            <div :style="{ display: 'flex', width: '100%' }">
              <van-skeleton-image />
              <div :style="{ flex: 1, marginLeft: '16px' }">
                <van-skeleton-paragraph row-width="60%" />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
              </div>
            </div>
          </template>
        </van-skeleton>
        <van-skeleton v-show="loading">
          <template #template>
            <div :style="{ display: 'flex', width: '100%' }">
              <van-skeleton-image />
              <div :style="{ flex: 1, marginLeft: '16px' }">
                <van-skeleton-paragraph row-width="60%" />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
                <van-skeleton-paragraph />
              </div>
            </div>
          </template>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

.search {
  margin: 20rem;
  div {
    padding: 5rem 10rem;
    margin: auto;
    width: 80vw;
    background-color: #f5f5fa;
    display: flex;
    align-items: center;
    border-radius: 50rem;
    p {
      font-size: 14rem;
      color: #9d9d9d;
      flex: 1;
    }
    .van-icon {
      font-size: 18rem;
      color: #9d9d9d;
    }
  }
}
.banner_list {
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
.down_list {
  margin-top: 25rem;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
}

/deep/.van-swipe-item {
  // width: 50vw;
  // border-radius: 15rem;
  height: 185rem;
  border-radius: 15rem;
  background-position: center;
  background-size: cover;
  .to_see {
    background-color: #fff;
    padding: 5rem 10rem;
    color: #7237e4;
    border-radius: 50rem;
    position: absolute;
    bottom: 15rem;
    right: 15rem;
  }
}
// /deep/ .van-swipe__indicators {
//   display: none;
// }

</style>
