<template>
  <div class="box">
    <div class="headd">
      <img @click="routerBack" src="@/../public/images/back_black.png" alt="" />
      <p>兑换详情</p>
    </div>
    <img class="img" :src="artic.listedImage" alt="" />
    <div class="msg">
      <div class="card">
        <p>
          <span
            ><b>{{ $route.query.integral }}</b
            >积分</span
          >
          <span>剩余{{ artic.sellPrice }}</span>
        </p>
        <p>{{ artic.title }}</p>
        <p @click="toCommodity(artic.id)">查看商品 ></p>
      </div>
      <div class="show">
        <p>兑换说明</p>
        <img :src="artic.listedImage" alt="" />
      </div>
    </div>
    <div class="btn">
      <button>兑换</button>
    </div>
  </div>
</template>
<script setup lang="ts">
// commodityDetails
import { commodityDetails } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

function routerBack() {
  $router.back()
}

const artic = ref<any>([])
commodityDetails($route.query.goodsId).then((res: any) => {
  artic.value = res.data.data
  console.log(res.data.data)
})

function toCommodity(id: any) {
  // console.log("id",id)
  $router.push({
    path: '/commodity',
    query: {
      id: id
    }
  })
}
</script>
<style lang="less">
.box {
  background-color: #f5f5f7;
  //   height: 100vh;
  padding-bottom: 45rem;
  .headd {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 50rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 999;
    p {
      font-weight: bold;
      font-size: 16rem;
      margin-left: 126rem;
    }
    img {
      width: 20rem;
      margin-left: 10rem;
    }
  }
  .img {
    margin-top: 50rem;
    width: 100vw;
  }
  .msg {
    .card {
      background-color: #ffffff;
      width: 360rem;
      margin: 10rem auto;
      border-radius: 10rem;
      p {
        padding: 5rem 10rem;
        &:nth-child(1) {
          display: flex;
          justify-content: space-between;
          span {
            &:nth-child(1) {
              color: #ccced1;
              b {
                font-weight: bold;
                font-size: 16rem;
                color: black;
                margin-right: 5rem;
              }
            }
            &:nth-child(2) {
              color: #ccced1;
            }
          }
        }
        &:nth-child(3) {
          text-align: right;
          font-weight: bold;
        }
      }
    }
    .show {
      background-color: #ffffff;
      width: 360rem;
      margin: 10rem auto;
      border-radius: 10rem;
      p {
        padding: 10rem;
      }
      img {
        width: 100%;
      }
    }
  }
  .btn {
    background-color: white;
    width: 373rem;
    border: 1rem solid white;
    height: 50rem;
    position: fixed;
    bottom: -3rem;
    left: 0;
    button {
      color: white;
      background-color: #18202d;
      width: 360rem;
      height: 40rem;
      position: absolute;
      top: 5rem;
      left: 7.5rem;
      border-radius: 5rem;
    }
  }
}
</style>
