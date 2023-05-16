<script setup lang="ts">
import { clubDetailApi, clubArtcleApi } from '@/api/community'
// import HotEst from '@/components/Community/HotEst.vue'
import NewEst from '@/components/Community/NewEst.vue'

import { useRouter, useRoute } from 'vue-router'

import { ref,watch } from 'vue'
const $route = useRoute()
const isloading = ref(true)
const active = ref(0)

const needId = $route.query.id
const detail: any = ref({
  notice: Array,
  adminDetail: Object
})

clubDetailApi(needId)
  .then((res: any) => {
    detail.value = res.data.data
  })
  .finally(() => {
    isloading.value = false
  })

// ///////////////////////////////////////////vant 组件list latestList
const latestloading = ref(false)
const latestfinished = ref(false)
const latestrefreshing = ref(false)

const newloading = ref(false)
const newfinished = ref(false)
const newrefreshing = ref(false)

const latestList = ref<
  Array<{
    id: Number
  }>
>([])

const newList = ref<
  Array<{
    id: Number
  }>
>([])

const onLoad = (needId: any, orderType: any) => {
  clubArtcleApi(needId, orderType).then((res: any) => {
    if (orderType == 1) {
      if (latestrefreshing.value) {
        latestList.value = []
        latestrefreshing.value = false
      }
      latestList.value = res.data.data.list
      latestloading.value = false
      console.log(latestList)
      if (latestList.value.length >= 1) {
        latestfinished.value = true
      }
    } else if (orderType == 2) {
      if (newrefreshing.value) {
        newList.value = []
        newrefreshing.value = false
      }
      newList.value = res.data.data.list
      newloading.value = false
      console.log(newList)
      if (newList.value.length >= 1) {
        newfinished.value = true
      }
    }
  })
}
onLoad(needId,1)
onLoad(needId,2)
const onRefresh = (needId: any, orderType: any) => {
  if (orderType == 1) {
    // 清空列表数据
    latestfinished.value = false
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    latestloading.value = true
    onLoad(needId, orderType)
  } else if (orderType == 2) {
    newfinished.value = false
    newloading.value = true
    onLoad(needId, orderType)
  }
}

</script>

<template>
  <div class="detail">
    <div
      class="top"
      :style="[
        {
          backgroundImage: `url(${detail?.topImage}?imageView=1&type=webp&thumbnail=247x0)`
        }
      ]"
    >
      <div class="mask"></div>
      <h1 class="back">
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
            fill="#a1a1a2"
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
      </h1>
      <div class="welcome">
        <h1>{{ detail?.name }}</h1>
        <span>{{ detail?.notice[0]?.notice }}</span>
      </div>
      <div class="admin_info">
        <div class="admin">
          <van-image
            width="36rem"
            height="36rem"
            round
            :src="detail?.adminDetail.header + '?imageView=1&type=webp&thumbnail=247x0'"
          />
          <div class="adm_name">
            <h3>{{ detail?.adminDetail.nickName }}</h3>
            <p>部长</p>
          </div>
        </div>
        <div class="follow_btn">
          <span class="no_follow">关注部落</span>
          <!-- <span class="followed">已关注</span> -->
        </div>
      </div>
    </div>
    <div class="tab">
      <van-tabs ref="tabs" v-model:active="active" sticky :lazy-render="false" @resize="resize">
        <van-tab title="最新">
          <!-- <NewEst   :needId="needId" :active="1"/> -->
          <div class="new" style="height: 100vh; overflow: auto">
            <van-pull-refresh v-model="latestrefreshing" @refresh="onRefresh(needId, active + 1)">
              <van-list
                v-model:loading="latestloading"
                :finished="latestfinished"
                finished-text="没有更多了"
                @load="onLoad(needId, active + 1)"
              >
                <div
                  v-masonry
                  transition-duration="false"
                  item-selector=".item"
                  class="pets"
                  gutter="5"
                >
                  <ItemCard
                    v-masonry-tile
                    v-for="item in latestList"
                    :key="item.id"
                    :item="item"
                    class="item"
                  />
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab title="最热">
          <!-- <NewEst :needId="needId" :active="2" /> -->
          <div class="new" style="height: 100vh; overflow: auto">
            <van-pull-refresh v-model="newrefreshing" @refresh="onRefresh(needId, active + 1)">
              <van-list
                v-model:loading="newloading"
                :finished="newfinished"
                finished-text="没有更多了"
                @load="onLoad(needId, active + 1)"
              >
                <div
                  v-masonry
                  transition-duration="false"
                  item-selector=".item"
                  class="pets"
                  gutter="5"
                >
                  <ItemCard
                    v-masonry-tile
                    v-for="item in newList"
                    :key="item.id"
                    :item="item"
                    class="item"
                  />
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top {
  height: 40vh;
  background-position: center;
  background-size: cover;
  position: relative;
  color: white;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000074;
  }
  .back {
    padding: 10rem;
  }
  .welcome {
    text-align: center;
    h1 {
      text-align: center;
      font-size: 18rem;
      margin-bottom: 5rem;
    }
    span {
      padding: 5rem 20rem;
      color: #cacccc;
      background-color: #3636377d;
      border-radius: 50rem;
    }
  }
  .admin_info {
    margin-top: 20rem;
    display: flex;
    padding: 10rem;
    justify-content: space-between;
    align-items: center;
    .admin {
      display: flex;
      .adm_name {
        h3 {
          font-style: 14rem;
        }
        p {
          color: #cacccc;
        }
        margin-left: 5rem;
      }
    }
  }
  .follow_btn {
    margin-right: 10rem;
    .no_follow {
      background-color: #51565d;
      color: #fff;
      padding: 5rem 15rem;
      border-radius: 50rem;
    }
    .followed {
      padding: 5rem 10rem;
      border-radius: 50rem;

      color: #646464;
      border: 1px solid #ccc;
    }
  }
}
</style>
