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
      <!-- <img v-show="img.type === 1" v-for="img in deatil.images " :src="img.url" alt="" /> -->
      <img v-if="deatil.images" :src="deatil.images[0].url" />
      <h1>￥{{ deatil.totalPrice }}</h1>
      <h2>{{ deatil.title }}</h2>
      <p
        v-if="
          deatil.tbPresellGoodsDetail?.material != '  ' &&
          deatil.tbPresellGoodsDetail?.material != '   '
        "
      >
        <span>材质</span>
        <span>{{ deatil.tbPresellGoodsDetail?.material }}</span>
      </p>
      <p
        v-if="
          deatil.tbPresellGoodsDetail?.size != '  ' && deatil.tbPresellGoodsDetail?.size != '   '
        "
      >
        <span>尺寸</span>
        <span>{{ deatil.tbPresellGoodsDetail?.size }}</span>
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
        <li @click="toCommodity(item.id)" v-for="item in recommend">
          <img :src="item.listedImage" alt="" />
          <p>{{ item.title }}</p>
          <p v-if="item.sellPrice != 0">￥{{ item.sellPrice }}</p>
          <p v-else>￥---</p>
        </li>
      </ul>
    </div>
    <div class="time">
      <p>
        <span>发售时间</span>
        <span>{{ shijianc(deatil.createTime) }}</span>
      </p>
      <p>该商品为预售商品，图片仅供参考，以实物为准</p>
    </div>
    <p style="background-color: #f5f5f7; height: 10rem; width: 100vw"></p>
    <div class="pjia">
      <div>
        <p>商品评价({{ comment.length }})</p>
        <p>
          <span>全部</span>
          <img src="@/../public/images/ic_grey_ind.png" alt="" />
        </p>
      </div>
    </div>
    <div class="dongtai">
      <div>
        <p>动态({{ dynamic.length }})</p>
        <p>
          <span>全部</span>
          <img src="@/../public/images/ic_grey_ind.png" alt="" />
        </p>
      </div>
      <!-- <p class="title">
          <img v-for="img in dynamic[0].images" :src="img.url" alt="" />
        </p> -->
    </div>
    <p style="background-color: #f5f5f7; height: 10rem; width: 100vw"></p>
    <footer>
      <van-action-bar style="z-index: 899; margin-bottom: -3rem">
        <van-action-bar-icon icon="service-o" text="客服" />
        <van-action-bar-icon icon="like-o" text="喜欢" />
        <van-action-bar-button v-if="deatil.isPayment" class="add" text="已结束" />
        <van-action-bar-button v-else class="add" text="尾款待支付" />
      </van-action-bar>
      <img v-for="img in deatil.images" :src="img.url" v-show="img.type === 2" alt="" />
    </footer>
  </nav>
</template>

<script setup lang="ts">
import { orderDetails, commodityRecommend, dynamicApi, commentApi } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
// console.log($route.query.id)

const deatil = ref<any>([])
orderDetails($route.query.id).then((res: any) => {
  console.log("deatil",res)
  deatil.value = res.data.data
})

const recommend = ref<any>([])
commodityRecommend($route.query.id).then((res: any) => {
  // console.log(res.data.data.list)
  recommend.value = res.data.data.list
})

const comment = ref<any>([])
commentApi($route.query.id).then((res: any) => {
  // console.log(res.data.data.list)
  comment.value = res.data.data.list
})

const dynamic = ref<any>([])
dynamicApi($route.query.id).then((res: any) => {
  // console.log(res.data.data.list)
  dynamic.value = res.data.data.list
})

function routerBack() {
  $router.back()
}

function toCommodity(id: any) {
  // console.log("id",id)
  $router.push({
    path: '/commodity',
    query: {
      id: id
    }
  })
}

function shijianc(time: any) {
  let date = new Date(time)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}
</script>

<style lang="less" scoped>
nav {
  padding-bottom: 60rem;
  // padding-top: 60rem;
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
    margin-top: 40rem;
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }

    img {
      width: 100%;
    }
    h1,
    h2 {
      text-align: center;
      // margin-bottom: 10rem;
    }
    h1 {
      font-weight: bolder;
      font-size: 18rem;
      margin-bottom: 10rem;
      margin-top: 10rem;
    }
    h2 {
      font-size: 16rem;
      padding: 0 10rem;
      line-height: 18rem;
      margin-bottom: 15rem;
      font-weight: bold;
    }
    p {
      display: flex;
      justify-content: space-between;
      margin: 5rem 10rem;
    }
  }
  footer {
    .add {
      border-radius: 15rem;
      border: 1rem solid #5f646e;
      color: #18202d;
      height: 30rem;
      line-height: 30rem;
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
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
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
  .time {
    p {
      font-weight: bold;
      padding: 10rem 0;
      &:nth-child(1) {
        display: flex;
        justify-content: space-between;
        padding: 0 10rem;
        border-bottom: 1rem solid #f8f8fa;
        padding-top: 10rem;
      }
      &:nth-child(2) {
        text-align: center;
      }
    }
  }
  .recentlyBuy {
    padding: 0rem 10rem;
    h1 {
      margin-bottom: 15rem;
      margin-top: 10rem;
      font-size: 14rem;
      font-weight: bold;
    }
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15rem;
      p {
        &:nth-child(3) {
          color: #cfcfcf;
        }
        img {
          width: 20rem;
          border-radius: 50%;
          margin-right: 5rem;
        }
      }
    }
  }
  .dongtai,
  .pjia {
    border-top: 1rem solid #f6f6f8;
    div {
      padding: 10rem;
      display: flex;
      justify-content: space-between;
      p {
        &:nth-child(1) {
          font-weight: 14rem;
          font-weight: bold;
        }
        &:nth-child(2) {
          display: flex;
          align-items: center;
          color: #a4a4a4;
        }
      }
    }
    img {
      width: 20rem;
    }
  }
}
</style>
