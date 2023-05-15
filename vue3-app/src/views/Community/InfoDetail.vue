<script setup lang="ts">
import { infoDetailStore } from '@/stores/community/infoDetail.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CommentsItem from '@/components/Community/CommentsItem.vue'
import Swiper from 'swiper'

const $route = useRoute()
const needId = $route.query.id
const infoDetail = infoDetailStore()
const { detail, bannerList, loading, comments } = storeToRefs(infoDetail)
const { getInfoDetail } = infoDetail
getInfoDetail(needId)
// 使用swiper组件
onMounted(() => {
  new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true, // spaceBetween: 30, // freeMode: true,
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true // 修改swiper的父元素时，自动初始化swiper
  })
})
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
        fill="#111111"
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
      <van-image width="100vw" height="auto" :src="detail?.topImage" />
      <h1>{{ detail?.title }}</h1>
      <div>
        <p>
          <span><van-icon name="eye-o" />{{ detail?.browseNumber }}</span>
          <span><van-icon name="like-o" />{{ detail?.supportNumber }}</span>
        </p>
        <span class="c_time">{{ detail?.createTime }}</span>
      </div>
    </div>
    <div class="info_detail" v-html="detail?.content"></div>
    <div class="footer">
      <p class="top_tit"><i>文章为原创作品</i></p>
      <h1>文章推荐</h1>
      <div class="recBanner">
        <div class="swiper-container swiper-selectedSong">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide select-item"
              v-for="bannerItem in bannerList"
              :style="{
                backgroundImage: `url(${bannerItem.topImage}?imageView=1&type=webp&thumbnail=247x0)`
              }"
            ></div>
          </div>
        </div>
      </div>
      <div class="comments">
        <p>共有{{ comments.length }}条评论</p>
        <ul>
          <CommentsItem v-for="commentsItem in comments" :commentsItem="commentsItem" />
        </ul>
      </div>
      <div class="footer_img">
      <img src="../../../public/images/ease_default_avatar.png" alt="">
      <p>没有更多了</p>
    </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.back_btn {
  position: fixed;
  top: 15rem;
  left: 10rem;
  background-color: #3d3d406c;
  width: 40rem;
  height: 40rem;
  text-align: center;
  line-height: 50rem;
  display: block;

  border-radius: 50%;
  z-index: 99;
}
.top {
  h1 {
    margin-top: 15rem;
    padding: 0 10rem;
    font-size: 16rem;
    font-weight: bold;
  }
  div {
    margin-top: 10rem;
    display: flex;
    justify-content: space-between;
    padding: 0 10rem;
    color: #919191;
    margin-bottom: 10rem;
  }
}
/deep/ .info_detail {
  width: 100vw;
  padding: 0 10rem;
  p {
    width: 100%;
    margin: 10rem 0;
    span {
      img {
        width: 100%;
      }
    }
  }
}
.footer {
  i {
    color: #919191;
  }
  h1 {
    margin: 10rem 0;
    font-size: 16rem;
    font-weight: bold;
  }
  padding: 0 10rem;
  .comments {
    p {
      color: #a1a1a1;
    }
  }
}
.recBanner {
  margin-bottom: 10rem;
  .swiper-slide {
    width: 125rem;
    height: 125rem;
    border-radius: 10rem;
    margin-left: 10rem;
    background-size: cover;
    background-position: center;
  }
}

</style>
