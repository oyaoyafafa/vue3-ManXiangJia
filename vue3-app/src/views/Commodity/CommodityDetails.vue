<template>
  <nav>
    <header>
      <img @click="routerBack" src="@/../public/images/ic_back_goods.png" alt="" />
      <img
        @click="showShare = !showShare"
        :options="options"
        src="@/../public/images/ic_gif_share.gif"
        alt=""
      />
      <van-share-sheet v-model:show="showShare" :options="options" />
    </header>
    <section>
      <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="img in deatil.images">
          <img :src="img.url" alt="" />
        </van-swipe-item>
      </van-swipe> -->
      <h1>￥{{ deatil.integralNum }}</h1>
      <h2>{{ deatil.title }}</h2>
      <p>
        <span>品牌</span>
        <span>{{ deatil.brandName }}</span>
      </p>
      <p v-if="deatil.tbGoodsDetail?.cargoNo != ''">
        <span>货号</span>
        <span>{{ deatil.tbGoodsDetail?.cargoNo }}</span>
      </p>
      <p>
        <span>材质</span>
        <span>{{ deatil.tbGoodsDetail?.material }}</span>
      </p>
      <p>
        <span>尺寸</span>
        <span>{{ deatil.tbGoodsDetail?.size }}</span>
      </p>
    </section>
    <p style="background-color: #f5f5f7; height: 10rem; width: 100vw"></p>
    <div class="goods">
      <div class="head">
        <h1>相关商品推荐</h1>
        <p>
          <span>全部</span>
          <img src="@/../public/images/ic_grey_ind.png" alt="" />
        </p>
      </div>
      <ul class="item">
        <li v-for="item in recommend">
          <img :src="item.listedImage" alt="" />
          <p>{{ item.title }}</p>
          <p v-if="item.sellPrice != 0">￥{{ item.sellPrice }}</p>
          <p v-else>￥---</p>
        </li>
      </ul>
    </div>
    <p style="background-color: #f5f5f7; height: 10rem; width: 100vw"></p>
    <footer>
      <van-action-bar style="z-index: 999; margin-bottom: -3rem">
        <van-action-bar-icon icon="service-o" text="客服" />
        <van-action-bar-icon icon="like-o" text="喜欢" />
        <van-action-bar-button class="add" text="加入购物车" />
        <van-action-bar-button class="buy" color="#18202d" text="立即购买" />
      </van-action-bar>
      <img v-for="img in deatil.images" :src="img.url" v-show="img.type === 2" alt="" />
    </footer>
  </nav>
</template>

<script setup lang="ts">
import { commodityDetails, commodityRecommend, recentlyBuy } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const deatil = ref<any>([])
const recommend = ref<any>([])

const showShare = ref(false)
const options = [
  {
    name: '微信',
    icon: '@/../public/images/分享/ic_share_wechat.png'
  },
  {
    name: '朋友圈',
    icon: '@/../public/images/分享/ic_share_wechat_cirle.png'
  },
  {
    name: 'QQ',
    icon: '@/../public/images/分享/ic_share_qq.png'
  },
  {
    name: '微博',
    icon: '@/../public/images/分享/ic_share_weibo.png'
  }
]

const $route = useRoute()
const $router = useRouter()
console.log($route.query.id)
commodityDetails($route.query.id).then((res: any) => {
  console.log(res.data.data)
  deatil.value = res.data.data
})

commodityRecommend($route.query.id).then((res: any) => {
  console.log(res.data.data.list)
  recommend.value = res.data.data.list
})

recentlyBuy($route.query.id).then((res: any) => {
  console.log(res)
  // recommend.value = res.data.data.list
})

function routerBack() {
  $router.back()
}
</script>

<style lang="scss" scoped>
nav {
  padding-bottom: 60rem;
  padding-top: 60rem;
  header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5rem 10rem;
    // height: 60rem;
    z-index: 999;
    img {
      width: 30rem;
    }
  }
  section {
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
    img {
      width: 200rem;
    }
    h1,
    h2 {
      text-align: center;
      // margin-bottom: 10rem;
    }
    h1 {
      font-weight: bolder;
      font-size: 18rem;
    }
    h2 {
      font-size: 14rem;
    }
    p {
      display: flex;
      justify-content: space-between;
      margin: 5rem 10rem;
    }
  }
  footer {
    .add {
      border-radius: 5rem;
      border: 1rem solid #18202d;
      color: #18202d;
    }
    .buy {
      margin-left: 5rem;
      border-radius: 5rem;
    }
    img {
      width: 100vw;
    }
  }
  .goods {
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5rem 10rem;
      img {
        width: 20rem;
      }
      h1 {
        font-size: 14rem;
        font-weight: bold;
      }
      p {
        display: flex;
        align-items: center;
        color: #a4a4a4;
      }
    }
    .item {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        P {
          font-weight: bold;
          &:nth-child(2) {
            transform: scale(0.9);
            width: 120rem;
          }
          &:nth-child(3) {
            padding: 5rem 0;
          }
        }
        img {
          width: 80rem;
        }
      }
    }
  }
}
</style>
