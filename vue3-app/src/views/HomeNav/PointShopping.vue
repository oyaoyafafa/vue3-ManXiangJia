<template>
  <section class="box">
    <header>
      <h1>积分商城</h1>
    </header>
    <van-pull-refresh
      class="content"
      v-model="loading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <section class="myPoint">
        <div class="uesr">
          <img src="@/../public/images/default_header.png" alt="" />
          <p></p>
          <p>0</p>
          <span>我的兑换</span>
        </div>
        <div class="conversion">
          <h1>积分兑换</h1>
          <ul class="list">
            <li @click="toPoint(item.goodsId,item.integral)" v-for="item in conversion" v-lazy="item">
              <img :src="item.listImage" alt="" />
              <p>{{ item.name }}</p>
              <p style="font-weight: bold">{{ item.integral }} <span>积分</span></p>
            </li>
          </ul>
        </div>
      </section>
    </van-pull-refresh>
  </section>
</template>

<script setup lang="ts">
import { pointListApi } from '@/api/pointShopping'
import { ref } from 'vue'
import { showToast } from 'vant'
import { savePosition } from '@/js/pageBarScrollTop.js'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()
const conversion = ref<Array<any>>([])
const loading = ref(false)

const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功')
    loading.value = false
  }, 1000)
}

pointListApi().then((res: any) => {
  console.log(res.data.data.list)
  conversion.value = res.data.data.list
})

function toPoint(goodsId:any,integral:any) {
  $router.push({
    path: '/point',
    query: {
      goodsId: goodsId,
      integral:integral
    }
  })
}

// 控制首页五个页面的滚动高度------------------------------------------------------------
savePosition()
</script>

<style lang="less" scoped>
.box {
  header {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    height: 60rem;
    // padding-top: 20rem;
    h1 {
      font-weight: bold;
      color: #0f0f0f;
      font-size: 16rem;
      line-height: 60rem;
      text-align: center;
    }
  }
  .myPoint {
    margin-top: 50rem;
    margin-bottom: 70rem;
    width: 100vw;
    // height: 100vh;
    .uesr {
      width: 350rem;
      height: 230rem;
      margin: 0 auto;
      background-image: url('@/../public/images/ic_score_store_bg.png');
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 40rem;
      }
      p {
        color: white;
        text-align: center;
        &:nth-child(2) {
          font-size: 12rem;
          opacity: 0.6;
          margin-top: 5rem;
        }
        &:nth-child(3) {
          font-size: 16rem;
          font-weight: bold;
          margin-bottom: 5rem;
        }
      }
      span {
        transform: scale(0.8);
        border: 1px solid #2d3138;
        border-radius: 15rem;
        color: #e0e1e2;
        background-color: #31363e;
        padding: 5rem 30rem;
      }
    }
    .conversion {
      background-color: white;
      h1 {
        font-weight: bold;
        font-size: 14rem;
        margin-top: 10rem;
        margin-left: 8rem;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
          display: flex;
          flex-direction: column;
          width: 160rem;
          border-bottom: 1rem solid #f6f6f6;
          &:nth-child(2n) {
            border-left: 1rem solid #f6f6f6;
          }
          img {
            width: 160rem;
            margin: 0 auto;
          }
          p {
            padding-bottom: 5rem;
            &:nth-child(2) {
              margin-left: 6rem;
              line-height: 12rem;
              height: 20rem;
              transform: scale(0.8);
              transform-origin: 10rem 0;
              width: 115%;
              font-weight: bold;
            }
            &:nth-child(3) {
              margin-left: 5rem;
            }
            span {
              color: #b1b4b8;
            }
          }
        }
      }
    }
  }
}
</style>
