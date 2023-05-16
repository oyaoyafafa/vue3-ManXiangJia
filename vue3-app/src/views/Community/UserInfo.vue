<script lang="ts" setup>
import { userInfoStore } from '@/stores/community/userInfo.ts'
import { storeToRefs } from 'pinia'
import ItemCard from '@/components/Community/ItemCard.vue'
import { useRouter, useRoute } from 'vue-router'

// 接受的路由参数
const $route = useRoute()
const needId = $route.query.id
// pina部分
const userDetail = userInfoStore()
const { infoLoading, userInfo, userSupport, userLikeDetail } = storeToRefs(userDetail)
const { getuserInfoStore, getuserLikeList } = userDetail
getuserInfoStore(needId)
getuserLikeList(needId)
</script>
<template >
  <div>
    <div class="top">
      <i class="back_btn" @click="$router.back()" style="margin-top:10rem">
        <svg t="1683880458227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3542" width="20rem" height="20rem">
          <path
            d="M305.519192 557.640404c-11.636364 0-23.40202-4.39596-32.323232-13.317172-17.842424-17.842424-17.842424-46.674747 0-64.517171L683.830303 69.30101c17.842424-17.842424 46.674747-17.842424 64.517172 0 17.842424 17.842424 17.842424 46.674747 0 64.517172L337.713131 544.323232c-8.921212 8.921212-20.557576 13.317172-32.193939 13.317172z m0 0"
            fill="" p-id="3543"></path>
          <path
            d="M715.894949 968.145455c-11.636364 0-23.40202-4.39596-32.323232-13.317172L273.19596 544.323232c-17.842424-17.842424-17.842424-46.674747 0-64.517171 17.842424-17.842424 46.674747-17.842424 64.517171 0l410.505051 410.50505c17.842424 17.842424 17.842424 46.674747 0 64.517172-8.921212 8.921212-20.557576 13.317172-32.323233 13.317172z m0 0"
            fill="" p-id="3544"></path>
        </svg>
      </i>

      <div class="bg_img" :style="{
        backgroundImage: userInfo.backgroundImage?`url(${userInfo.backgroundImage}?imageView=1&type=webp&thumbnail=247x0)`:`url(../../../public/images/defalut_user_bg.png)`
      }"></div>
      <div class="user">
        <div class="user_desc_follow">
          <div class="user_desc">
            <div>
              <van-image width="66rem" height="66rem" round :src="userInfo.header" class="user_head" />
              <div class="user_name">
                <h1>{{ userInfo.nickName }}</h1>
                <p>漫想家Id{{ userInfo.homesickId }}</p>
              </div>
            </div>

            <p class="user_notice">{{ userInfo.signature }}</p>
          </div>
          <div class="follow_btn">
            <span class="no_follow">关注</span>
            <!-- <span class="followed" >已关注</span> -->
          </div>
        </div>
      </div>
      <div class="user_join">
        <div class="user_count">
          <div>
            <span class="num">{{ userSupport.supportCount }}</span>
            <span class="desc">获赞</span>
          </div>
          <div>
            <span class="num">{{ userSupport.fansCount }}</span>
            <span class="desc">粉丝</span>
          </div>
          <div>
            <span class="num">{{ userSupport.attentionCount }}</span>
            <span class="desc">关注</span>
          </div>
          <div>
            <span class="num">{{ userSupport.tribeCount }}</span>
            <span class="desc">部落</span>
          </div>
        </div>

      </div>
    </div>
    <div class="like">
      <h1>喜欢</h1>
      <div style="padding: 0 10rem;" v-masonry transition-duration="false" item-selector=".item" class="pets" gutter="8">
        <ItemCard v-masonry-tile v-for="item in userLikeDetail" :key="item.id" :item="item" class="item" />
      </div>
      <div class=""></div>
    </div>


  </div>
</template>

<style lang="less" scoped>
.back_btn {
  position: absolute;
  z-index: 99;

  svg {
    fill: #ccc;
  }
}

.top {
  .bg_img {
    height: 30vh;
    background-size: cover;
    background-position: center;
  }

  .user {
    padding: 0 10rem;
    // margin-bottom: 10rem;
    margin-top: -20rem;
    background-color: #fff;
    border-top-right-radius: 10rem;
    border-top-left-radius: 10rem;
    height: 11.5vh;
    width: 100%;
    position: relative;

    .user_desc_follow {
      width: 94%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      top: -22rem;

      .user_desc>div {
        display: flex;
        align-items: flex-end;

        .user_name {
          margin-left: 10rem;
          margin-top: 20rem;

          h1 {
            font-size: 14rem;
            font-weight: bold;
          }

          p {
            color: #9e9e9e;
          }
        }
      }

      .user_desc {
        .user_notice {
          margin-top: 10rem;
          font-size: 13rem;
        }
      }
    }

    .follow_btn {
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
  }

  .user_join {
    display: flex;
    align-items: center;
    padding: 10rem;
    padding-right: 20rem;
    justify-content: space-between;

    .user_count {
      display: flex;

      div {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin: 0 10rem;

        .num {
          font-size: 14rem;
          font-weight: bold;
        }

        .desc {
          color: #9e9e9e;
        }
      }
    }
  }
}

.like {
  h1 {
    font-size: 14rem;
    font-weight: bold;
    padding: 10rem;
  }

  .item {
    width: 46%;
  }
}</style>
