<script setup lang="ts">
import { clubDetailApi, clubArtcleApi } from '@/api/community'
import { useRouter, useRoute } from 'vue-router'

import { ref } from 'vue'
const loading = ref(true)
const $route = useRoute()
const needId = $route.query.id
const detail:any = ref({
    notice:Array,
    adminDetail:Object
})
const Artcle = ref([])

Promise.all([clubDetailApi(needId), clubArtcleApi(needId, 1)])
  .then(([res, res1]) => {
    console.log('rec', res, res1)
    detail.value = res.data.data
    Artcle.value = res1.data.data.list
  })
  .finally(() => {
    loading.value = false
  })

// 控制首页五个页面的滚动高度------------------------------------------------------------
import { savePosition } from '@/js/pageBarScrollTop.js'
import { reactive } from 'vue'
savePosition()
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
  </div>
</template>

<style lang="less" scoped>
.top {
  height: 40vh;
  background-position: center;
  background-size: cover;
  position: relative;
  color: white;
  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000074;
  }
  .back{
    padding: 10rem;
  }
  .welcome{
    text-align: center;
    h1{
        text-align: center;
        font-size: 18rem;
        margin-bottom: 5rem;
    }
    span{
        padding: 5rem 20rem;
        color: #cacccc;
        background-color: #3636377d;
        border-radius: 50rem;
    }
  }
  .admin_info{
    margin-top: 20rem;
    display: flex;
    padding: 10rem;
    justify-content: space-between;
    align-items: center;
    .admin{
        display: flex;
        .adm_name{
            h3{
                font-style: 14rem;
            }
            p{
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
