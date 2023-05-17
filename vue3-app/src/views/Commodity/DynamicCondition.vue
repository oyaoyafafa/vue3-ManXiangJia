<template>
  <nav>
    <header>
      <img @click="routerBack" src="@/../public/images/back_black.png" alt="" />
      <p>全部动态</p>
    </header>
    <div v-if="!artic" class="bgImg">
      <img src="@/../public/images/list_no_data.png" alt="" />
      <p>空空如也</p>
    </div>
    <div v-else>
      <div class="imgs" v-for="goods in artic">
        <div v-for="img in goods.images">
          <img :src="img.videoImage" alt="" />
        </div>
        <p>{{ goods.title }}</p>
      </div>
    </div>
  </nav>
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
  console.log(res)
})
function routerBack() {
  $router.back()
}
</script>

<style lang="less">
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
  .imgs {
    width: 200rem;
    height: 200rem;
    overflow: hidden;
    img {
    }
  }
}
</style>
