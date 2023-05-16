<template>
  <nav>
    <header>
      <img @click="routerBack" src="@/../public/images/ic_back_goods.png" alt="" />
      <img @click="showShare = !showShare" :options="options" src="@/../public/images/ic_gif_share.gif" alt="" />
      <van-share-sheet v-model:show="showShare" :options="options" />
    </header>
    <section>
      <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="img in deatil.images">
          <img :src="img.url" alt="" />
        </van-swipe-item>
      </van-swipe> -->
      <img v-for="img in deatil.images" :src="img.url" v-show="img.type === 1" alt="" />
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
    <ul class="recentlyBuy">
      <h1 v-if="buy">最近购买({{ buy.length }})</h1>
      <h1 v-else>最近购买(0)</h1>
      <li v-for="item in buy">
        <p>
          <img :src="item.url || '@/../public/images/default_header.png'" alt="" />
          <span>{{ item.name }}</span>
        </p>
        <p>{{ item.price }}</p>
        <p>{{ shijianc(item.date) }}</p>
      </li>
    </ul>
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
        <van-action-bar-button class="add" :text="isInSoppingCar" @click="addShoppingCar" />
        <van-action-bar-button class="buy" color="#18202d" text="立即购买" />
      </van-action-bar>
      <img v-for="img in deatil.images" :src="img.url" v-show="img.type === 2" alt="" />
    </footer>
  </nav>
</template>

<script setup lang="ts">
import {
  commodityDetails,
  commodityRecommend,
  recentlyBuy,
  dynamicApi,
  commentApi
} from '@/api/manxiangjia'
import { ref, reactive, computed } from 'vue'
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
commodityDetails($route.query.id).then((res: any) => {
  // console.log(res.data.data)
  deatil.value = res.data.data
})

const recommend = ref<any>([])
commodityRecommend($route.query.id).then((res: any) => {
  // console.log(res.data.data.list)
  recommend.value = res.data.data.list
})

const buy = ref<any>([])
recentlyBuy($route.query.id).then((res: any) => {
  // console.log('buy', res.data.data.list)
  buy.value = res.data.data.list
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

function shijianc(time: any) {
  let date = new Date(time)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  return Y + M + D
}
//添加购物车
import { shoppingCarStore } from '@/stores/shoppingCar'
import { storeToRefs } from 'pinia'
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style'
const shoppingCar = shoppingCarStore()
const { shoppingCarList } = storeToRefs(shoppingCar)
const { addShoppingCarList } = shoppingCar
// 是否加入了购物车
const isInSoppingCar = computed(() => {
  if (shoppingCarList.value.every((o: any) => o.goods.id !== deatil.value.id)) {
    return '加入购物车'
  } else {
    return "已在购物车"
  }
})
const addShoppingCar = () => {
  // console.log(11);
  if (shoppingCarList.value.every((o: any) => o.goods.id !== deatil.value.id)) { showSuccessToast('添加成功') } else {
    showFailToast('已在购物车中了哦');
  }

  addShoppingCarList({ goods: deatil.value })
 

}
</script>

<style lang="less" scoped>
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

  // .pjia {
  //   border-top: 1rem solid #f6f6f8;
  //   div {
  //     padding: 10rem;
  //     display: flex;
  //     justify-content: space-between;
  //     p {
  //       &:nth-child(1) {
  //         font-weight: 14rem;
  //         font-weight: bold;
  //       }
  //     }
  //     img {
  //       width: 20rem;
  //     }
  //   }
  // }
}
</style>

