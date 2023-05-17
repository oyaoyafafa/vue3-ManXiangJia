<template>
  <section>
    <nav>
      <header>
        <img @click="routerBack" src="@/../public/images/back_black.png" alt="" />
        <p>全部动态</p>
      </header>
      <div v-if="!artic" class="bgImg">
        <img src="@/../public/images/list_no_data.png" alt="" />
        <p>空空如也</p>
      </div>
      <div class="items" v-else>
        <div @click="toGoodsdetail(goods.id)" class="imgs" v-for="goods in artic">
          <div>
            <img v-if="goods.images" :src="goods.images[0].url" alt="" />
          </div>
          <p>{{ goods.title }}</p>
        </div>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articlelist } from '@/api/manxiangjia'
const $router = useRouter()
const $route = useRoute()

const artic = ref<Array<any>>([])
articlelist($route.query.goodId).then((res: any) => {
  artic.value = res.data.data.list
  console.log(res.data.data.list)
})
function routerBack() {
  $router.back()
}
function toGoodsdetail(id){
  $router.push({
    path:"/communitygoodsdetail",
    query: {
      id: id
    }
  })
}
</script>

<style lang="less">
section {
  nav {
    background-color: #f9f9f9;
    height: 100vh;
    header {
      display: flex;
      align-items: center;
      width: 100vw;
      height: 50rem;
      background-color: #ffffff;
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
    .bgImg {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #c5c5c5;
      padding-top: 100rem;
      img {
        width: 100rem;
      }
    }
    .items {
      display: flex;
      justify-content: space-between;
      .imgs {
        border-radius: 5rem;
        margin:0 5rem;
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 300rem;
          }
        }
        p {
          height: 40rem;
          background-color: #ffffff;
          padding-left: 5rem;
        }
        width: 160rem;
        height: 200rem;
        overflow: hidden;
      }
    }
  }
}
</style>
