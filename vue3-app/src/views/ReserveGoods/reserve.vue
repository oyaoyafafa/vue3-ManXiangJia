<template>
  <nav>
    <header>
      <img @click="routerBack" src="@/../public/images/back_black.png" alt="" />
      <h1>预定商品</h1>
      <img src="@/../public/images/icon_presell_rule.png" alt="" />
    </header>
    <div class="goods">
      <div @click="toOrder(goods.id)" class="item" v-for="goods in presale">
        <div>
          <img :src="goods.listedImage" alt="" />
        </div>
        <div>
          <p>{{ goods.title }}</p>
          <h1>￥{{ goods.price }}</h1>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { goodsPresaleApi } from '@/api/manxiangjia'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()

const presale = ref<Array<any>>([])
goodsPresaleApi().then((res: any) => {
  presale.value = res.data.data.list
  console.log(res.data.data.list)
})
function routerBack() {
  $router.back()
}

function toOrder(id: any) {
  // console.log("id",id)
  $router.push({
    path: '/order',
    query: {
      id: id
    }
  })
}
</script>

<style lang="less" scoped>
nav {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rem;
    border-bottom: 1rem solid #ececec;
    background-color: #ffffff;
    z-index: 999;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    img {
      width: 20rem;
    }
    h1 {
      font-size: 16rem;
      font-weight: bold;
    }
  }
  .goods {
    display: flex;
    flex-wrap: wrap;
    margin-top: 42rem;
    .item {
      width: 187rem;
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
          height: 60rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          line-height: 14rem;
          P {
            padding-right: 10rem;
            padding-top: 10rem;
            padding-left: 12rem;
          }
          h1 {
            font-size: 14rem;
            font-weight: bold;
            padding-left: 8rem;
            padding-bottom: 2rem;
          }
        }
      }
    }
  }
}
</style>
