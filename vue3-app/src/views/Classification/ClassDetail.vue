<template>
  <div>
    <header
      :style="{
        backgroundImage: 'url(' + head.image + ')'
      }"
    >
      <div class="mask"></div>
      <div class="head">
        <img @click="routerBack" src="@/../public/images/back_white.png" alt="" />
        <div @click="toHomesearch" class="input1">
          <input type="text" placeholder="请输入您要查找的内容" />
          <div class="search">
            <img src="../../../public/images/search_icon.png" />
          </div>
        </div>
      </div>
    </header>
    <div class="msg">
      <img :src="head.image" alt="" />
      <h1>{{ head.name }}</h1>
      <p>{{ head.describes }}</p>
    </div>
  </div>
  <van-tabs sticky style="border-top: 1rem solid #f7f7f8" color="#18202d" v-model:active="active">
    <van-tab class="item" title="最新">
      <div @click="toCommodity(goods.id)" class="goods1" v-for="goods in goodsist">
        <div>
          <img :src="goods.listedImage" alt="" />
        </div>
        <div>
          <p>{{ goods.title }}</p>
          <h1>￥{{ goods.sellPrice }}</h1>
        </div>
      </div>
    </van-tab>
    <van-tab class="item" title="销量">
      <div @click="toCommodity(goods.id)" class="goods1" v-for="goods in goodsist1">
        <div>
          <img :src="goods.listedImage" alt="" />
        </div>
        <div>
          <p>{{ goods.title }}</p>
          <h1>￥{{ goods.sellPrice }}</h1>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { articlelclassifygoodsist, classifyhead } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
const active = ref(0)

const goodsist = ref<Array<any>>([])
articlelclassifygoodsist($route.query.id, $route.query.title, 1).then((res: any) => {
  goodsist.value = res.data.data.list
  console.log('goodsist', res.data.data.list)
})
const goodsist1 = ref<Array<any>>([])
articlelclassifygoodsist($route.query.id, $route.query.title, 2).then((res: any) => {
  goodsist1.value = res.data.data.list
  console.log('goodsist', res.data.data.list)
})
// classifyhead
const head = ref<any>([])
classifyhead($route.query.brands).then((res: any) => {
  head.value = res.data.data
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

function routerBack() {
  $router.back()
}

function toHomesearch() {
  $router.push({
    path: '/homesearch'
  })
}
</script>

<style lang="less">
div {
  header {
    height: 100rem;
    // background-color: #7a7a7b;
    background-size: 160rem 140rem;
    background-position: center -10rem;
    background-repeat: no-repeat;
    .mask {
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.5;
    }
    .head {
      display: flex;
      align-items: center;
      position: absolute;
      top: 15rem;
      left: 0;
      img {
        width: 20rem;
        margin-right: 10rem;
        &:nth-child(1) {
          margin-left: 10rem;
        }
      }
      .input1 {
        margin-bottom: 10rem;
        input {
          width: 320rem;
          border-radius: 25rem;
          margin-top: 10rem;
          padding: 5rem;
          margin-left: 7.5rem;
          background-color: #909090;
          padding-left: 30rem;
          //   opacity: 0.5;
        }
        input::-webkit-input-placeholder {
          color: #cccccc;
        }
        .search {
          position: absolute;
          top: 15rem;
          left: 15rem;
          img {
            width: 15rem;
          }
        }
      }
    }
  }
  .msg {
    height: 140rem;
    position: relative;
    img {
      position: absolute;
      top: -10rem;
      left: 10rem;
      width: 70rem;
      border-radius: 10rem;
    }
    h1 {
      position: absolute;
      top: 15rem;
      left: 90rem;
      font-size: 16rem;
      font-weight: bold;
    }
    p {
      line-height: 12rem;
      padding: 0 10rem;
      padding-top: 70rem;
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .goods1 {
      width: 187rem;
      display: flex;
      flex-wrap: wrap;
      div {
        &:nth-child(1) {
          width: 100%;
          border: 1rem solid #f6f6f8;
          height: 187rem;
          img {
            // width: 120rem;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        &:nth-child(2) {
          width: 100%;
          height: 70rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          line-height: 14rem;
          P {
            padding-right: 10rem;
            padding-top: 10rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; // 控制多行的行数
            -webkit-box-orient: vertical;
            margin-left: 6rem;
          }
          h1 {
            font-size: 14rem;
            font-weight: bold;
            padding-bottom: 8rem;
            margin-left: 6rem;
          }
        }
      }
    }
  }
}
</style>
