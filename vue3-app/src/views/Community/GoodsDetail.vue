<script setup lang="ts">
import { communityGoodsCommentApi, communityGoodsDetailApi } from '@/api/community'
import CommentsItem from '@/components/Community/CommentsItem.vue'
import { useRouter, useRoute } from 'vue-router'

import { ref } from 'vue'
const loading = ref(true)
const $route = useRoute()
const needId = $route.query.id
const detail:any = ref(null)
const comments = ref<
  Array<{
    tbAppUserDetail: any
    createTime: Number
    supportNum: Number
    content: string
  }>
>([])

Promise.all([communityGoodsCommentApi(needId), communityGoodsDetailApi(needId)])
  .then(([res, res1]) => {
    console.log('rec', res, res1)
    detail.value = res1.data.data
    comments.value = res.data.data.list
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
    <div class="top_tit">
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
      <h3>
        <van-image
          width="40rem"
          height="40rem"
          round
          :src="detail?.isUserDetail.header + '?imageView=1&type=webp&thumbnail=247x0'"
        />
        <span>{{ detail?.isUserDetail.nickName }}</span>
      </h3>
      <div class="right">
        <div class="follow_btn">
          <span class="no_follow">关注</span>
          <!-- <span class="follow">已关注</span> -->
        </div>
        <i>
          <svg
            t="1683881936622"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6429"
            width="24rem"
            height="24rem"
          >
            <path
              d="M888.7 314.9c-9.9 0-17.9-8-17.9-17.9V153.6H709.4c-9.9 0-17.9-8-17.9-17.9 0-9.9 8-17.9 17.9-17.9h187.7c5.2 0 9.4 4.2 9.4 9.4V297c0.1 9.8-7.9 17.9-17.8 17.9z"
              fill="#1296db"
              p-id="6430"
            ></path>
            <path
              d="M486.8 538.8c-7-7-7-18.3 0-25.3L876 123l25.3 25.3-389.2 390.5c-7 7-18.3 7-25.3 0z"
              fill="#1296db"
              p-id="6431"
            ></path>
            <path
              d="M512.3 960.1C265 960.1 64.2 759.3 64.2 512c0-240.8 190.9-437.9 429.4-447.7 10.2-0.4 18.7 7.7 18.7 17.9 0 9.6-7.6 17.5-17.2 17.9C275.7 109.1 100 290.4 100 512c0 227.5 184.7 412.2 412.2 412.2 221.6 0 402.8-175.7 411.9-395.1 0.4-9.6 8.3-17.2 17.9-17.2 10.2 0 18.3 8.5 17.9 18.7-9.8 238.5-206.8 429.5-447.6 429.5z"
              fill="#1296db"
              p-id="6432"
            ></path>
          </svg>
        </i>
      </div>
    </div>
    <div class="img">
      <van-swipe lazy-render>
        <van-swipe-item
          class="banner_item"
          v-for="image in detail?.images"
          :key="image.id"
          :style="[
            {
              backgroundImage: `url(${image.url}?imageView=1&type=webp&thumbnail=247x0)`
            }
          ]"
        >
        </van-swipe-item>
      </van-swipe>
      <h3>{{ detail?.title }}</h3>
      <p>{{ detail?.content }}</p>
    </div>
    <div class="comment">
      <p class="c_time">{{ detail?.createTime }}</p>
      <p class="all_comment">共{{ comments.length }}条评论</p>
      <ul v-if="comments.length">
        <CommentsItem v-for="commentsItem in comments" :commentsItem="commentsItem" />
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top_tit {
  display: flex;
  align-items: center;
  padding: 10rem;
  .back_btn {
    margin-right: 15rem;
  }
  h3 {
    flex: 1;
    display: flex;
    align-items: center;
    span {
      margin-left: 10rem;
      font-size: 16rem;
      font-weight: bold;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .follow_btn {
      margin-right: 10rem;
      .no_follow {
        background-image: linear-gradient(#5e636c, #1e2632);
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
    i {
      margin-top: 5rem;
    }
  }
}
.img {
  .van-swipe {
    margin-bottom: 10rem;
  }
  .banner_item {
    height: 350rem;
    background-position: center;
    background-size: cover;
  }
  /deep/.van-swipe__indicators {
    display: none;
  }
  h3 {
    padding-left: 10rem;
    font-size: 14rem;
  }
  p {
    color: #828181;
    padding-left: 10rem;
  }
}
.comment {
  margin-top: 20rem;
  padding: 10rem;
  .c_time {
    color: #c8c8c8;
  }
  .all_comment {
    font-size: 13rem;
  }
  ul {
    padding-top: 20rem;
    
  }
}
</style>
