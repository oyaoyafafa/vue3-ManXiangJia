<template>
  <div>
    <header>
      <h1>购物车</h1>
    </header>
    <section>
      <van-pull-refresh
        class="content"
        v-model="loading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div class="shop">
          <div v-if="isAdd" class="nothing">
            <img src="../../../public/images/分享/shopcar.png" alt="" />
            <p>购物车好空~</p>
            <p>快去看看更多好宝贝吧~</p>
          </div>
          <div v-else></div>
          <van-divider
            class="line"
            :style="{ width: '80%', color: '#1e2532', borderColor: '#111111', padding: '0 10px' }"
          >
            为你推荐
          </van-divider>
          <ul class="recommend">
            <li v-for="item in commend">
              <div>
                <img :src="item.tbGoods.listedImage" alt="" />
              </div>
              <p>{{ item.tbGoods.title }}</p>
              <p style="font-weight: bold">￥{{ item.tbGoods.sellPrice }}</p>
            </li>
          </ul>
        </div>
      </van-pull-refresh>
    </section>
  </div>
</template>

<script setup lang="ts">
import { shoppingCartRecommendApi } from '@/api/shoppingCart'
import {savePosition} from '@/js/pageBarScrollTop.js'
import { ref, watch } from 'vue'
import { showToast } from 'vant'
const loading = ref(false)
const isAdd = ref(true)
const commend = ref<Array<any>>([])

const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功')
    loading.value = false
  }, 1000)
}

shoppingCartRecommendApi().then((res: any) => {
  console.log(res.data.data.list)
  commend.value = res.data.data.list
})

// 控制首页五个页面的滚动高度------------------------------------------------------------
savePosition();


</script>

<style lang="less" scoped>
div {
  width: 100vw;
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
  section {
    margin-top: 60rem;
    margin-bottom: 60rem;
    background-color: #f3f3f3;
    // height: 100vh;
    width: 100%;
    .shop {
      width: 350rem;
      margin: 0 auto;
      margin-bottom: 120rem;
      .nothing {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          margin-top: 40rem;
          width: 100rem;
          height: 70rem;
        }
        p {
          font-weight: bold;
          &:nth-child(2) {
            margin-bottom: -5rem;
          }
        }
      }
      .line {
        margin: 0 auto;
        margin-top: 90rem;
      }
      .recommend {
        margin-top: 10rem;
        height: 450rem;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 170rem;
          height: 210rem;
          display: flex;
          flex-direction: column;

          background-color: white;
          margin-bottom: 10rem;
          border-radius: 5rem;
          p {
            padding-bottom: 5rem;
            &:nth-child(2) {
              margin-left: 8rem;
              line-height: 12rem;
              height: 20rem;
              transform: scale(0.8);
              transform-origin: 10rem 0;
              width: 115%;
              margin-bottom: 10rem;
              font-weight: bold;
            }
            &:nth-child(3) {
              margin-left: 5rem;
            }
          }
          div {
            overflow: hidden;
            width: 100%;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              margin-bottom: 60rem;
            }
          }
          &:nth-child(2n-1) {
            margin-right: 10rem;
          }
        }
      }
    }
  }
}
</style>
